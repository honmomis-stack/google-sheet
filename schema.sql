-- ============================================================================
--  Khmer Google Sheets — Admin School
--  Login via access-CODE + Gmail (code is issued on successful payment @ reankh.org)
--
--  ⚠️  SAFE to run on the SHARED reankh.org Supabase.
--  Everything is namespaced with the `gsheet_` prefix so it NEVER touches
--  reankh.org's own tables. (reankh.org already owns a `users` table whose id is
--  BIGINT / "never UUID" — a bare `users`/`admins`/`secrets` table here would
--  collide with it and punch security holes in the live site.)
--
--  Security model: the website uses the ANON key in the BROWSER, so RLS is the
--  ONLY guard. Therefore:
--    • codes are NOT directly readable by users — redemption goes through the
--      SECURITY DEFINER function gsheet_redeem_code() (so codes can't be harvested);
--    • a profile row is readable/updatable only by its owner;
--    • admins are SEEDED by you in SQL (no self-promotion).
-- ============================================================================

-- ── 1. PROFILES (approved students) ─────────────────────────────────────────
create table if not exists public.gsheet_profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text,
  name          text,
  is_approved   boolean not null default false,
  approver_code text,
  last_login    timestamptz,
  created_at    timestamptz not null default now()
);

-- ── 2. ADMINS (seeded manually — see the very bottom) ───────────────────────
create table if not exists public.gsheet_admins (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

-- ── 3. LOGIN CODES (issued on successful payment at reankh.org) ─────────────
create table if not exists public.gsheet_codes (
  code        text primary key,
  bound_email text,          -- if set, ONLY this Gmail may redeem the code (optional)
  note        text,          -- e.g. product name / reankh order id
  source      text,          -- 'reankh_payment' | 'admin' | 'test'
  status      text not null default 'active' check (status in ('active','used','revoked')),
  created_by  text,
  created_at  timestamptz not null default now(),
  used_by     text,
  used_at     timestamptz
);
create index if not exists gsheet_codes_status_idx on public.gsheet_codes(status);

-- ── Row Level Security ──────────────────────────────────────────────────────
alter table public.gsheet_profiles enable row level security;
alter table public.gsheet_admins   enable row level security;
alter table public.gsheet_codes    enable row level security;

-- Admin check (own row in gsheet_admins OR one of the owner emails).
-- SECURITY DEFINER so it can read gsheet_admins without RLS recursion.
create or replace function public.gsheet_is_admin()
returns boolean
language sql stable security definer set search_path = public, auth as $$
  select exists (select 1 from public.gsheet_admins a where a.id = auth.uid())
      or coalesce((auth.jwt() ->> 'email'), '') in
         ('hon.mom.is@gmail.com', 'hon.mom.edu@gmail.com');
$$;

-- profiles: owner reads/updates own row; admins can read everyone (for stats)
drop policy if exists gsheet_profiles_select on public.gsheet_profiles;
create policy gsheet_profiles_select on public.gsheet_profiles
  for select using (id = auth.uid() or public.gsheet_is_admin());

drop policy if exists gsheet_profiles_update_own on public.gsheet_profiles;
create policy gsheet_profiles_update_own on public.gsheet_profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- admins: you can see your OWN admin row (so the app can detect admin). No INSERT
-- policy on purpose → nobody can self-promote; you seed admins via SQL below.
drop policy if exists gsheet_admins_select on public.gsheet_admins;
create policy gsheet_admins_select on public.gsheet_admins
  for select using (id = auth.uid() or public.gsheet_is_admin());

-- codes: ONLY admins may list/create/manage. Normal users have NO direct access
-- (no policy = denied) → codes can never be listed or harvested from the browser.
-- Normal users redeem through gsheet_redeem_code() below.
drop policy if exists gsheet_codes_admin_all on public.gsheet_codes;
create policy gsheet_codes_admin_all on public.gsheet_codes
  for all using (public.gsheet_is_admin()) with check (public.gsheet_is_admin());

-- ── REDEEM — the only way a normal user touches a code ──────────────────────
-- Validates the code, (optionally) checks the bound Gmail, marks it used, and
-- approves the caller — all server-side, race-safe (row lock), without ever
-- exposing the codes table to the client.
create or replace function public.gsheet_redeem_code(p_code text)
returns jsonb
language plpgsql security definer set search_path = public, auth as $$
declare
  v_uid   uuid := auth.uid();
  v_email text;
  v_name  text;
  v_code  public.gsheet_codes%rowtype;
begin
  if v_uid is null then
    return jsonb_build_object('ok', false, 'error', 'not_authenticated');
  end if;

  select email,
         coalesce(raw_user_meta_data ->> 'full_name',
                  raw_user_meta_data ->> 'name',
                  split_part(email, '@', 1))
    into v_email, v_name
    from auth.users where id = v_uid;

  select * into v_code
    from public.gsheet_codes
   where code = upper(trim(p_code)) and status = 'active'
   for update;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'invalid_or_used');
  end if;

  if v_code.bound_email is not null
     and lower(v_code.bound_email) <> lower(coalesce(v_email, '')) then
    return jsonb_build_object('ok', false, 'error', 'email_mismatch');
  end if;

  update public.gsheet_codes
     set status = 'used', used_by = v_email, used_at = now()
   where code = v_code.code;

  insert into public.gsheet_profiles (id, email, name, is_approved, approver_code, last_login)
  values (v_uid, v_email, v_name, true, v_code.code, now())
  on conflict (id) do update
    set is_approved   = true,
        approver_code = excluded.approver_code,
        last_login    = now();

  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.gsheet_redeem_code(text) from public, anon;
grant execute on function public.gsheet_redeem_code(text) to authenticated;

-- ── SEED YOUR ADMIN(S) ──────────────────────────────────────────────────────
-- Run this ONCE, AFTER you have signed in to the site with Google at least once
-- (so your auth.users row exists). Owner emails already work via gsheet_is_admin().
--
--   insert into public.gsheet_admins (id, email)
--   select id, email from auth.users where email = 'hon.mom.edu@gmail.com'
--   on conflict (id) do nothing;

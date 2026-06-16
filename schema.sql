-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create secrets table
CREATE TABLE IF NOT EXISTS secrets (
  code TEXT PRIMARY KEY,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  used_by TEXT,
  used_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active'
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE secrets ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users for now
CREATE POLICY "Allow public read access on users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public read access on admins" ON admins FOR SELECT USING (true);
CREATE POLICY "Allow public read access on secrets" ON secrets FOR SELECT USING (true);

-- Allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert on users" ON users FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on users" ON users FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on secrets" ON secrets FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on secrets" ON secrets FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on admins" ON admins FOR INSERT WITH CHECK (auth.role() = 'authenticated');

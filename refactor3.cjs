const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `  const fetchGoldenCodes = async () => {
    try {
      const snap = await getDocs(collection(db, "secrets"));
      const codes = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setGoldenCodes(codes.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0)));
    } catch (e) {
      console.warn("Could not fetch secrets, likely due to security rules if not admin:", e);
    }
  };`;

const replace1 = `  const fetchGoldenCodes = async () => {
    try {
      const { data, error } = await supabase.from('secrets').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setGoldenCodes(data || []);
    } catch (e) {
      console.warn("Could not fetch secrets, likely due to security rules if not admin:", e);
    }
  };`;

const target2 = `  const fetchAdminStats = async () => {
    try {
      const snap = await getDocs(collection(db, "users"));
      setTotalUsers(snap.size);
      
      const students = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const recentStudents = students.sort((a: any, b: any) => {
        const timeA = a.lastLogin?.toMillis ? a.lastLogin.toMillis() : 0;
        const timeB = b.lastLogin?.toMillis ? b.lastLogin.toMillis() : 0;
        return timeB - timeA;
      }).slice(0, 10);
      setActiveStudents(recentStudents);
    } catch (e) {
      console.warn("Could not fetch user stats:", e);
    }
  };`;

const replace2 = `  const fetchAdminStats = async () => {
    try {
      const { data: users, count, error } = await supabase.from('users').select('*', { count: 'exact' });
      if (error) throw error;
      setTotalUsers(count || 0);
      
      const students = users || [];
      const recentStudents = students.sort((a: any, b: any) => {
        const timeA = a.last_login ? new Date(a.last_login).getTime() : 0;
        const timeB = b.last_login ? new Date(b.last_login).getTime() : 0;
        return timeB - timeA;
      }).slice(0, 10);
      setActiveStudents(recentStudents);
    } catch (e) {
      console.warn("Could not fetch user stats:", e);
    }
  };`;

const target3 = `  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Check if admin
          const email = currentUser.email || '';
          if (email === 'hon.mom.is@gmail.com' || email === 'hon.mom.edu@gmail.com' || email === 'hon.mom.edu@gmail' || email === 'admin@gmail.com') {
             setIsAdmin(true);
             setIsApproved(true);
          } else {
             // Check if user is an admin in Firestore
             const adminDoc = await getDoc(doc(db, "admins", currentUser.uid));
             if (adminDoc.exists()) {
               setIsAdmin(true);
               setIsApproved(true);
             } else {
               setIsAdmin(false);
               // Check if user is approved
               const userDoc = await getDoc(doc(db, "users", currentUser.uid));
               if (userDoc.exists() && userDoc.data().isApproved) {
                 setIsApproved(true);
               } else {
                 setIsApproved(false);
               }
             }
          }
        } catch (error) {
          console.warn("Could not fetch user data:", error);
          setIsApproved(false);
        }
      } else {
        setIsAdmin(false);
        setIsApproved(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);`;

const replace3 = `  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkUserStatus(currentUser);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkUserStatus(currentUser);
    });

    const checkUserStatus = async (currentUser: any) => {
      if (currentUser) {
        try {
          const email = currentUser.email || '';
          if (email === 'hon.mom.is@gmail.com' || email === 'hon.mom.edu@gmail.com' || email === 'hon.mom.edu@gmail' || email === 'admin@gmail.com') {
             setIsAdmin(true);
             setIsApproved(true);
          } else {
             const { data: adminDoc } = await supabase.from('admins').select('*').eq('id', currentUser.id).single();
             if (adminDoc) {
               setIsAdmin(true);
               setIsApproved(true);
             } else {
               setIsAdmin(false);
               const { data: userDoc } = await supabase.from('users').select('*').eq('id', currentUser.id).single();
               if (userDoc && userDoc.is_approved) {
                 setIsApproved(true);
               } else {
                 setIsApproved(false);
               }
             }
          }
        } catch (error) {
          console.warn("Could not fetch user data:", error);
          setIsApproved(false);
        }
      } else {
        setIsAdmin(false);
        setIsApproved(false);
      }
      setAuthLoading(false);
    };

    return () => subscription.unsubscribe();
  }, []);`;

const target4 = `  const verifyGoldenCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredCode.trim() || !user) return;
    setCodeError("");
    setAuthLoading(true);

    try {
      const secretRef = doc(db, "secrets", enteredCode.trim());
      const secretSnap = await getDoc(secretRef);
      
      if (secretSnap.exists() && secretSnap.data().isActive) {
        // Code is valid! Write this to the user's profile
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: user.displayName || user.email?.split("@")[0] || "User",
          isApproved: true,
          approverCode: enteredCode.trim(),
          lastLogin: serverTimestamp()
        }, { merge: true });
        
        // Update the golden code to inactive
        await updateDoc(secretRef, {
          isActive: false,
          usedBy: user.email,
          usedAt: serverTimestamp()
        });

        setIsApproved(true);
      } else {
        setCodeError("លេខសម្ងាត់មាសមិនត្រឹមត្រូវ រឺ ត្រូវបានបិទ។");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setCodeError("លេខសម្ងាត់មាសមិនត្រឹមត្រូវ។ (Invalid Code)");
    }
    setAuthLoading(false);
  };`;

const replace4 = `  const verifyGoldenCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredCode.trim() || !user) return;
    setCodeError("");
    setAuthLoading(true);

    try {
      const { data: secretSnap } = await supabase.from('secrets').select('*').eq('code', enteredCode.trim()).single();
      
      if (secretSnap && secretSnap.status === 'active') {
        // Code is valid! Write this to the user's profile
        await supabase.from('users').upsert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
          is_approved: true,
          approver_code: enteredCode.trim(),
          last_login: new Date().toISOString()
        });
        
        // Update the golden code to inactive
        await supabase.from('secrets').update({
          status: 'inactive',
          used_by: user.email,
          used_at: new Date().toISOString()
        }).eq('code', enteredCode.trim());

        setIsApproved(true);
      } else {
        setCodeError("លេខសម្ងាត់មាសមិនត្រឹមត្រូវ រឺ ត្រូវបានបិទ។");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setCodeError("លេខសម្ងាត់មាសមិនត្រឹមត្រូវ។ (Invalid Code)");
    }
    setAuthLoading(false);
  };`;

const target5 = `  const handleLogout = async () => {
    await signOut(auth);
  };`;

const replace5 = `  const handleLogout = async () => {
    await supabase.auth.signOut();
  };`;

content = content.replace(target1, replace1);
content = content.replace(target2, replace2);
content = content.replace(target3, replace3);
content = content.replace(target4, replace4);
content = content.replace(target5, replace5);

fs.writeFileSync('src/App.tsx', content);
console.log("Refactored script executed.");

const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace auth state listener
content = content.replace(
  /useEffect\(\(\) => \{\n\s*const unsubscribe = onAuthStateChanged\(auth, \(currentUser\) => \{\n\s*if \(currentUser\) \{\n\s*setUser\(currentUser\);\n\s*\} else \{\n\s*setUser\(null\);\n\s*\}\n\s*\}\);\n\s*return \(\) => unsubscribe\(\);\n\s*\}, \[\]\);/g,
  `useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);`
);

// Replace Login function
content = content.replace(
  /const handleGoogleLogin = async \(\) => \{\n\s*try \{\n\s*await signInWithPopup\(auth, googleProvider\);\n\s*\} catch \(error\) \{\n\s*console.error\("Login failed:", error\);\n\s*alert\("បរាជ័យក្នុងការចូលត៍ \(Login failed\)"\);\n\s*\}\n\s*\};/g,
  `const handleGoogleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    } catch (error) {
      console.error("Login failed:", error);
      alert("បរាជ័យក្នុងការចូលត៍ (Login failed)");
    }
  };`
);

// Replace Logout function
content = content.replace(
  /const handleLogout = async \(\) => \{\n\s*try \{\n\s*await signOut\(auth\);\n\s*\} catch \(error\) \{\n\s*console.error\("Logout failed:", error\);\n\s*\}\n\s*\};/g,
  `const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };`
);

// We need to handle other occurrences manually. Let's output what is left to be changed.
fs.writeFileSync('src/App.tsx', content);
console.log('Done replacing auth logic');

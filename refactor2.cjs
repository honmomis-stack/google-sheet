const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace Firebase imports
content = content.replace(
  /import \{ doc, getDoc, setDoc, getDocs, collection, serverTimestamp, updateDoc \} from "firebase\/firestore";\n?/g,
  ''
);

// Replace fetchGoldenCodes
content = content.replace(
  /const fetchGoldenCodes = async \(\) => \{\n\s*try \{\n\s*const snap = await getDocs\(collection\(db, "secrets"\)\);\n\s*const codes = snap\.docs\.map\(d => \(\{ id: d\.id, \.\.\.d\.data\(\) \}\)\);\n\s*setGoldenCodes\(codes\.sort\(\(a: any, b: any\) => \(b\.createdAt \|\| 0\) - \(a\.createdAt \|\| 0\)\)\);\n\s*\} catch \(error\) \{\n\s*console\.error\("Error fetching codes:", error\);\n\s*\}\n\s*\};/g,
  `const fetchGoldenCodes = async () => {
    try {
      const { data, error } = await supabase.from('secrets').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setGoldenCodes(data || []);
    } catch (error) {
      console.error("Error fetching codes:", error);
    }
  };`
);

// Replace fetchAdminStats
content = content.replace(
  /const fetchAdminStats = async \(\) => \{\n\s*try \{\n\s*const snap = await getDocs\(collection\(db, "users"\)\);\n\s*setTotalUsers\(snap\.size\);\n\s*\} catch \(error\) \{\n\s*console\.error\("Error fetching stats:", error\);\n\s*\}\n\s*\};/g,
  `const fetchAdminStats = async () => {
    try {
      const { count, error } = await supabase.from('users').select('*', { count: 'exact', head: true });
      if (error) throw error;
      setTotalUsers(count || 0);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };`
);

// Replace code in checkAdminStatus
content = content.replace(
  /const adminDoc = await getDoc\(doc\(db, "admins", currentUser\.uid\)\);\n\s*if \(adminDoc\.exists\(\)\) \{\n\s*setIsAdmin\(true\);\n\s*\} else \{\n\s*setIsAdmin\(false\);\n\s*\/\* Check if user is approved \*\/\n\s*const userDoc = await getDoc\(doc\(db, "users", currentUser\.uid\)\);\n\s*if \(userDoc\.exists\(\) && userDoc\.data\(\)\.isApproved\) \{\n\s*setIsApproved\(true\);\n\s*\}\n\s*\}/g,
  `const { data: adminData } = await supabase.from('admins').select('*').eq('id', currentUser.id).single();
             if (adminData) {
               setIsAdmin(true);
             } else {
               setIsAdmin(false);
               // Check if user is approved
               const { data: userData } = await supabase.from('users').select('*').eq('id', currentUser.id).single();
               if (userData && userData.is_approved) {
                 setIsApproved(true);
               }
             }`
);

// Replace logic in handleVerifyCode
content = content.replace(
  /const secretRef = doc\(db, "secrets", enteredCode\.trim\(\)\);\n\s*const secretSnap = await getDoc\(secretRef\);\n\s*if \(secretSnap\.exists\(\) && secretSnap\.data\(\)\.isActive\) \{\n\s*setHasValidCode\(true\);\n\s*localStorage\.setItem\("khmer_gs_code", enteredCode\.trim\(\)\);\n\s*if \(user\) \{\n\s*await setDoc\(doc\(db, "users", user\.uid\), \{\n\s*email: user\.email,\n\s*name: user\.displayName \|\| user\.email\?\.split\("@"\)\[0\] \|\| "User",\n\s*isApproved: true,\n\s*approvedAt: serverTimestamp\(\)\n\s*\}, \{ merge: true \}\);\n\s*await updateDoc\(secretRef, \{\n\s*isActive: false,\n\s*usedBy: user\.email,\n\s*usedAt: serverTimestamp\(\)\n\s*\}\);\n\s*\}\n\s*showToast\("អបអរសាទរ! លេខកូដត្រឹមត្រូវ អ្នកអាចចូលរៀនបាន។"\);\n\s*setIsVerifying\(false\);\n\s*return;\n\s*\}/g,
  `const { data: secretData } = await supabase.from('secrets').select('*').eq('code', enteredCode.trim()).single();
      
      if (secretData && secretData.status === 'active') {
        setHasValidCode(true);
        localStorage.setItem("khmer_gs_code", enteredCode.trim());
        
        if (user) {
          await supabase.from('users').upsert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
            is_approved: true,
            approved_at: new Date().toISOString()
          });
          
          await supabase.from('secrets').update({
            status: 'used',
            used_by: user.email,
            used_at: new Date().toISOString()
          }).eq('code', enteredCode.trim());
        }
        
        showToast("អបអរសាទរ! លេខកូដត្រឹមត្រូវ អ្នកអាចចូលរៀនបាន។");
        setIsVerifying(false);
        return;
      }`
);

// Add Golden Code logic
content = content.replace(
  /const generateCode = async \(\) => \{\n\s*if \(\!isAdmin\) return;\n\s*const newCode = Math\.random\(\)\.toString\(36\)\.substring\(2, 10\)\.toUpperCase\(\);\n\s*try \{\n\s*await setDoc\(doc\(db, "secrets", newCode\), \{\n\s*createdBy: user\.email,\n\s*createdAt: serverTimestamp\(\),\n\s*isActive: true,\n\s*usedBy: null,\n\s*usedAt: null\n\s*\}\);\n\s*fetchGoldenCodes\(\);\n\s*showToast\("បង្កើតលេខកូដថ្មីបានជោគជ័យ!"\);\n\s*\} catch \(error\) \{\n\s*console\.error\("Error generating code:", error\);\n\s*\}\n\s*\};/g,
  `const generateCode = async () => {
    if (!isAdmin) return;
    const newCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    try {
      const { error } = await supabase.from('secrets').insert({
        code: newCode,
        created_by: user.email,
        created_at: new Date().toISOString(),
        status: 'active',
        used_by: null,
        used_at: null
      });
      if (error) throw error;
      fetchGoldenCodes();
      showToast("បង្កើតលេខកូដថ្មីបានជោគជ័យ!");
    } catch (error) {
      console.error("Error generating code:", error);
    }
  };`
);


// Same for generateMultipleCodes
content = content.replace(
  /const generateMultipleCodes = async \(count: number\) => \{\n\s*if \(\!isAdmin\) return;\n\s*setIsGeneratingMultiple\(true\);\n\s*try \{\n\s*for \(let i = 0; i < count; i\+\+\) \{\n\s*const newCode = Math\.random\(\)\.toString\(36\)\.substring\(2, 10\)\.toUpperCase\(\);\n\s*await setDoc\(doc\(db, "secrets", newCode\), \{\n\s*createdBy: user\.email,\n\s*createdAt: serverTimestamp\(\),\n\s*isActive: true,\n\s*usedBy: null,\n\s*usedAt: null\n\s*\}\);\n\s*\}\n\s*fetchGoldenCodes\(\);\n\s*showToast\(\`បង្កើតលេខកូដថ្មីចំនួន \$\{count\} បានជោគជ័យ!\`\);\n\s*\} catch \(error\) \{\n\s*console\.error\("Error generating multiple codes:", error\);\n\s*\} finally \{\n\s*setIsGeneratingMultiple\(false\);\n\s*\}\n\s*\};/g,
  `const generateMultipleCodes = async (count: number) => {
    if (!isAdmin) return;
    setIsGeneratingMultiple(true);
    try {
      const codesToInsert = [];
      for (let i = 0; i < count; i++) {
        const newCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        codesToInsert.push({
          code: newCode,
          created_by: user.email,
          created_at: new Date().toISOString(),
          status: 'active',
          used_by: null,
          used_at: null
        });
      }
      const { error } = await supabase.from('secrets').insert(codesToInsert);
      if (error) throw error;
      fetchGoldenCodes();
      showToast(\`បង្កើតលេខកូដថ្មីចំនួន \${count} បានជោគជ័យ!\`);
    } catch (error) {
      console.error("Error generating multiple codes:", error);
    } finally {
      setIsGeneratingMultiple(false);
    }
  };`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Done refactoring Firestore');

const https = require('https');
const topics = [
  "រៀន Excel ខ្មែរ",
  "Google Sheets ខ្មែរ",
  "Apps Script ខ្មែរ",
  "Supabase API"
];

async function fetchIDs() {
  for (const t of topics) {
    await new Promise(resolve => {
      https.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const matches = data.match(/watch\?v=([a-zA-Z0-9_-]{11})/g);
          if (matches) {
            console.log(`Topic: ${t}\n`, Array.from(new Set(matches)).slice(0, 3).map(m => m.replace('watch?v=', '')));
          }
          resolve();
        });
      });
    });
  }
}
fetchIDs();

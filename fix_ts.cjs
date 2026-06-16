const fs = require('fs');
let s = fs.readFileSync('src/data/lessonsData.ts', 'utf8');

s = s.replace(/tutorialContent: \`([\s\S]*?)\`,\n    difficulty:/g, (match, p1) => {
  return 'tutorialContent: \`' + p1.replace(/\`/g, '\\\`') + '\`,\n    difficulty:';
});

fs.writeFileSync('src/data/lessonsData.ts', s);

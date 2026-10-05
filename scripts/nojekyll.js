// scripts/nojekyll.js
// Creates out/.nojekyll — works on Windows, Mac, and Linux
const fs = require('fs')
fs.writeFileSync('out/.nojekyll', '')
console.log('✓ Created out/.nojekyll')

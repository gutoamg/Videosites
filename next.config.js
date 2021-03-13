const withImages = require('next-images');
const fs = require('fs');
const path = require('path');

module.exports = withImages({
    esModule: true,
});

// module.exports = {
//     env: {
//       rawJsFromFile: fs.readFileSync('/dynamic.js').toString()
//     }
//   }
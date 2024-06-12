const fs = require('node:fs');
///Users/user/Desktop/WebStart/BackEndPractice/nodejs/
fs.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

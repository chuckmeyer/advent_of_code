var fs = require('fs');

var getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      resolve(data.toString().split('\n').filter(n => n));
    });
})};

var ValidPasswords = (passwords) => {
  return new Promise((resolve, reject) => {
    const regexpPassword = /(\d+)\-(\d+)\s(\w):\s(.+)/
    valid = passwords.filter((line) => {
      const [value, first, second, character, password] = line.match(regexpPassword);
      return (password[first - 1 ] === character ^ password[second - 1] === character)
    });
    resolve(valid);
})};

async function validatePasswords() {
  try {
    var values = await getFile('input.txt');
    var valid = await ValidPasswords(values);
    console.log(`Found ${valid.length} valid passwords.`);
  } catch (err) {
    console.log(err);
  }
}

validatePasswords();

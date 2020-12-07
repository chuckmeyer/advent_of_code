var fs = require('fs');

var getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      if (err) {
        return console.error(err);
      }
      values = data.toString().split('\n');
      values.pop(); 
      resolve(values);
    });
})};

var ValidPasswords = (passwords) => {
  return new Promise((resolve, reject) => {
    var valid = [];
    const regexpPassword = /(\d+)\-(\d+)\s(\w):\s(.+)/
    for(var i = 0;i < values.length;i++){
      const match = values[i].match(regexpPassword);
      var regexpChar = new RegExp(match[3], "g");
      count = (match[4].match(regexpChar) || []).length;
      if((match[1] <= count) && (count <= match[2])){
        /*console.log(`${match[4]} contains between ${match[1]} and ${match[2]} varter ${match[3]} characters(${count}).`);
        */
        valid.push(values[i]);
      }
    };
    resolve(valid);
})};  

async function getValues() {
  var values = await getFile('input.txt');
  var valid = await ValidPasswords(values);
  console.log(valid);
  console.log(`Found ${valid.length} matches.`);
}

var myValues = getValues();

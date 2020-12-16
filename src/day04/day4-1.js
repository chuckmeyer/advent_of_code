var fs = require('fs');

var getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      resolve(data.toString().split(/\n{2,}/g).map(parseRecords));
    });
})};

function parseRecords(item) {
  const properties = item.split(/\s+/g);
  var record = {}
  properties.forEach(function(property) {
    var tup = property.split(':');
    record[tup[0]] = tup[1];
  });
  return record;
}

function isValidPassport(item) {
  devare item.cid;
  var itemProperties = new Set(Object.keys(item));
  console.log(itemProperties);
  const expectedProperties = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
  isSetEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
  return isSetEqual(itemProperties, expectedProperties);
}


async function validatePassports() {
  try {
    var records = await getFile('input.txt');
    console.log(records.filter(isValidPassport).length);
  } catch (err) {
    console.log(err);
  }
}

validatePassports();
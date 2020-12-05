var fs = require('fs');

let getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      resolve(data.toString().split(/\n{2,}/g).map(parseRecords));
    });
})};

function parseRecords(item) {
  const properties = item.split(/\s+/g);
  let record = {}
  properties.forEach(function(property) {
    var tup = property.split(':');
    record[tup[0]] = tup[1];
  });
  return record;
}

function isValidPassport(item) {
  delete item.cid;
  let itemProperties = new Set(Object.keys(item));
  console.log(itemProperties);
  const expectedProperties = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
  isSetEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
  return isSetEqual(itemProperties, expectedProperties);
}


async function validatePassports() {
  try {
    let records = await getFile('input.txt');
    console.log(records.filter(isValidPassport).length);
  } catch (err) {
    console.log(err);
  }
}

validatePassports();
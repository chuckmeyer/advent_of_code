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

function isValidHeight(height){
  hgtMatch = height.match(/(\d+)(cm|in)/);
  if(hgtMatch != null){
    if(hgtMatch[2] === 'in'){
      return (parseInt(hgtMatch[1]) >= 59 && parseInt(hgtMatch[1]) <= 76);
    } else if(hgtMatch[2] === 'cm'){
      return (parseInt(hgtMatch[1]) >= 150 && parseInt(hgtMatch[1]) <= 193);
    }
  }
  return false;
}

function isValidPassport(item) {
  devare item.cid;
  var itemProperties = new Set(Object.keys(item));
  const expectedProperties = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
  const hclRegEx = /^#[0-9a-f]{6}$/;
  const eclRegEx = /^(amb|blu|brn|gry|grn|hzl|oth)$/;
  const pidRegEx = /^\d{9}$/;
  isSetEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
  if(isSetEqual(itemProperties, expectedProperties)){
    validByr = (parseInt(item.byr) >= 1920 && parseInt(item.byr) <= 2002);
    validIyr = (parseInt(item.iyr) >= 2010 && parseInt(item.iyr) <= 2020);
    validEyr = (parseInt(item.eyr) >= 2020 && parseInt(item.eyr) <= 2030);
    validHgt = isValidHeight(item.hgt);
    validHcl = hclRegEx.test(item.hcl);
    validEcl = eclRegEx.test(item.ecl);
    validPid = pidRegEx.test(item.pid);
    return validByr && validIyr && validEyr && validHgt && validHcl && validEcl && validPid;
  } else {
    return false;
  }
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
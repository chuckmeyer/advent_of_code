var fs = require('fs');

var Bag = function(type, contents) {
  this.type = type;
  this.contents = contents;
}

Bag.prototype = {
  contains: function(type){
    if(this.contents === null) {
      return false;
    } else {
      return this.contents.filter(obj => obj.type == type).length > 0;
    }
  }
}

var getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      resolve(data.toString().split('\n').filter(n => n));
    });
})};

function parseContents(contentString){
  if(contentString === 'no other bags'){ return null} 
  else {
    return contentString.split(', ').map(item => { 
      itemMatch = item.match(/(\d+)\s+(\w+\s\w+)/); return { type: itemMatch[2], number: itemMatch[1]}; });
  }  
}

function parseRules(strings){
  var rules = [];
  const ruleRegExp = /(\w+\s+\w+) bags? contains? (.+)\./;
  strings.forEach(string => {
    var stringMatch = string.match(ruleRegExp);
    rules.push(new Bag(stringMatch[1], parseContents(stringMatch[2])));
  });
  return rules;
}

function getParents(bag, bagRules) {
  var parentBags = bagRules.filter(rule => rule.contains(bag.type));  
  if(parentBags.length === 0){
    return [];
  } else {
    return parentBags.concat(parentBags.map(parentBag => getParents(parentBag, bagRules)))
      .flat().
      filter((thing, index, self) =>
        index === self.findIndex((t) => (
        t.type === thing.type
      )));
  }
};

async function totalParentBags() {
  try {
    const bagRules = parseRules(await getFile('input.txt'));
    const myBag = new Bag('shiny gold', []);
    parentBags = getParents(myBag, bagRules);
    console.log(parentBags.length);
  } catch (err) {
    console.log(err);
  }
}

totalParentBags();

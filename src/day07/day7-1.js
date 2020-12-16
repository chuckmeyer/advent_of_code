'use strict'
const fs = require('fs')

const Bag = function (type, contents, number) {
  this.type = type
  this.contents = contents
  this.number = number
}

Bag.prototype = {
  contains: function (type) {
    if (this.contents === null) {
      return false
    } else {
      return this.contents.filter(obj => obj.type === type).length > 0
    }
  }
}

const getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().split('\n').filter(n => n))
    })
  })
}

function parseBagContents (contentString) {
  if (contentString === 'no other bags') {
    return []
  } else {
    return contentString.split(', ').map(item => {
      const itemMatch = item.match(/(\d+)\s+(\w+\s\w+)/)
      return new Bag(itemMatch[2], [], parseInt(itemMatch[1]))
    })
  }
}

function parseRules (strings) {
  const rules = []
  const ruleRegExp = /(\w+\s+\w+) bags? contains? (.+)\./
  strings.forEach(string => {
    const stringMatch = string.match(ruleRegExp)
    rules.push(new Bag(stringMatch[1], parseBagContents(stringMatch[2])))
  })
  return rules
}

function getParents (bag, bagRules) {
  const parentBags = bagRules.filter(rule => rule.contains(bag.type))
  if (parentBags.length === 0) {
    return []
  } else {
    return parentBags.concat(parentBags.map(parentBag => getParents(parentBag, bagRules)))
      .flat()
      .filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.type === thing.type
        ))
      )
  }
};

async function totalParentBags () {
  try {
    const bagRules = parseRules(await getFile('input.txt'))
    const myBag = new Bag('shiny gold', [])
    const parentBags = getParents(myBag, bagRules)
    console.log(parentBags.length)
  } catch (err) {
    console.log(err)
  }
}

totalParentBags()

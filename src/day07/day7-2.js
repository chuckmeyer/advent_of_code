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

function getChildren (bag, bagRules) {
  const childBags = bagRules
    .filter(rule => rule.type === bag.type)
    .map(obj => obj.contents)
    .flat()
  if (childBags.length === 0) {
    return bag.number
  } else {
    return (bag.number * (childBags.map(childBag => getChildren(childBag, bagRules)).reduce((sum, value) => sum + value) + 1))
  }
};

async function totalChildBags () {
  try {
    const bagRules = parseRules(await getFile('input.txt'))
    const myBag = new Bag('shiny gold', [], 1)
    const totalBags = getChildren(myBag, bagRules)
    console.log(totalBags - 1)
  } catch (err) {
    console.log(err)
  }
}

totalChildBags()

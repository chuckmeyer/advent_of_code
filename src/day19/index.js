'use strict'

const fs = require('fs')
const { Validator } = require('./lib/day19-1')

function getFile (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().split('\n').filter(n => n))
    })
  })
}

async function validateMessages () {
  try {
    const inputFile = await getFile('./config/input.txt')
    let rules = []
    let messages = []
    inputFile.forEach(line => {
      if (line.includes(':')) {
        rules.push(line)
      } else {
        messages.push(line)
      }
    })
    const validator = new Validator()
    validator.initialize(rules)
    validator.parseRules()
    const validMessages = messages.filter(message => validator.isValid(message))
    console.log(validMessages.length)
  } catch (err) {
    console.log(err)
  }
}

validateMessages()

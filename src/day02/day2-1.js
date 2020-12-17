'use strict'
const fs = require('fs')

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

function validPasswords (passwords) {
  const valid = []
  const regexpPassword = /(\d+)-(\d+)\s(\w):\s(.+)/
  for (let i = 0; i < passwords.length; i++) {
    const match = passwords[i].match(regexpPassword)
    const regexpChar = new RegExp(match[3], 'g')
    const count = (match[4].match(regexpChar) || []).length
    if ((match[1] <= count) && (count <= match[2])) {
      // console.log(`${match[4]} contains between ${match[1]} and ${match[2]} varter ${match[3]} characters(${count}).`);
      valid.push(passwords[i])
    }
  }
  return valid
}

async function getValues () {
  const values = await getFile('input.txt')
  const valid = await validPasswords(values)
  console.log(valid)
  console.log(`Found ${valid.length} matches.`)
}

getValues()

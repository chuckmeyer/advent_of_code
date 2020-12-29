'use strict'
const fs = require('fs')

const getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().split('\n').filter(n => n).map(n => parseInt(n)))
    })
  })
}

const findInvalid = (data, range) => {
  return new Promise((resolve, reject) => {
    const invalid = []
    let i = 0
    while (i < data.length - range) {
      const preamble = data.slice(i, i + range)
      const number = data[i + range]
      if (!isValid(preamble, number)) {
        invalid.push(number)
      }
      i++
    }
    resolve(invalid)
  })
}

function isValid (preamble, number) {
  return preamble.filter(value1 => {
    return preamble.reduce((valid2, value2) => {
      if (value1 !== value2) {
        return (valid2 || (value1 + value2) === number)
      } else {
        return valid2
      }
    }, false)
  }).length > 0
}

async function validateXmas () {
  try {
    const range = 25
    const data = await getFile('input.txt')
    const invalid = await findInvalid(data, range)
    console.log(invalid)
  } catch (err) {
    console.log(err)
  }
}

validateXmas()

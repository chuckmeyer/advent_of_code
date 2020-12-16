'use strict'
const fs = require('fs')

const getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().split('\n').filter(n => n).map(value => parseInt(value)).sort((a, b) => a - b))
    })
  })
}

async function useAllAdapters () {
  try {
    let joltage = 0
    const bucket = {}
    const adapters = await getFile('input.txt')
    adapters.push(adapters[adapters.length - 1] + 3)
    let adapter = 0
    while ((adapter = adapters.shift()) !== undefined) {
      const diff = adapter - joltage
      if (diff <= 3) {
        bucket[diff] = bucket[diff] ? bucket[diff] + 1 : 1
        joltage = adapter
      } else {
        throw new Error(`No adapter within 3 of ${joltage}.`)
      }
    }
    console.log(bucket['1'] * bucket['3'])
  } catch (err) {
    console.log(err)
  }
}

useAllAdapters()

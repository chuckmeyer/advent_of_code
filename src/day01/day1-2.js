'use strict'
const fs = require('fs')

function getFile (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().split('\n').filter(n => n).map(Number))
    })
  })
}

function findSum (items, value) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items.length; j++) {
        if ((items[i] + items[j] < value) && (i !== j)) {
          for (let k = 0; k < items.length; k++) {
            if (i !== j !== k) {
              console.log(`${items[i]} + ${items[j]} + ${items[k]} = ${items[i] + items[j] + items[k]}`)
              if (items[i] + items[j] + items[k] === value) {
                resolve([items[i], items[j], items[k]])
    }}}}}}
  })
}

async function getValues () {
  const values = await getFile('input.txt')
  const res = await findSum(values, 2020)
  console.log(`${res[0]} * ${res[1]} * ${res[2]} = ${res[0] * res[1] * res[2]}`)
}

getValues()

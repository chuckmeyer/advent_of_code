'use strict'

const fs = require('fs')
const { normalize, flipTiles } = require('./lib/day24-1')

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

async function findBlackTiles () {
  try {
    const tiles = await getFile('./config/input.txt')
    console.log(flipTiles(tiles))
  } catch (err) {
    console.log(err)
  }
}

findBlackTiles()

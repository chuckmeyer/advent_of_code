'use strict'

const fs = require('fs')
const { normalize } = require('./lib/day24-1')

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

// const string = 'e'
// const string1 = 'esew'
// const string2 = 'nwwswee'
// const string3 = 'sesenwnenenewseeswwswswwnenewsewsw'

async function findBlackTiles () {
  try {
    const tiles = await getFile('./config/input-test.txt')
    const blackTiles = []
    tiles.forEach(location => {
      const normalized = normalize(location)
      if (blackTiles.includes(normalized)) {
        console.log(`White flip: ${normalized}`)
        blackTiles.splice(blackTiles.indexOf(normalized), 1)
      } else {
        console.log(`Black flip: ${normalized}`)
        blackTiles.push(normalized)
      }
    })
    console.log(blackTiles, blackTiles.length)
  } catch (err) {
    console.log(err)
  }
}

findBlackTiles()

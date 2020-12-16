'use strict'
const fs = require('fs')

function getFile (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().split('\n').filter(n => n).map(value => value.split('')))
    })
  })
}

function isOccupied (row, column, seatMap) {
  return seatMap[row][column] === '#'
}

function inBounds (row, column, seatMap) {
  return (row >= 0 && row < seatMap.length && column >= 0 && column < seatMap[row].length)
}

function findNeighbors (row, column, seatMap) {
  let occupied = 0
  for (const i of [-1, 0, 1]) {
    for (const j of [-1, 0, 1]) {
      if (i !== 0 || j !== 0) {
        if (inBounds(row + i, column + j, seatMap)) {
          if (isOccupied(row + i, column + j, seatMap)) {
            occupied++
          }
        }
      }
    }
  }
  return occupied
}

function deepCopy (arr) {
  const copy = []
  arr.forEach(elem => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem))
    } else {
      copy.push(elem)
    }
  })
  return copy
}

function totalOccupied (seatMap) {
  let occupied = 0
  for (let i = 0; i < seatMap.length; i++) {
    const rowLength = seatMap[i].length
    for (let j = 0; j < rowLength; j++) {
      if (seatMap[i][j] === '#') {
        occupied++
      }
    }
  }
  return occupied
}

function runRules (seatMap) {
  const nextSeatMap = deepCopy(seatMap)
  for (let i = 0; i < seatMap.length; i++) {
    for (let j = 0; j < seatMap[i].length; j++) {
      if (seatMap[i][j] !== '.') {
        const neighbors = findNeighbors(i, j, seatMap)
        if (seatMap[i][j] === 'L' && neighbors < 1) {
          nextSeatMap[i][j] = '#'
        } else if (seatMap[i][j] === '#' && neighbors >= 4) {
          nextSeatMap[i][j] = 'L'
        }
      }
    }
  }
  return nextSeatMap
}

async function bestSeat () {
  try {
    let seatMap = await getFile('input.txt')
    let stasis = false
    while (stasis === false) {
      const newSeatMap = runRules(seatMap)
      stasis = JSON.stringify(seatMap) === JSON.stringify(newSeatMap)
      seatMap = newSeatMap
      // console.table(newSeatMap)
    }
    console.log(totalOccupied(seatMap))
  } catch (err) {
    console.log(err)
  }
}

bestSeat()

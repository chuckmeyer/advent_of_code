'use strict'
const { timeStamp } = require('console')
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

async function bestBus () {
  try {
    const notes = await getFile('input.txt')
    const timestamp = parseInt(notes[0])
    const routes = notes[1].split(',').filter(n => n !== 'x').map(n => parseInt(n))
    const nextBus = []
    routes.forEach(route => {
      let nextTime = timestamp
      while (nextTime % route !== 0) {
        nextTime++
      }
      nextBus.push([route, nextTime - timestamp])
    })
    nextBus.sort((a, b) => {
      return a[1] - b[1]
    })
    console.log(`${nextBus[0][0]} arrives in ${nextBus[0][1]} minutes (${nextBus[0][0] * nextBus[0][1]})`)
  } catch (err) {
    console.log(err)
  }
}

bestBus()

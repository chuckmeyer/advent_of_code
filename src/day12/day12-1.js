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

class Ship {
  constructor () {
    this.facing = 'E'
    this.x = this.y = 0
  }

  turn (direction, degrees) {
    const cardinals = ['N', 'E', 'S', 'W']
    const i = cardinals.indexOf(this.facing)
    const j = (direction === 'R') ? degrees / 90 : 0 - (degrees / 90)
    this.facing = cardinals[((i + j) % cardinals.length + cardinals.length) % cardinals.length]
  }

  forward (amount) {
    this.move(this.facing, amount)
  }

  move (direction, amount) {
    switch (direction) {
      case 'N':
        this.y += amount
        break
      case 'S':
        this.y -= amount
        break
      case 'E':
        this.x += amount
        break
      case 'W':
        this.x -= amount
        break
    }
  }

  location () {
    return Math.abs(this.x) + Math.abs(this.y)
  }
}

function navigate (instruction, ship) {
  const parsed = instruction.match(/(\w)(\d+)/)
  const action = parsed[1]
  const value = parseInt(parsed[2])
  // console.log(action, value)
  if (action === 'F') {
    ship.forward(value)
  } else if (action.match(/N|E|S|W/)) {
    ship.move(action, value)
  } else if (action.match(/R|L/)) {
    ship.turn(action, value)
  } else {
    console.error(`Unknown instruction: ${instruction}`)
  }
}

async function manhattanDistance () {
  try {
    const route = await getFile('input.txt')
    const ferry = new Ship()
    route.forEach(instruction => {
      navigate(instruction, ferry)
      // console.log(ferry.x, ferry.y, ferry.location(), ferry.facing)
    })
    console.log(ferry.location())
  } catch (err) {
    console.log(err)
  }
}

manhattanDistance()

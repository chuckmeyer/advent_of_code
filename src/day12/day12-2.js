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
    this.x = this.y = 0
    this.wpX = 10
    this.wpY = 1
  }

  rotate (direction, degrees) {
    let i = (direction === 'R') ? degrees / 90 : 0 - (degrees / 90)
    i = (i % 4 + 4) % 4
    for (let j = 0; j < i; j++) {
      const invertX = 0 - this.wpX
      this.wpX = this.wpY
      this.wpY = invertX
    }
  }

  forward (amount) {
    for (let i = 0; i < amount; i++) {
      this.x += this.wpX
      this.y += this.wpY
    }
  }

  move (direction, amount) {
    switch (direction) {
      case 'N':
        this.wpY += amount
        break
      case 'S':
        this.wpY -= amount
        break
      case 'E':
        this.wpX += amount
        break
      case 'W':
        this.wpX -= amount
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
    ship.rotate(action, value)
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
      // console.log(ferry.x, ferry.y, ferry.wpX, ferry.wpY, ferry.location())
    })
    console.log(ferry.location())
  } catch (err) {
    console.log(err)
  }
}

manhattanDistance()

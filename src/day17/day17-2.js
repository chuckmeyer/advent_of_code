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

class PocketD {
  constructor () {
    this.matrix = new Map()
    this.y = 0
    this.x = 0
    this.z = 0
    this.w = 0
  }

  initialize (config) {
    const z = 0
    const w = 0
    for (let y = 0; y < config.length; y++) {
      const row = config[y].split('')
      for (let x = 0; x < row.length; x++) {
        if (row[x] === '#') { this.matrix.set([x, y, z, w].join(','), '#') }
        this.y = config.length
        this.x = row.length
        this.z = 1
        this.w = 1
      }
    }
  }

  showSlice (z, w) {
    console.log(`z=${z}, w=${w}`)
    for (let y = 0; y < this.y; y++) {
      let row = ''
      for (let x = 0; x < this.x; x++) {
        const cube = [x, y, z, w].join(',')
        this.isActive(cube) ? row += '#' : row += '.'
      }
      console.log(row)
    }
  }

  showMatrix () {
    for (let w = 0; w < this.w; w++) {
      for (let z = 0; z < this.z; z++) {
        this.showSlice(z, w)
      }
    }
  }

  isActive (cube) {
    return this.matrix.get(cube) === '#'
  }

  totalActive () {
    return this.matrix.size
  }

  eval (cube) {
    let active = 0
    const coord = cube.split(',').map(n => parseInt(n))
    for (let w = coord[3] - 1; w <= coord[3] + 1; w++) {
      for (let z = coord[2] - 1; z <= coord[2] + 1; z++) {
        for (let y = coord[1] - 1; y <= coord[1] + 1; y++) {
          for (let x = coord[0] - 1; x <= coord[0] + 1; x++) {
            const adjacent = [x, y, z, w].join(',')
            if (adjacent !== cube) {
              if (this.isActive(adjacent)) {
                active++
              }
            }
          }
        }
      }
    }
    return active
  }

  cycle () {
    /*
    If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
    If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
    */
    const newMatrix = new Map()
    for (let w = -1; w < this.w + 1; w++) {
      for (let z = -1; z < this.z + 1; z++) {
        for (let y = -1; y < this.y + 1; y++) {
          for (let x = -1; x < this.x + 1; x++) {
            const cube = [x, y, z, w].join(',')
            const neighbors = this.eval(cube)
            // console.log(`${cube}: [${this.isActive(cube)}]: ${neighbors}`)
            if (this.isActive(cube)) {
              if (neighbors >= 2 && neighbors <= 3) {
                newMatrix.set([x + 1, y + 1, z + 1, w + 1].join(','), '#')
              }
            } else {
              if (neighbors === 3) {
                newMatrix.set([x + 1, y + 1, z + 1, w + 1].join(','), '#')
              }
            }
          }
        }
      }
    }
    this.matrix = newMatrix
    this.y += 2
    this.x += 2
    this.z += 2
    this.w += 2
  }
}

async function bootup () {
  const cycles = 6
  try {
    const config = await getFile('input.txt')
    const energySource = new PocketD()
    energySource.initialize(config)
    energySource.showMatrix()
    console.log('----')
    for (let i = 0; i < cycles; i++) {
      energySource.cycle()
      energySource.showMatrix()
      console.log('----')
    }
    console.log(energySource.totalActive())
  } catch (err) {
    console.log(err)
  }
}

bootup()

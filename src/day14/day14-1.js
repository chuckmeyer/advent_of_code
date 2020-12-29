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

class Computer {
  constructor () {
    this.memory = {}
    this.bitmask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  }

  mask (value) {
    const binaryValue = (parseInt(value)).toString(2).split('').reverse()
    const revMask = this.bitmask.split('').reverse()
    for (let i = 0; i < this.bitmask.length; i++) {
      if (binaryValue[i] === undefined) { binaryValue[i] = 0 }
      binaryValue[i] = revMask[i] === 'X' ? binaryValue[i] : revMask[i]
    }
    return parseInt(binaryValue.reverse().join(''), 2)
  }

  sum () {
    return Object.values(this.memory).reduce((s, v) => s + v)
  }

  execute (instruction) {
    const parsed = instruction.split(' = ')
    const opRegEx = /(\w+)\[?(\d*)\]?/
    const op = parsed[0].match(opRegEx)
    const val = parsed[1]
    if (op[1] === 'mask') {
      this.bitmask = val
    } else if (op[1] === 'mem') {
      this.memory[op[2]] = this.mask(val)
    }
  }
}

async function initialize () {
  try {
    const ferry = new Computer()
    const program = await getFile('input.txt')
    program.forEach(instruction => {
      ferry.execute(instruction)
    })
    console.log(ferry.sum())
  } catch (err) {
    console.log(err)
  }
}

initialize()

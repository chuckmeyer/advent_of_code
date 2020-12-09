'use strict'
const fs = require('fs')

const getFile = (fileName) => {
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
    this.acc = 0
    this.executedLines = []
  }

  execute (instruction, number) {
    if (this.executedLines.includes(number)) {
      console.log('Loop detected!')
      return -1
    }
    const [operation, argument] = instruction.split(' ')
    this.executedLines.push(number)
    switch (operation) {
      case 'nop':
        console.log(`[${number}] No operation`)
        return number + 1
      case 'acc':
        console.log(`[${number}] Accumulator: ${argument}`)
        this.modifyAcc(parseInt(argument))
        return number + 1
      case 'jmp':
        console.log(`[${number}] Jump: ${argument}`)
        return number + parseInt(argument)
      default:
        console.log(`[${number}] Unknown instruction`)
        return -1
    }
  }

  modifyAcc (amount) {
    this.acc += amount
    console.log(this.acc)
  }

  getAcc () {
    return this.acc
  }
}

async function runProgram () {
  try {
    const handheld = new Computer()
    const program = await getFile('input.txt')
    let next = 0
    while (next >= 0 & next < program.length) {
      next = handheld.execute(program[next], next)
    }
    if (next > 0) {
      console.log(handheld.getAcc())
    } else {
      console.log('[Anomalous end]')
    }
  } catch (err) {
    console.log(err)
  }
}

runProgram()

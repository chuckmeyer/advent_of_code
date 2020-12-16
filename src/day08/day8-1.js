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

  execute (instruction, line) {
    if (this.executedLines.includes(line)) {
      console.log(`[${line}] Loop detected!`)
      return -1
    }
    const [operation, argument] = instruction.split(' ')
    this.executedLines.push(line)
    switch (operation) {
      case 'nop':
        return line + 1
      case 'acc':
        this.modifyAcc(parseInt(argument))
        return line + 1
      case 'jmp':
        return line + parseInt(argument)
      default:
        console.log(`[${line}] Unknown instruction`)
        return -1
    }
  }

  modifyAcc (amount) {
    this.acc += amount
  }

  getAcc () {
    return this.acc
  }
}

async function runProgram () {
  try {
    const handheld = new Computer()
    const program = await getFile('input.txt')
    let nextLine = 0
    while (nextLine >= 0 & nextLine < program.length) {
      nextLine = handheld.execute(program[nextLine], nextLine)
    }
    console.log(handheld.getAcc())
  } catch (err) {
    console.log(err)
  }
}

runProgram()

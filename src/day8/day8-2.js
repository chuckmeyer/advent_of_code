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
      console.log(`[${number}] Loop detected!`)
      return -1
    }
    const [operation, argument] = instruction.split(' ')
    this.executedLines.push(number)
    switch (operation) {
      case 'nop':
        return number + 1
      case 'acc':
        this.modifyAcc(parseInt(argument))
        return number + 1
      case 'jmp':
        return number + parseInt(argument)
      default:
        console.log(`[${number}] Unknown instruction`)
        return -1
    }
  }

  modifyAcc (amount) {
    this.acc += amount
  }

  getAcc () {
    return this.acc
  }

  reset () {
    this.executedLines = []
    this.acc = 0
  }
}

function fix (program, line) {
  const [operation, argument] = program[line].split(' ')
  if (operation !== 'acc') {
    operation === 'jmp' ? program[line] = `nop ${argument}` : program[line] = `jmp ${argument}`
  }
  return program
}

async function runProgram () {
  try {
    const handheld = new Computer()
    let program = await getFile('input.txt')
    let nextLine = 0
    let fixPoint = 0
    while (nextLine < program.length) {
      nextLine = handheld.execute(program[nextLine], nextLine)
      if (nextLine === -1) {
        if (fixPoint > 0) {
          /* Restore previous fix */
          program = fix(program, fixPoint - 1)
        }
        while (program[fixPoint].match(/acc.+/)) { fixPoint++ }
        program = fix(program, fixPoint)
        handheld.reset()
        nextLine = 0
        fixPoint++
      }
    }
    console.log(handheld.getAcc())
  } catch (err) {
    console.log(err)
  }
}

runProgram()

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
    console.log(`Fix at [${fixPoint - 1}] ${program[fixPoint -1 ]}`)
    console.log(handheld.getAcc())
  } catch (err) {
    console.log(err)
  }
}

runProgram()

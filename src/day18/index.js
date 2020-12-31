const { calculate } = require('./lib/day18-1')

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

//const equation = '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'
// const equation = '1 + (2 * 3) + (4 * (5 + 6))'
// const equation = '(((1 + 2) * 3) + 4 * (5 + 6))'
// const equation = '4 + ((8 + 3 * 6) * 7 * 4)'
// console.log(calculate(equation))

async function doHomework () {
  try {
    const homework = await getFile('input.txt')
    console.log(homework.reduce((sum, equation) => sum + calculate(equation), 0))
  } catch (err) {
    console.log(err)
  }
}

doHomework()

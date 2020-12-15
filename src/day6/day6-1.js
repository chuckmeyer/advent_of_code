var fs = require('fs')

const getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().replace(/\n*$/, '').split(/\n{2,}/g).map(group => group.split(/\s+/g)))
    })
  })
}

function getAnswerCount (group) {
  let allAnswers = []

  group.forEach(answerString => {
    allAnswers = [...allAnswers, ...answerString.split('')]
  })
  const uniqueAnswers = allAnswers.filter((item, index) => allAnswers.indexOf(item) === index)
  return uniqueAnswers.length
}

async function tallyAnswers () {
  try {
    const answerGroups = await getFile('input.txt')
    console.log(answerGroups.map(getAnswerCount).reduce((total, count) => total + count))
  } catch (err) {
    console.log(err)
  }
}

tallyAnswers()

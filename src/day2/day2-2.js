const fs = require('fs')

const getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().split('\n').filter(n => n))
    })
})}

let ValidPasswords = (passwords) => {
  return new Promise((resolve, reject) => {
    const regexpPassword = /(\d+)\-(\d+)\s(\w):\s(.+)/
    const valid = passwords.filter((line) => {
      const [value, first, second, character, password] = line.match(regexpPassword)
      return (password[first - 1] === character ^ password[second - 1] === character)
    })
    resolve(valid)
})}

async function validatePasswords () {
  try {
    const values = await getFile('input.txt')
    const valid = await ValidPasswords(values)
    console.log(`Found ${valid.length} valid passwords.`)
  } catch (err) {
    console.log(err)
  }
}

validatePasswords()

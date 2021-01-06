'use strict'

const { Grammar } = require('./day24-grammar')

function tokenize (location) {
  const tokens = []
  while (location.length > 0) {
    const result = getToken(location)
    tokens.push(result.token)
    location = result.location
  }
  return tokens
}

function getToken (location) {
  const intermediate = /n|s/
  let token = location.slice(0, 1)
  if (intermediate.test(token) === true) {
    token += location.slice(1, 2)
    location = location.slice(2)
  } else {
    location = location.slice(1)
  }
  return {
    token: token,
    location: location
  }
}

function parseLocation (location, grammar) {
  let changed = false
  location.forEach(token => {
    const compliments = grammar.findCompliments(token)
    for (let i = 0; i < compliments.length; i++) {
      if (location.includes(compliments[i])) {
        location.splice(location.indexOf(token), 1)
        location.splice(location.indexOf(compliments[i]), 1)
        const result = grammar.getResult(token, compliments[i])
        if (result !== '') location.unshift(result)
        changed = true
        break
      }
    }
  })
  return changed
}

function normalize (location) {
  const grammar = new Grammar()
  location = tokenize(location)
  let changed = false
  do {
    changed = parseLocation(location, grammar)
  } while (changed === true)
  return location.sort().join('')
}

function flipTiles (tiles) {
  const blackTiles = []
  let blackFlip = 0
  let whiteFlip = 0
  tiles.forEach(location => {
    const normalized = normalize(location)
    if (blackTiles.includes(normalized)) {
      whiteFlip++
      blackTiles.splice(blackTiles.indexOf(normalized), 1)
    } else {
      blackFlip++
      blackTiles.push(normalized)
    }
  })
  // console.log(blackTiles.length, blackFlip, whiteFlip)
  return blackTiles.length
}

exports.normalize = normalize
exports.flipTiles = flipTiles

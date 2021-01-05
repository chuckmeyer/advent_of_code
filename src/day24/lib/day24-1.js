'use strict'

const fs = require('fs')
const { grammar } = require('./day24-grammar')

class Tile {
  constructor (location) {
    this.location = location
  }
}

function getToken(location) {
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

function parseLocation (location) {
  let result
  let parsedLocation = ''
  result = getToken(location)
  const token1 = result.token
  if (result.location.length === 0) {
    return token1
  }
  parsedLocation = parseLocation(result.location)
  result = getToken(parsedLocation)
  const token2 = result.token
  const tuple = token1 + token2
  if (tuple in grammar) {
    parsedLocation = grammar[tuple] + result.location
  } else {
    parsedLocation = token1 + token2 + result.location
  }
  return parsedLocation
}

function normalize (location) {
  let mutated = true
  while (mutated) {
    const parsedLocation = parseLocation(location)
    mutated = location !== parsedLocation
    location = parsedLocation
  }
  return location
}

exports.normalize = normalize

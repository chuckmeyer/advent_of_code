const string1 = 'esew'
const string2 = 'nwwswee'
const string3 = 'sesenwnenenewseeswwswswwnenewsewsw'

class Tile {
  constructor (location) {
    this.location = location
  }
}

const grammar = {
  nese: 'e',
  sene: 'e',
  esw: 'se',
  swe: 'se',
  wse: 'sw',
  sew: 'sw',
  nwsw: 'w',
  swnw: 'w',
  wne: 'nw',
  new: 'nw',
  enw: 'ne',
  nwe: 'ne',
  nwse: '',
  senw: '',
  nesw: '',
  swne: '',
  we: '',
  ew: ''
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
  let parsedLocation = ''
  let result = getToken(location)
  if (result.location.length > 0) {
    const token1 = result.token
    result = getToken(result.location)
    const token2 = result.token
    location = result.location
    const tuple = token1 + token2
    if (tuple in grammar) {
      parsedLocation += grammar[tuple]
      location = grammar[tuple] + location
    } else {
      parsedLocation += token1
      location = token2 + location
    }
  }
  return parsedLocation
}

let parsedLocation = parseLocation(string1)
console.log(parsedLocation)
parsedLocation = parseLocation(parsedLocation)
console.log(parsedLocation)
//parseTile(string2)
//parseTile(string3)
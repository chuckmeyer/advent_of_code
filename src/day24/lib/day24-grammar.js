'use strict'

class Grammar {
  constructor () {
    this.rules = {
      nese: 'e',
      swe: 'se',
      sew: 'sw',
      nwsw: 'w',
      new: 'nw',
      nwe: 'ne',
      nwse: '',
      nesw: '',
      ew: ''
    }
    this.compliments = {
      ne: ['sw', 'w', 'se'],
      e: ['w', 'nw', 'sw'],
      se: ['nw', 'w', 'ne'],
      sw: ['ne', 'e', 'nw'],
      w: ['e', 'ne', 'se'],
      nw: ['se', 'e', 'sw']
    }
  }

  findCompliments (token) {
    return this.compliments[token]
  }

  getResult (token1, token2) {
    if (token1 + token2 in this.rules) {
      return this.rules[token1 + token2]
    } else if (token2 + token1 in this.rules) {
      return this.rules[token2 + token1]
    } else {
      return -1
    }
  }
}

exports.Grammar = Grammar

const { ConsoleReporter } = require("jasmine")

class Validator {
  constructor (input) {
    this.rules = []
    this.matchStrings = []
  }

  initialize (input) {
    input.forEach(line => {
      if (line.includes(':')) {
        const parsed = line.split(': ')
        this.rules[parsed[0]] = parsed[1]
      }
    })
  }

  getRules () {
    return this.rules
  }

  showRules () {
    this.rules.map(rule => console.log(rule))
  }

  parseRule (number) {
    const leafRule = /"(\w)"/
    const rule = this.rules[number]
    if (leafRule.test(rule)) {
      return [rule.match(leafRule)[1]]
    } else if (rule.includes('|')) {
      let matchStrings = []
      rule.split(' | ').forEach(orRule => {
        let orStrings = []
        orRule.split(' ').forEach(sub => {
          const subStrings = this.parseRule(parseInt(sub))
          if (orStrings.length < 1) {
            orStrings = subStrings
          } else {
            const matrix = []
            orStrings.forEach(orString => {
              subStrings.forEach(subString => {
                matrix.push(orString + subString)
              })
            })
            orStrings = matrix
          }
        })
        matchStrings = matchStrings.concat(orStrings)
      })
      return matchStrings
    } else {
      let matchStrings = []
      rule.split(' ').forEach(sub => {
        const subStrings = this.parseRule(parseInt(sub))
        if (matchStrings.length < 1) {
          matchStrings = subStrings
        } else {
          const matrix = []
          matchStrings.forEach(matchString => {
            subStrings.forEach(subString => {
              matrix.push(matchString + subString)
            })
          })
          matchStrings = matrix
        }
      })
      return matchStrings
    }
  }

  parseRules () {
    this.matchStrings = this.parseRule(0)
    return this.matchStrings
  }

  isValid (message) {
    return this.matchStrings.includes(message)
  }
}

exports.Validator = Validator

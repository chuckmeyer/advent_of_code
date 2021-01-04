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
    return this.parseRules()
  }

  getRules () {
    return this.rules
  }

  showRules () {
    this.rules.map(rule => console.log(rule))
  }

  parseRules () {
    this.matchStrings = this.parseRule(0)
    return this.matchStrings
  }

  parseRule (number) {
    const leafRule = /"(\w)"/
    const rule = this.rules[number]
    if (leafRule.test(rule)) {
      return [rule.match(leafRule)[1]]
    } else if (rule.includes('|')) {
      let matchStrings = []
      rule.split(' | ').forEach(orRule => {
        const orStrings = this.parseConcatRule(orRule)
        matchStrings = matchStrings.concat(orStrings)
      })
      return matchStrings
    } else {
      return this.parseConcatRule(rule)
    }
  }

  parseConcatRule (rule) {
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

  isValid (message) {
    return this.matchStrings.includes(message)
  }
}

exports.Validator = Validator

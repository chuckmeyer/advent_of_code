/* eslint-env jasmine */

describe('2020 - Day 19 - Part One', () => {
  const { Validator } = require('../lib/day19-1')
  let validator

  beforeEach(() => {
    validator = new Validator()
  })

  it('should read a rule', () => {
    validator.initialize(['0: 1 2'])
    expect(validator.getRules()[0]).toEqual('1 2')
  })

  it('should parse rules', () => {
    validator.initialize([
      '0: 4 1 5',
      '1: 2 3 | 3 2',
      '2: 4 4 | 5 5',
      '3: 4 5 | 5 4',
      '4: "a"',
      '5: "b"'
    ])
    expect(validator.parseRules()).toEqual([
      'aaaabb',
      'aaabab',
      'abbabb',
      'abbbab',
      'aabaab',
      'aabbbb',
      'abaaab',
      'ababbb'
    ])
  })

  it('should determine a message matches all rules', () => {
    validator.initialize([
      '0: 4 1 5',
      '1: 2 3 | 3 2',
      '2: 4 4 | 5 5',
      '3: 4 5 | 5 4',
      '4: "a"',
      '5: "b"'
    ])
    validator.parseRules()
    expect(validator.isValid('ababbb')).toBe(true)
  })

  it('should fail if a message does not match all rules', () => {
    validator.initialize([
      '0: 4 1 5',
      '1: 2 3 | 3 2',
      '2: 4 4 | 5 5',
      '3: 4 5 | 5 4',
      '4: "a"',
      '5: "b"'
    ])
    validator.parseRules()
    expect(validator.isValid('bababa')).toBe(false)
  })
})

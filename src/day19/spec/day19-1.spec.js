/* eslint-env jasmine */

describe('2020 - Day 19 - Part One', () => {
  const { Validator } = require('../lib/day19-1')
  let validator

  beforeEach(() => {
    validator = new Validator()
  })

  it('should read a rule', () => {
    validator.initialize(['0: "a"'])
    expect(validator.getRules()[0]).toEqual('"a"')
  })

  it('should parse rules', () => {
    expect(validator.initialize([
      '0: 4 1 5',
      '1: 2 3 | 3 2',
      '2: 4 4 | 5 5',
      '3: 4 5 | 5 4',
      '4: "a"',
      '5: "b"'
    ])).toEqual([
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
    expect(validator.isValid('bababa')).toBe(false)
  })
})

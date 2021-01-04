/* eslint-env jasmine */
const { calculate } = require('../lib/day18-1')

describe('2020 - Day 18 - Part One', () => {
  it('should solve for the first example', () => {
    expect(calculate('1 + 2 * 3 + 4 * 5 + 6')).toBe(71)
  })

  it('should solve for the second example', () => {
    expect(calculate('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51)
  })

  it('should solve for the third example', () => {
    expect(calculate('2 * 3 + (4 * 5)')).toBe(26)
  })

  it('should solve for the fourth example', () => {
    expect(calculate('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toBe(437)
  })

  it('should solve for the fifth example', () => {
    expect(calculate('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toBe(12240)
  })

  it('should solve for the sixth example', () => {
    expect(calculate('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toBe(13632)
  })
})

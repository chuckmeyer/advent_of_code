/* eslint-env jasmine */

describe('2020 - Day 24 - Part One', () => {
  const { normalize } = require('../lib/day24-1')

  it('should normalize example one', () => {
    expect(normalize('esenee')).toEqual('eee')
  })

  it('should normalize example two', () => {
    expect(normalize('esew')).toEqual('se')
  })

  it('should normalize example three', () => {
    expect(normalize('nwwswee')).toEqual('')
  })
})
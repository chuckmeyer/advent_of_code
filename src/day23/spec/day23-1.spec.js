/* eslint-env jasmine */

describe('2020 - Day 23 - Part One', () => {
  const { CupGame } = require('../lib/day23-1')

  it('should solve for sample input in 10 moves', () => {
    const cupgame = new CupGame('389125467')
    cupgame.move(10)
    expect(cupgame.getLabels()).toEqual('92658374')
  })

  it('should solve for sample input in 100 moves', () => {
    const cupgame = new CupGame('389125467')
    cupgame.move(100)
    expect(cupgame.getLabels()).toEqual('67384529')
  })
})

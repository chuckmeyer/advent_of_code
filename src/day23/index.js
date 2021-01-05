'use strict'

const { CupGame } = require('./lib/day23-1')

function playGame(labels) {
  const cupGame = new CupGame(labels)
  cupGame.move(100)
  console.log(cupGame.getLabels())
}

playGame('925176834')

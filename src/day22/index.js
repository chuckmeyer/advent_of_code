'use strict'

const fs = require('fs')
const { ConsoleReporter } = require('jasmine')

function getFile (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().split('\n').filter(n => n))
    })
  })
}

function playRound (decks) {
  console.log(`Player 1's deck: ${decks[0]}`)
  console.log(`Player 2's deck: ${decks[1]}`)
  const player1 = decks[0].shift()
  const player2 = decks[1].shift()
  console.log(`Player 1 playes: ${player1}`)
  console.log(`Player 2 playes: ${player2}`)
  if (player1 > player2) {
    console.log('Player 1 wins the round!')
    decks[0].push(player1, player2)
  } else {
    console.log('Player 2 wins the round!')
    decks[1].push(player2, player1)
  }
  return decks
}

function totalScore (deck) {
  let score = 0
  for (let i = deck.length; i > 0; i--) {
    const card = deck.shift()
    console.log(`${card} x ${i}`)
    score += card * i
  }
  return score
}

async function playCombat () {
  try {
    const inputFile = await getFile('./config/input.txt')
    const decks = []
    let player = 0
    inputFile.forEach(line => {
      if (line.includes('Player')) {
        player = parseInt(line.match(/Player (\d+):/)[1]) - 1
        decks[player] = []
      } else {
        decks[player].push(parseInt(line))
      }
    })
    let round = 1
    console.log(decks)
    while (decks[0].length > 0 && decks[1].length > 0) {
      console.log(`-- Round ${round} --`)
      playRound(decks)
      round++
    }
    console.log('\n== Post-game results ==')
    console.log(`Player 1's deck: ${decks[0]}`)
    console.log(`Player 2's deck: ${decks[1]}`)
    if (decks[0].length > 0) {
      console.log(totalScore(decks[0]))
    } else {
      console.log(totalScore(decks[1]))
    }
  } catch (err) {
    console.log(err)
  }
}

playCombat()
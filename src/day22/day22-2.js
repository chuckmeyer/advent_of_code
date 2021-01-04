'use strict'

const fs = require('fs')
let game = 1

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

function playRound (decks, thisGame, thisRound) {
  // console.log(`-- Round ${thisRound} (Game ${thisGame}) --`)
  // console.log(`Player 1's deck: ${decks[0]}`)
  // console.log(`Player 2's deck: ${decks[1]}`)
  const player1 = decks[0].shift()
  const player2 = decks[1].shift()
  // console.log(`Player 1 playes: ${player1}`)
  // console.log(`Player 2 playes: ${player2}`)
  if (player1 <= decks[0].length && player2 <= decks[1].length) {
    console.log('Playing a sub-game to determine the winner...\n')
    let nextDecks = []
    nextDecks[0] = decks[0].slice(0, player1)
    nextDecks[1] = decks[1].slice(0, player2)
    game++
    nextDecks = playGame(nextDecks, game)
    // console.log(`...anyway, back to game ${thisGame}.`)
    if (nextDecks[0].length > nextDecks[1].length) {
      // console.log(`Player 1 wins round ${thisRound} of game ${thisGame}!\n`)
      decks[0].push(player1, player2)
    } else {
      // console.log(`Player 2 wins round ${thisRound} of game ${thisGame}!\n`)
      decks[1].push(player2, player1)
    }
  } else {
    if (player1 > player2) {
      // console.log(`Player 1 wins round ${thisRound} of game ${thisGame}!\n`)
      decks[0].push(player1, player2)
    } else {
      // console.log(`Player 2 wins round ${thisRound} of game ${thisGame}!\n`)
      decks[1].push(player2, player1)
    }
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

function repeatingRound (decks, previousRounds) {
  let repeating = false
  previousRounds.forEach(prevDecks => {
    const currentRepeating = prevDecks[0].length === decks[0].length &&
      prevDecks[1].length === decks[1].length &&
      prevDecks[0].every((value, index) => value === decks[0][index]) &&
      prevDecks[1].every((value, index) => value === decks[1][index])
    repeating = repeating || currentRepeating
  })
  return repeating
}

function playGame (decks, thisGame) {
  console.log(`=== Game ${thisGame} ===\n`)
  let round = 1
  const previousRounds = []
  while (decks[0].length > 0 && decks[1].length > 0) {
    decks = playRound(decks, thisGame, round)
    if (repeatingRound(decks, previousRounds)) {
      console.log('REPEATING ROUND!')
      decks[1] = []
    } else {
      previousRounds.push(JSON.parse(JSON.stringify(decks)))
      round++
    }
  }
  if (decks[0].length > decks[1].length) {
    console.log(`The winner of game ${thisGame} is player 1!\n`)
  } else {
    console.log(`The winner of game ${thisGame} is player 2!\n`)
  }
  return decks
}

async function playCombat () {
  try {
    const inputFile = await getFile('./config/input.txt')
    let decks = []
    let player = 0
    inputFile.forEach(line => {
      if (line.includes('Player')) {
        player = parseInt(line.match(/Player (\d+):/)[1]) - 1
        decks[player] = []
      } else {
        decks[player].push(parseInt(line))
      }
    })
    decks = playGame(decks, game)
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

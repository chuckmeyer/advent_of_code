const sequence = [7, 14, 0, 17, 11, 1, 2]
const iterations = 30000000
//const sequence = [0, 3, 6]
//const iterations = 2020

function playTurn (turn) {
  const played = turn.map.get(turn.next)
  turn.map.set(turn.next, turn.counter)
  turn.last = turn.next
  if (played) {
    turn.next = turn.counter - played
  } else {
    turn.next = 0
  }
  turn.counter++
  return turn
}

function playGame (numbers, iterations) {
  const numbersMap = new Map()
  for (let n = 1; n <= numbers.length; n++) {
    numbersMap.set(numbers[n - 1], n)
  }

  let nextTurn = {
    counter: numbers.length + 1,
    last: numbers[numbers.length - 1],
    next: 0,
    map: numbersMap
  }

  for (let i = numbers.length + 1; i <= iterations; i++) {
    nextTurn = playTurn(nextTurn)
  }
  console.log(nextTurn.last)
}

playGame(sequence, iterations)

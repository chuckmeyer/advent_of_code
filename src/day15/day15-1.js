const sequence = [7, 14, 0, 17, 11, 1, 2]
const iterations = 2020

function previousTurn (value, numbers) {
  for (let i = numbers.length - 2; i >= 0; i--) {
    if (numbers[i] === value) {
      return i + 1
    }
  }
  return -1
}

function playTurn (numbers) {
  const turn = previousTurn(numbers[numbers.length - 1], numbers)
  turn !== -1 ? numbers.push(numbers.length - turn) : numbers.push(0)
  return numbers
}

function playGame (numbers, iterations) {
  while (numbers.length < iterations) {
    numbers = playTurn(numbers)
  }
  console.log(`${numbers[iterations - 1]}`)
}

playGame(sequence, iterations)

const sequence = [7, 14, 0, 17, 11, 1, 2]
/* const sequence = [0, 3, 6] */
const iterations = 30000000

function playGame (numbers, iterations) {
  const numbersMap = new Map()
  for (let n = 1; n <= numbers.length; n++) {
    numbersMap.set(numbers[n - 1], n)
  }

  let lastNumber = numbers[numbers.length - 1]
  let nextNumber = 0

  for (let i = numbers.length + 1; i <= iterations; i++) {
    const played = numbersMap.get(nextNumber)
    numbersMap.set(nextNumber, i)
    lastNumber = nextNumber
    if (played) {
      nextNumber = i - played
    } else {
      nextNumber = 0
    }
  }

  console.log(lastNumber)
}

playGame(sequence, iterations)

'use strict'

function evalParenth (token, expression) {
  let next = token.slice(0, -1)
  const sub = []
  do {
    if (next.includes(')')) {
      const result = evalParenth(next, expression)
      next = result[0]
      expression = result[1]
    } else {
      sub.unshift(next)
      next = expression.pop()
    }
  } while (!next.includes('(') && expression.length > 0)
  if (next.includes('(')) {
    next = next.slice(1)
    let prefix = ''
    while (next.includes('(')) {
      next = next.slice(1)
      prefix += '('
    }
    sub.unshift(next)
    token = `${prefix}${evalExpression(sub)}`
  } else {
    console.log('Mismatched parenthesis!')
  }
  return [token, expression]
}

function evalAddition (expression) {
  let num2 = expression.pop()
  if ((num2).toString().includes(')')) {
    const result = evalParenth(num2, expression)
    num2 = result[0]
    expression = result[1]
  }
  if (expression.length === 0) {
    return [num2]
  }
  const op = expression.pop()
  if (expression.length === 1) {
    if (op === '+') {
      expression = [parseInt(expression.pop()) + parseInt(num2)]
    } else {
      expression = [expression.pop(), op, num2]
    }
  } else {
    expression = evalAddition(expression)
    if (op === '+') {
      expression[expression.length - 1] = parseInt(expression[expression.length - 1]) + parseInt(num2)
    } else {
      expression = expression.concat([op, num2])
    }
  }
  return expression
}

function evalMultiplication (expression) {
  if (expression.length === 1) {
    return expression
  }
  const num2 = expression.pop()
  const op = expression.pop()
  if (expression.length > 1) {
    expression = evalMultiplication(expression)
  }
  if (op === '*') {
    expression = [parseInt(expression.pop()) * parseInt(num2)]
  } else {
    console.log(`Unexpected op: ${op}`)
  }
  return expression
}

function evalExpression (expression) {
  return evalMultiplication(evalAddition(expression))
}

function calculate (equation) {
  return evalExpression(equation.split(' '))[0]
}

exports.calculate = calculate
exports.evalAddition = evalAddition

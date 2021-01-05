'use strict'

class CupGame {
  constructor (labels) {
    this.cups = labels.split('').map(n => parseInt(n))
    this.current = this.cups[0]
    this.highest = this.cups.reduce((a, b) => Math.max(a, b))
  }

  _cup (label) {
    return this.cups.indexOf(label)
  }

  _nextCup (label) {
    if (this._cup(label) === this.cups.length - 1) {
      return this.cups[0]
    } else {
      return this.cups[this._cup(label) + 1]
    }
  }

  _reorderCups () {
    let newCups = this.cups.slice(this._cup(this.current))
    newCups = newCups.concat(this.cups.slice(0, this._cup(this.current)))
    this.cups = newCups
  }

  showCups () {
    console.log(this.cups)
  }

  getLabels () {
    let labels = ''
    let current = 1
    while (labels.length < this.cups.length - 1) {
      const nextLabel = this._nextCup(current)
      labels += nextLabel
      current = this._nextCup(current)
    }
    return labels
  }

  shiftCurrent () {
    this.current = this._nextCup(this.current)
    this._reorderCups()
  }

  putThree (cups) {
    let dest = this.current - 1
    while (this._cup(dest) === -1) {
      if (dest === -1) {
        dest = this.highest
      } else {
        dest--
      }
    }
    this.putCups(cups, dest)
  }

  getCup () {
    const newCups = [this.cups.shift()]
    const myCup = [this.cups.shift()]
    while (this.cups.length > 0) {
      newCups.push(this.cups.shift())
    }
    this.cups = newCups
    return myCup
  }

  putCups (cups, after) {
    Array.prototype.splice.apply(this.cups, [this._cup(after) + 1, 0].concat(...cups))
  }

  getThree () {
    const myCups = []
    for (let i = 0; i < 3; i++) {
      myCups.push(this.getCup())
    }
    return myCups
  }

  move (moves) {
    for (let i = 1; i <= moves; i++) {
      // console.log(`-- move ${i} --`)
      // this.showCups()
      this.putThree(this.getThree())
      this.shiftCurrent()
    }
    // console.log('-- final --')
    // this.showCups()
  }
}

exports.CupGame = CupGame

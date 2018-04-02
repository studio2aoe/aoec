
/* Alias */
const WAVE_SIZE = require('./const').WAVE_SIZE

/* Private Property Symbols */
const __list = Symbol('list')
const __current = Symbol('current')

class WaveformSequencer {
  constructor (data) {
    this[__list] = data.list
    this[__current] = 0
  }
  init () {
    this[__current] = 0
  }
  read () {
    return this.list[this[__current]]
  }
  next () {
    const hasNext = this[__current] < WAVE_SIZE - 1
    return hasNext ? (this[__current] += 1) : (this[__current] = 0)
  }
}

module.exports = WaveformSequencer

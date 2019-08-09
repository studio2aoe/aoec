/* Alias */
const WAVE_SIZE = require('./const').WAVE_SIZE

/* Private Property Symbols */
const __function = Symbol('function')
const __current = Symbol('current')

class OscillatorSequencer {
  constructor (data) {
    this[__function] = data.func
    this[__current] = 0
  }

  init () {
    this[__current] = 0
  }

  read () {
    return this[__function](this[__current])
  }

  next () {
    const hasNext = this[__current] < WAVE_SIZE - 1
    return hasNext ? (this[__current] += 1) : (this[__current] = 0)
  }
}

module.exports = OscillatorSequencer

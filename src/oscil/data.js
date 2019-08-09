/* Require */
const check = require('check-types').assert
const FUNC = require('./functions')

/* Alias */
const EMPTY = {
  name: '',
  func: FUNC.pulse(4)
}

const __func = Symbol('func')
const __name = Symbol('name')

class OscillatorData {
  constructor (init = {}) {
    this[__func] = () => 0
    this.name = (init.name === undefined) ? EMPTY.name : init.name
    this.func = (init.func === undefined) ? EMPTY.func : init.func
  }

  set name (name) { this[__name] = check.string(name).slice(0, 32) }

  get name () { return this[__name] }

  set func (func) {
    this[__func] = check.function(func)
  }

  get func () { return this[__func] }
}

module.exports = OscillatorData

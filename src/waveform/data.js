/* Require */
const check = require('check-types').assert
const misc = require('../misc')

/* Alias */
const WAVE_SIZE = require('./const').WAVE_SIZE
const EMPTY = {
  name: '',
  list: new Array(WAVE_SIZE).fill(0)
}
const checkHex = misc.checkHex

/* Private Properties Symbol */
const __list = Symbol('list')
const __name = Symbol('name')

class WaveformData {
  constructor (init = {}) {
    this[__list] = EMPTY.list
    this.name = (init.name === undefined) ? EMPTY.name : init.name
    this.list = (init.list === undefined) ? EMPTY.list : init.list
  }
  set name (name) { this[__name] = check.string(name).slice(0, 32) }
  get name () { return this[__name] }
  set list (list) {
    this[__list] = this[__list].map((e, id) => checkHex(list[id]))
  }
  get list () { return this[__list] }
}

module.exports = WaveformData

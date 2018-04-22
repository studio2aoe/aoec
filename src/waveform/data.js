/* Require */
const check = require('check-types').assert
const misc = require('../misc')

/* Alias */
const checkHex = misc.checkHex
const WAVE_SIZE = require('./const').WAVE_SIZE
const EMPTY = {
  name: '',
  list: new Array(WAVE_SIZE).fill(0)
}

class WaveformData {
  constructor (init = {}) {
    this.name = (init.name === undefined) ? EMPTY.name : init.name
    this.list = (init.list === undefined) ? EMPTY.list : init.list
  }
  set name (name) { this.__name = check.string(name).slice(0, 32) }
  get name () { return this.__name }
  set list (list) {
    check.equal(list.length, WAVE_SIZE)
    list.forEach(elem => checkHex(elem))
    this.__list = list
  }
  get list () { return this.__list }
}

module.exports = WaveformData

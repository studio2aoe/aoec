/* Require */
const check = require('check-types').assert
const misc = require('../misc')
const HexBuffer = require('../hexbuffer')

/* Alias */
const checkHex = misc.checkHex
const MEMORY_LIMIT = require('./const').MEMORY_LIMIT
const checkSize = (num) => misc.checkRangedInt(num, 0, MEMORY_LIMIT)
const EMPTY = {
  name: '',
  list: []
}

class SampleData {
  constructor (init = {}) {
    this.__list = new HexBuffer()
    this.name = (init.name === undefined) ? EMPTY.name : init.name
    this.list = (init.list === undefined) ? EMPTY.list : init.list
  }
  set name (name) { this.__name = check.string(name).slice(0, 32) }
  get name () { return this.__name }
  set list (list) {
    this.__list = new HexBuffer(checkSize(list.length))
    list.forEach(elem => checkHex(elem))
    this.__list.write(list)
  }
  get list () { return this.__list.read() }
  get length () { return this.__list.length }
}

module.exports = SampleData

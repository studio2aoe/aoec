/* Require */
const check = require('check-types').assert
const misc = require('../misc')

/* Alias */
const EMPTY_DATA = {
  name: '',
  list: [],
  loopstart: -1,
  loopend: -1
}
const checkByte = misc.checkUByte
const checkID = misc.checkArrayID

/* Private Property Symbols */
const __name = Symbol('name')
const __list = Symbol('list')
const __loopstart = Symbol('loopstart')
const __loopend = Symbol('loopend')

/* Public */
class AutomationData {
  constructor (init = EMPTY_DATA) {
    this[__name] = init.name
    this[__list] = init.list
    this[__loopstart] = init.loopstart
    this[__loopend] = init.loopend
  }
  set name (name) { this[__name] = check.string(name).slice(0, 32) }
  get name () { return this[__name] }
  set list (list) { this[__list] = list.map(elem => checkByte(elem)) }
  get list () { return this[__list] }
  set loopstart (id) { 
    try {
      this[__loopstart] = checkID(id, this[__list]) 
    } catch (error) {
      if (id === -1) this[__loopstart] = id
      else throw error
    }
  }
  get loopstart () { return this[__loopstart] }
  set loopend (id) {
    try {
      this[__loopend] = checkID(id, this[__list])
    } catch (error) {
      if (id === -1) this[__loopend] = id
      else throw error
    }
  }
  get loopend () { return this[__loopend] }
}

module.exports = AutomationData


/* Require */
const check = require('check-types').assert
const misc = require('../misc')

/* Alias */
const checkHex = misc.checkHex
const checkUByte = misc.checkUByte
const checkOrUndef = (value, checkFunction) => {
  try {
    return checkFunction(value)
  } catch (err) {
    return undefined
  }
}

class InstrumentData {
  constructor (init = {}) {
    this.name = (init.name === undefined) ? '' : init.name
    this.inv = init.inv
    this.tuneType = init.tuneType
    this.bank = init.bank
    this.seqA = init.seqA
    this.seqD = init.seqD
    this.seqE = init.seqE
    this.seqW = init.seqW
  }
  set name (name) { this.__name = check.string(name).slice(0, 32) }
  set inv (inv) { this.__inv = checkOrUndef(inv, check.boolean) }
  set tuneType (tuneType) { this.__tuneType = checkOrUndef(tuneType, checkHex) }
  set bank (bank) { this.__bank = checkOrUndef(bank, checkHex) }
  set seqA (seqA) { this.__seqA = checkOrUndef(seqA, checkUByte) }
  set seqD (seqD) { this.__seqD = checkOrUndef(seqD, checkUByte) }
  set seqE (seqE) { this.__seqE = checkOrUndef(seqE, checkUByte) }
  set seqW (seqW) { this.__seqW = checkOrUndef(seqW, checkUByte) }

  get name () { return this.__name }
  get inv () { return this.__inv }
  get tuneType () { return this.__tuneType }
  get bank () { return this.__bank }
  get seqA () { return this.__seqA }
  get seqD () { return this.__seqD }
  get seqE () { return this.__seqE }
  get seqW () { return this.__seqW }
}

module.exports = InstrumentData

/* Require */
const Data = require('./data')
const misc = require('../misc')

/* Alias */
const MEM_SIZE = require('./const').MEM_SIZE
const checkID = (id) => misc.checkRangedInt(id, 0, MEM_SIZE - 1)

let MEMORY = {}

const init = () => { MEMORY = new Array(0) }

/**
 * Write waveform data
 * @param {Number} idx Index of waveform memory
 * @param {Array} input Waveform data array (32-digits hexadecimal)
 */
const write = (id, input) => {
  MEMORY[checkID(id)] = new Data(input)
}

/**
 * Read waveform data
 * @param {Number} idx Index of waveform memory
 * @returns {String} 32-digits hexadecimal
 */
const read = id => {
  checkID(id)
  if (MEMORY[id] === undefined) MEMORY[id] = new Data()
  return MEMORY[id]
}

module.exports = {
  init: init,
  write: write,
  read: read
}

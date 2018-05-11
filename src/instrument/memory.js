/* Require */
const Data = require('./data')
const misc = require('../misc')

/* Alias */
const checkID = (id) => misc.checkRangedInt(id, 0x00, 0xFF)

/* Struct */
let MEMORY = []

/* Functions */

const init = () => { MEMORY = new Array(0) }

const write = (id, input) => {
  MEMORY[checkID(id)] = new Data(input)
}

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

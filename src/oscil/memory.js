/* Require */
const Data = require('./data')
const FUNC = require('./functions')
const misc = require('../misc')

/* Alias */
const MEM_SIZE = require('./const').MEM_SIZE
const checkID = (id) => misc.checkRangedInt(id, 0, MEM_SIZE - 1)

let MEMORY = {}

const init = () => {
  MEMORY = new Array(0x40)

  /* Set default functions */
  for (let i = 0x00; i < 0x20; i++) {
    MEMORY[i] = FUNC.pulse(i)
  }
  for (let i = 0x20; i < 0x2F; i++) {
    MEMORY[i] = FUNC.triangle
  }
  for (let i = 0x30; i < 0x3F; i++) {
    MEMORY[i] = FUNC.sawtooth
  }
}

const write = (id, func) => {
  MEMORY[checkID(id)] = new Data(func)
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

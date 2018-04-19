/* Require */
const Data = require('./data')
const misc = require('../misc')

/* Alias */
const INDEX_SIZE = require('./const').INDEX_SIZE
const MEMORY_LIMIT = require('./const').MEMORY_LIMIT
const checkID = (id) => misc.checkRangedInt(id, 0, INDEX_SIZE - 1)

let MEMORY = {}

const calcTotal = (inputIndex, inputData) => {
  let total = 0
  MEMORY.forEach((elem, i) => {
    total += (elem === undefined || i === inputIndex) ? 0 : elem.length
  })
  total += inputData.length
  return total
}

/* Public */

const init = () => { MEMORY = new Array(0) }

/**
 * Write sample data
 * @param {Number} idx Index of sample memory
 * @param {Object} Sample input data. {name: String, list: Array}
 */
const write = (id, input) => {
  const inputData = new Data(input)
  const total = calcTotal(id, inputData)
  if (total > MEMORY_LIMIT) throw TypeError('Memory is full')
  MEMORY[checkID(id)] = inputData
}

/**
 * Read sample data
 * @param {Number} idx Index of sample memory
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

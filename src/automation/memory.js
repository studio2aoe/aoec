/* Require */
const check = require('check-types').assert
const Data = require('./data')
const misc = require('../misc')

/* Alias */
const TABLE_TYPE_REGEX = '[ADEWw]'

const checkID = (id) => misc.checkRangedInt(id, 0, 255)
const checkType = (type) =>
  check.match(check.hasLength(type, 1), TABLE_TYPE_REGEX)

const MEMORY = {}

const init = () => {
  MEMORY.A = new Array(0)
  MEMORY.D = new Array(0)
  MEMORY.E = new Array(0)
  MEMORY.W = new Array(0)
  MEMORY.w = new Array(0)
}

const read = (type, id) => {
  checkType(type)
  checkID(id)
  if (MEMORY[type][id] === undefined) MEMORY[type][id] = new Data()
  return MEMORY[type][id]
}

const write = (type, id, input) => {
  const inputData = new Data(input)
  checkType(type)
  checkID(id)
  check.like(inputData, new Data())
  MEMORY[type][id] = inputData
}

module.exports = {
  init: init,
  read: read,
  write: write
}

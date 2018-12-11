/* Require */
const check = require('check-types').assert
const HexGenerator = require('../hexgenerator')

const Track = require('./track')
const misc = require('../misc')

/* Alias */
const MAX_CHANNEL_NUM = 256
const checkID = (id) => misc.checkArrayID(id, LIST)

/* Structure */
let LIST = []
let STRING = null

/* Public */

const init = (initString = 'OOWN') => {
  initString = check.string(initString).slice(0, MAX_CHANNEL_NUM)
  HexGenerator.init(initString)
  STRING = HexGenerator.getString()
  LIST = Array.from(STRING).map((elem, id) => new Track(id))
}

const getList = () => LIST
const getString = () => STRING
const getTrack = (id) => LIST[checkID(id)]
const getType = (id) => STRING[checkID(id)]

module.exports = {
  init: init,
  getList: getList,
  getString: getString,
  getType: getType,
  getTrack: getTrack
}

/* Require */
const check = require('check-types').assert
const WaveGenerator = require('../wavegenerator')

const Instrument = require('./inst')
const misc = require('../misc')

/* Alias */
const MAX_CHANNEL_NUM = 256
const checkID = (id) => misc.checkArrayID(id, LIST)

/* Structure */
let LIST = []
let STRING = null

/* Public */

const init = (initString = 'OOCN') => {
  initString = check.string(initString).slice(0, MAX_CHANNEL_NUM)
  WaveGenerator.init(initString)
  STRING = WaveGenerator.getString()
  LIST = Array.from(STRING).map((elem, id) => new Instrument(id))
}

const getList = () => LIST
const getString = () => STRING
const getInst = (id) => LIST[checkID(id)]
const getType = (id) => STRING[checkID(id)]

module.exports = {
  init: init,
  getList: getList,
  getString: getString,
  getType: getType,
  getInst: getInst
}

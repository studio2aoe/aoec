/* Require */
const OscGenerator = require('./oscil')
const NoiseGenerator = require('./noise')
const CustomGenerator = require('./custom')
const Mixer = require('../mixer')
const misc = require('../misc')

/* Structure */
let TABLE = []
let STRING = ''

/* Private */

const create = (chr = '') => {
  switch (chr) {
    case 'O':
      return new OscGenerator()
    case 'C':
      return new CustomGenerator()
    case 'N':
      return new NoiseGenerator()
    case 'S':
      // return new Sampler()
  }
}

/* Public */

const init = (initString = 'OOCN') => {
  TABLE = initString.split('').map(elem => create(elem))
  STRING = TABLE.map(elem => elem.generatorType).join('')
  Mixer.init(TABLE.length)
}
const getList = () => TABLE
const getString = () => STRING
const getGenerator = (id) => TABLE[misc.checkArrayID(id, TABLE)]
const getType = (id) => STRING[misc.checkArrayID(id, STRING)]

const voltage = (phase) => {
  let voltageL = 0
  let voltageR = 0
  TABLE.map((elem, idx) => {
    let gain = Mixer.getGain(idx)
    let signal = elem.getHexSignal(phase)
    elem.processorClock(phase)
    voltageL += (signal[0] - 7.5) / 7.5 * gain
    voltageR += (signal[1] - 7.5) / 7.5 * gain
  })
  return [voltageL, voltageR]
}

module.exports = {
  init: init,
  getList: getList,
  getString: getString,
  getGenerator: getGenerator,
  getType: getType,
  voltage: voltage
}

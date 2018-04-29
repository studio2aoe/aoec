/* Require */
const OscilGenerator = require('./oscil')
const NoiseGenerator = require('./noise')
const WaveGenerator = require('./wave')
const amplitude = require('../amplitude')
const Mixer = require('../mixer')
const misc = require('../misc')

/* Structure */
let LIST = []
let STRING = ''

/* Private */

const create = (chr = '') => {
  switch (chr) {
    case 'O':
      return new OscilGenerator()
    case 'W':
      return new WaveGenerator()
    case 'N':
      return new NoiseGenerator()
    case 'S':
      // return new Sampler()
  }
}

/* Public */

const init = (initString = 'OOWN') => {
  LIST = initString.split('').map(elem => create(elem))
  STRING = LIST.map(elem => elem.generatorType).join('')
  Mixer.init(LIST.length)
}

const getString = () => STRING
const getGenerator = (id) => LIST[misc.checkArrayID(id, LIST)]
const getType = (id) => STRING[misc.checkArrayID(id, STRING)]

const voltage = (phase) => {
  let totalSignalL = 0
  let totalSignalR = 0
  LIST.map((elem, idx) => {
    let signal = elem.getHexSignal(phase)
    let mixerVol = Mixer.getGain(idx)
    let vol = elem.getVol()
    totalSignalL += (amplitude(signal, vol[0]) - 7.5) / 7.5 * mixerVol
    totalSignalR += (amplitude(signal, vol[1]) - 7.5) / 7.5 * mixerVol
    elem.processorClock(phase)
  })
  return [totalSignalL, totalSignalR]
}

module.exports = {
  init: init,
  getString: getString,
  getGenerator: getGenerator,
  getType: getType,
  voltage: voltage
}

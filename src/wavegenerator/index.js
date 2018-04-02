const OscGenerator = require('./oscil')
const NoiseGenerator = require('./noise')
const CustomGenerator = require('./custom')
const Mixer = require('../mixer')

let GENERATOR_SET = []
let GENERATOR_STRING = ''

/**
 * Initialize generator set.
 * @param {String} initString String of generator types. each character is type of generator. ('O': Oscillated, 'C': Custom, 'N': Noise, 'S': Sampler (not supported yet)
 */
const init = (initString = 'OOCN') => {
  GENERATOR_SET = initString.split('').map(elem => createGenerator(elem))
  GENERATOR_STRING = GENERATOR_SET.map(elem => elem.generatorType).join('')
  Mixer.init(GENERATOR_SET.length)
}

/**
 * Add generator at generator set.
 * @param {String} chr Type of generator. ('O': Oscillated, 'C': Custom, 'N': Noise, 'S': Sampler (not supported yet))
 */
const createGenerator = (chr = '') => {
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

/**
 * Send command to generator
 * @param {Number} idx Generator ID
 * @param {Number} freq Frequency
 * @param {Number} num Waveform number
 * @param {Boolean} inv Is waveform inverted?
 * @param {Number} volL Left volume (1-digit hex)
 * @param {Number} volR Right volume (1-digit hex)
 */
const send = (idx, freq, num, inv, volL, volR) => {
  sendFreq(idx, freq)
  sendNum(idx, num)
  sendInv(idx, inv)
  sendVolL(idx, volL)
  sendVolR(idx, volR)
}
/**
 * Send frequency to generator
 * @param {Number} idx Generator ID
 * @param {Number} freq Frequency
 */
const sendFreq = (idx, freq) => { GENERATOR_SET[idx].setFreq(freq) }

/**
 * Send waveform number to generator
 * @param {Number} idx Generator ID
 * @param {Number} num Waveform number
 */
const sendNum = (idx, num) => { GENERATOR_SET[idx].setWaveform(num) }

/**
 * Send waveform inverse command to generator
 * @param {Number} idx Generator ID
 * @param {Boolean} inv Is waveform inverted?
 */
const sendInv = (idx, inv) => { GENERATOR_SET[idx].setInv(inv) }

/**
 * Send left volume to generator
 * @param {Number} idx Generator ID
 * @param {Number} volL Left volume (1-digit hex)
 */
const sendVolL = (idx, vol) => { GENERATOR_SET[idx].setVolL(vol) }

/**
 * Send right volume to generator
 * @param {Number} idx Generator ID
 * @param {Number} volR Right volume (1-digit hex)
 */
const sendVolR = (idx, vol) => { GENERATOR_SET[idx].setVolR(vol) }

/**
 * Send mute command to generator
 * @param {Number} idx Generator ID
 * @param {Boolean} mute Is generator muted?
 */
const sendMute = (idx, mute) => { GENERATOR_SET[idx].setMute(mute) }

/**
 * Get frequency of generator
 * @param {Number} idx Generator ID
 * @return {Number} Frequency (Hz unit)
 */
const getFreq = (idx) => GENERATOR_SET[idx].freq

/**
 * Get waveform number of generator
 * @param {Number} idx Generator ID
 * @return {Number} Waveform ID
 */
const getNum = (idx) => GENERATOR_SET[idx].waveNum

/**
 * Is generator inversed?
 * @param {Number} idx Generator ID
 * @return {Boolean} Is generator inversed?
 */
const getInv = (idx) => GENERATOR_SET[idx].isInv

/**
 * Get left volume of generator
 * @param {Number} idx Generator ID
 * @return {Number} Volume value (hex digit)
 */
const getVolL = (idx) => GENERATOR_SET[idx].volL

/**
 * Get right volume of generator
 * @param {Number} idx Generator ID
 * @return {Number} Volume value (hex digit)
 */
const getVolR = (idx) => GENERATOR_SET[idx].volR

/**
 * is generator muted?
 * @param {Number} idx Generator ID
 * @return {Boolean} Is generator muted?
 */
const getMute = (idx) => GENERATOR_SET[idx].isMute

const getString = () => GENERATOR_STRING

/**
 * Get analog value of mixed waveform.
 * @param {Number} phase phase time of processor (1/44100sec unit)
 */
const getVoltage = (phase) => {
  let voltageL = 0
  let voltageR = 0
  GENERATOR_SET.map((elem, idx) => {
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
  send: send,
  sendFreq: sendFreq,
  sendNum: sendNum,
  sendInv: sendInv,
  sendVolL: sendVolL,
  sendVolR: sendVolR,
  sendMute: sendMute,
  getFreq: getFreq,
  getNum: getNum,
  getInv: getInv,
  getVolL: getVolL,
  getVolR: getVolR,
  getMute: getMute,
  getString: getString,
  getVoltage: getVoltage
}

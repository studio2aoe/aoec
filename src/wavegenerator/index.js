const BuiltInGenerator = require('./builtin')
const NoiseGenerator = require('./noise')
const CustomGenerator = require('./custom')
const Mixer = require('../mixer')

let generatorset = []

/**
 * Initialize generator set.
 * @param {String} initString String of generator types. each character is type of generator. ('B': BuiltIn, 'C': Custom, 'N': Noise, 'S': Sampler (not supported yet))
 */
const init = (initString = 'BBCN') => {
  generatorset = []
  initString.split('').forEach(elem => add(elem))
  Mixer.init(generatorset.length)
}

/**
 * Add generator at generator set.
 * @param {String} chr Type of generator. ('B': BuiltIn, 'C': Custom, 'N': Noise, 'S': Sampler (not supported yet))
 */
const add = (chr = '') => {
  switch (chr) {
    case 'B':
      generatorset.push(new BuiltInGenerator())
      break
    case 'C':
      generatorset.push(new CustomGenerator())
      break
    case 'N':
      generatorset.push(new NoiseGenerator())
      break
    case 'S':
      // generatorSet.push(new Sampler())
      break
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
  generatorset[idx].setFreq(freq)
  generatorset[idx].setWaveform(num)
  generatorset[idx].setInv(inv)
  generatorset[idx].setVol(volL, volR)
}

/**
 * Get frequency of generator
 * @param {Number} idx Generator ID
 * @return {Number} Frequency (Hz unit)
 */
const getFreq = (idx) => generatorset[idx].freq

/**
 * Get waveform number of generator
 * @param {Number} idx Generator ID
 * @return {Number} Waveform ID
 */
const getNum = (idx) => generatorset[idx].waveNum

/**
 * Is generator inversed?
 * @param {Number} idx Generator ID
 * @return {Boolean} Is generator inversed?
 */
const getInv = (idx) => generatorset[idx].isInv

/**
 * Get left volume of generator
 * @param {Number} idx Generator ID
 * @return {Number} Volume value (hex digit)
 */
const getVolL = (idx) => generatorset[idx].volL

/**
 * Get right volume of generator
 * @param {Number} idx Generator ID
 * @return {Number} Volume value (hex digit)
 */
const getVolR = (idx) => generatorset[idx].volR

/**
 * is generator muted?
 * @param {Number} idx Generator ID
 * @return {Boolean} Is generator muted?
 */
const getMute = (idx) => generatorset[idx].isMute

/**
 * Get analog value of mixed waveform.
 * @param {Number} phase phase time of processor (1/44100sec unit)
 */
const getVoltage = (phase) => {
  let voltageL = 0
  let voltageR = 0
  generatorset.forEach((elem, idx) => {
    let gain = Mixer.getGain(idx)
    voltageL += ((elem.getHexSignal(phase)[0]) - 7.5) / 7.5 * gain
    voltageR += ((elem.getHexSignal(phase)[1]) - 7.5) / 7.5 * gain
  })
  return [voltageL, voltageR]
}

module.exports = {
  init: init,
  send: send,
  getFreq: getFreq,
  getNum: getNum,
  getInv: getInv,
  getVolL: getVolL,
  getVolR: getVolR,
  getMute: getMute,
  getVoltage: getVoltage
}

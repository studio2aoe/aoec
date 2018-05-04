const equal12 = require('./equal12')
const noisegb = require('./noisegb')

const TUNE_FUNC = new Array(16)

TUNE_FUNC[0] = equal12
TUNE_FUNC[1] = noisegb

/**
 * Get frequency of musical note.
 * @param {*} idx Index of tunings.
 * @param {*} note Musical note. (eg. 'A 4', 'C#5', 'Gb2')
 * @param {*} semi Transpose note by semitone unit.
 * @param {*} cent Detuning pitch by cent unit.
 */
const getFreq = (idx, note, semi = 0, cent = 0) => {
  return TUNE_FUNC[idx](note, semi, cent)
}

/**
 * Set Frequency function of other tunings. It is called when 'getFreq' is called. Defaultly, 12-equal temperament tuning is used.
 * @param {Number} idx Index of tunings.
 * @param {Function} func Frequency function called when 'getFreq' is called. function must returns finite positive number
 */
const setTune = (idx, func) => {
  TUNE_FUNC[idx] = func
}

module.exports = {
  getFreq: getFreq,
  setTune: setTune
}

let mixerGain = []

const DEFAULT_GAIN = 0.25
const DB_MAX = 20 * Math.log10(1 / DEFAULT_GAIN)

/**
 * Initialize mixer
 * @param {Number} mixerLength Channel number of mixer. it is determined by generator number.
 */
const init = mixerLength => {
  mixerGain = new Array(mixerLength).fill(DEFAULT_GAIN)
}

/**
 * Reset all gain value to defalut
 */
const reset = () => {
  mixerGain.fill(DEFAULT_GAIN)
}

/**
 * Get gain value
 * @param {Number} idx Channel ID
 * @returns {Number} Gain value
 */
const getGain = idx => { return mixerGain[idx] }

/**
 * Set gain value
 * @param {Number} idx Channel ID
 * @param {Number} gain Gain value
 */
const setGain = (idx, gain) => { mixerGain[idx] = gain }

/**
 * Set gain value by decibel unit.
 * @param {Number} idx Channel ID
 * @param {Number} gain Gain value (decibel unit. 0.0dB is mapped to 0.25)
 */
const setDecibel = (idx, dB) => {
  if (dB > DB_MAX) dB = DB_MAX
  mixerGain[idx] = Math.pow(10, (dB / 20)) * DEFAULT_GAIN
}

/**
 * Get gain value by decibel unit.
 * @param {Number} idx Channel ID
 * @returns Gain value (decibel unit. 0.0db is mapped to 0.25)
 */
const getDecibel = (idx) => 20 * Math.log10(mixerGain[idx] / DEFAULT_GAIN)

module.exports = {
  init: init,
  reset: reset,
  getGain: getGain,
  setGain: setGain,
  setDecibel: setDecibel,
  getDecibel: getDecibel
}

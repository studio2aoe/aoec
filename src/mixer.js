let mixerGain = []

const DEFAULT_GAIN = 0.25
const DB_MAX = 12.0

const init = mixerLength => {
  mixerGain = new Array(mixerLength).fill(DEFAULT_GAIN)
}

const reset = () => {
  mixerGain.fill(DEFAULT_GAIN)
}

const getGain = idx => { return mixerGain[idx] }
const setGain = (idx, gain) => { mixerGain[idx] = gain }
const setDecibel = (idx, dB) => {
  if (dB > DB_MAX) dB = DB_MAX
  if (dB < -DB_MAX) dB = -DB_MAX
  mixerGain[idx] = Math.pow(10, (dB / 20)) * DEFAULT_GAIN
}

module.exports = {
  init: init,
  reset: reset,
  getGain: getGain,
  setGain: setGain,
  setDecibel: setDecibel
}

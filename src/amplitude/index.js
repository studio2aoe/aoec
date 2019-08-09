const TABLE_SIZE = 16
const TABLE = new Array(TABLE_SIZE)

for (let signal = 0; signal < TABLE_SIZE; signal++) {
  TABLE[signal] = new Array(TABLE_SIZE)
  for (let amp = 0; amp < TABLE_SIZE; amp++) {
    const value = signal * amp / 15
    const fixBias = (15 - amp) / 2
    TABLE[signal][amp] = value + fixBias
  }
}

/**
 * Apply amplitude to waveform signal
 * @param {Number} signal Waveform signal (Hexadecimal)
 * @param {Number} amp Amplitude (Hexadecimal)
 * @return {Number} Waveform signal applied amplitude (Hexadecimal)
 */
module.exports = (signal, amp) => {
  try {
    return TABLE[signal][amp]
  } catch (err) {
    err.message = `Invalid Input: [Signal: ${signal} / Amp: ${amp}]`
    throw err
  }
}

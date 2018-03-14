const WaveformData = require('./data')

const MEM_SIZE = 0x1000
const MEMORY = new Array(MEM_SIZE)
for (let i = 0; i < MEM_SIZE; i++) {
  MEMORY[i] = new WaveformData()
}

/**
 * Write waveform data
 * @param {Number} idx Index of waveform memory
 * @param {String} input Waveform data string (32-digits hexadecimal)
 */
function write (idx, input) {
  try {
    MEMORY[idx].write(input)
  } catch (err) {
    if (err.name === `WaveformLocked`) {
      err.message = `Waveform ID ${idx} is locked. waveform change failed.`
    }
  }
}

/**
 * Read waveform data
 * @param {Number} idx Index of waveform memory
 * @returns {String} 32-digits hexadecimal
 */
function read (idx) { return MEMORY[idx].read() }

/**
 * Lock / unlock waveform data. if waveform data is locked, this data can't be written.
 * @param {Number} idx Index of waveform memory
 * @param {Boolean} isLock waveform data is locked?
 */
function setLock (idx, isLock) {
  if (isLock === true || isLock === false) {
    MEMORY[idx].setLock(isLock)
  }
}

/**
 * Check if waveform data is locked. if waveform data is locked, this data can't be written.
 * @param {Number} idx Index of waveform memory
 * @returns {Boolean} waveform data is locked?
 */
function isLock (idx) { return MEMORY[idx].isLock() }

module.exports = { write: write, read: read, setLock: setLock, isLock: isLock }

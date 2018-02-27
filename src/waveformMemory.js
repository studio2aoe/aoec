const WaveformData = require('./waveformData')

const MEM_SIZE = 1024
const MEMORY = new Array(MEM_SIZE)
for (let i = 0; i < MEM_SIZE; i++) {
  MEMORY[i] = new WaveformData()
}

function write (idx, input) {
  try {
    MEMORY[idx].write(input)
  } catch (err) {
    if (err.name === `WaveformLocked`) {
      err.message = `Waveform ID ${idx} is locked. waveform change failed.`
    }
  }
}

function read (idx) { return MEMORY[idx].read() }

function setLock (idx, isLock) {
  if (isLock === true || isLock === false) {
    MEMORY[idx].setLock(isLock)
  }
}

function isLock (idx) { return MEMORY[idx].isLock() }

module.exports = { write: write, read: read, setLock: setLock, isLock: isLock }

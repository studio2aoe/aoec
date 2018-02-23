const WaveformData = require('./waveformdata')

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

function lock (idx) { MEMORY[idx].lock() }

function unlock (idx) { MEMORY[idx].unlock() }

module.exports = { write: write, read: read, lock: lock, unlock: unlock }

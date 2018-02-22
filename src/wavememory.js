let waveMemoryInstance = null
const MEM_SIZE = 1024
const WAVE_SIZE = 32

const MEMORY = new Array(MEM_SIZE)

class Waveform {
  constructor (str) {
    this.__value = new Int8Array(WAVE_SIZE)
    this.write(str)
    this.unlock()
  }
  write (input = '') {
    if (this.__isLock) {
      const err = new Error()
      err.name = `WaveformLocked`
      err.message = `This waveform is locked`
      throw err
    } else {
      this.__value = this.__value.map((elem, idx) => {
        const parsed = parseInt(input[idx], 16)
        const isHex = (Number.isInteger(parsed) && parsed >= 0 && parsed <= 16)
        return isHex ? parsed : 0
      })
    }
  }
  read () { return this.__value }
  lock () { this.__isLock = true }
  unlock () { this.__isLock = false }
}

class WaveMemory {
  constructor () {
    if (waveMemoryInstance === null) waveMemoryInstance = this
    for (let i = 0; i < MEM_SIZE; i++) {
      MEMORY[i] = new Waveform()
    }
    return waveMemoryInstance
  }
  write (idx, input) {
    try {
      MEMORY[idx].write(input)
    } catch (err) {
      if (err.name === `WaveformLocked`) {
        err.message = `Waveform ID ${idx} is locked. waveform change failed.`
      }
    }
  }
  read (idx) { return MEMORY[idx].read() }
  lock (idx) { MEMORY[idx].lock() }
  unlock (idx) { MEMORY[idx].unlock() }
}

module.exports = WaveMemory

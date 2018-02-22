let waveManagerInstance = null
const MEM_SIZE = 1024
const WAVE_SIZE = 32

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
    if (waveManagerInstance === null) waveManagerInstance = this
    this.__memory = new Array(MEM_SIZE)
    for (let i = 0; i < MEM_SIZE; i++) {
      this.__memory[i] = new Waveform()
    }
    return waveManagerInstance
  }
  write (idx, input) {
    try {
      this.__memory[idx].write(input)
    } catch (err) {
      if (err.name === `WaveformLocked`) {
        err.message = `Waveform ID ${idx} is locked. waveform change failed.`
      }
    }
  }
  read (idx) { return this.__memory[idx].read() }
  lock (idx) { this.__memory[idx].lock() }
  unlock (idx) { this.__memory[idx].unlock() }
}

export default WaveMemory

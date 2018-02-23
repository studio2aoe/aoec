const WAVE_SIZE = 32
class WaveformData {
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

module.exports = WaveformData

const WAVE_SIZE = 32

/**
 * Waveform data for custom-waveform generator.
 */
class WaveformData {
  constructor (str) {
    this.__value = new Int8Array(WAVE_SIZE)
    this.write(str)
    this.setLock(false)
  }

  /**
   * Write waveform data
   * @param {String} input Waveform data string (32-digits hexadecimal)
   */
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

  /**
   * Read waveform data
   * @returns {String} 32-digits hexadecimal
   */
  read () { return this.__value }

  /**
   * Lock / unlock writting waveform data. if waveform data is locked, this data can't be written.
   * @param {Boolean} isLock waveform data is locked?
   */
  setLock (isLock) {
    if (isLock === true || isLock === false) {
      this.__isLock = isLock
    }
  }

  /**
   * Check if waveform data is locked. if waveform data is locked, this data can't be written.
   * @returns {Boolean} waveform data is locked?
   */
  isLock () { return this.__isLock }
}

module.exports = WaveformData

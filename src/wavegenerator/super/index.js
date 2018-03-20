const amplitude = require('../../amplitude')

const SAMPLE_RATE = 44100

class WaveGenerator {
  constructor () {
    this.freq = 0
    this.waveNum = 0
    this.isInv = 0
    this.volL = 0
    this.volR = 0
    this.isMute = false
    this.generatorCount = 0
  }

  /**
   * Set frequency of generator.
   * @param {Number} freq Frequency (1 to 22050, 0: off generator)
   */
  setFreq (freq) {
    if (Number.isFinite(freq) && freq >= 0) {
      if (freq > 22050) freq = 22050
      this.freq = freq
      this.setPeriod(freq * 32)
    }
  }

  setPeriod (freq) {
    const freqRatio = freq / SAMPLE_RATE
    const integerPart = Math.floor(freqRatio)
    const fractionalPart = freqRatio - integerPart
    this.repeat = integerPart
    this.period = Math.pow(fractionalPart, -1)
  }

  processorClock (samplingCount) {
    const divisible = samplingCount % this.period < 1
    const repeat = divisible ? this.repeat + 1 : this.repeat
    for (let i = 0; i < repeat; i++) {
      this.generatorClock()
    }
  }

  generatorClock () {
    this.generatorCount++
    if (this.generatorCount % 32 === 0) this.generatorCount = 0
  }

  /**
   * Set waveform number
   * @param {Number} num Number of waveform
   */
  setWaveform (num) {
    if (Number.isInteger(num) && num >= 0) {
      this.waveNum = num
    }
  }

  /**
   * Set phase-inverse of waveform
   * @param {boolean} inv Is waveform phase-inversed?
   */
  setInv (inv) {
    if (typeof inv === 'boolean') {
      this.isInv = inv
    }
  }

  /**
   * Set volume (amplitude) of generator. aoec uses 2 channels.
   * @param {Number} volL Left volume. 1-digit hexadecimal. (0 to 15)
   * @param {Number} volR Right volume. 1-digit hexadecimal. (0 to 15)
   */
  setVol (volL, volR) {
    const checkVolL = Number.isInteger(volL) && volL >= 0 && volL <= 15
    const checkVolR = Number.isInteger(volR) && volR >= 0 && volR <= 15
    const checkVol = checkVolL && checkVolR
    if (checkVol) {
      this.volL = volL
      this.volR = volR
    }
  }

  /**
   * Mute or unmute generator. this properties is not available for frame, but it is used for whole track mute/unmute function.
   * @param {Boolean} mute true: mute generator, false: unmute generator
   */
  setMute (mute) {
    if (typeof mute === 'boolean') {
      this.isMute = mute
    }
  }

  /**
   * Calculate hexadecimal audio signal of generator. need implemented on child class.
   * @return {Number} 1-digit hexadecimal
   */
  calcHexSignal () { return 0 }

  /**
   * Get hexadecimal audio signal of generator
   * @return {Number} 1-digit hexadecimal or 7.5 (no signal)
   */
  getHexSignal () {
    if (this.isMute === true || this.freq === 0) return [7.5, 7.5]

    let primarySignal = this.calcHexSignal()
    let mixedL =
      (this.volL === 0) ? 7.5 : amplitude(primarySignal, this.volL)
    let mixedR =
      (this.volL === 0) ? 7.5 : amplitude(primarySignal, this.volR)

    return [
      (this.isInv) ? 15 - mixedL : mixedL,
      (this.isInv) ? 15 - mixedR : mixedR
    ]
  }
}

module.exports = WaveGenerator

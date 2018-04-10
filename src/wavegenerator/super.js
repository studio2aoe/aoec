/* Require */
const check = require('check-types').assert
const misc = require('../misc')
const amplitude = require('../amplitude')

/* Alias */
const SAMPLE_RATE = 44100
const checkHex = misc.checkHex

class WaveGenerator {
  constructor () {
    this.freq = 0
    this.waveNum = 0
    this.isInv = 0
    this.volL = 0
    this.volR = 0
    this.isMute = false
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
      this.sequencer.next()
    }
  }

  /**
   * Set phase-inverse of waveform
   * @param {boolean} inv Is waveform phase-inversed?
   */
  setInv (inv) {
    this.isInv = check.boolean(inv)
  }

  /**
   * Set left volume (amplitude) of generator. aoec uses 2 channels.
   * @param {Number} volL Left volume. 1-digit hexadecimal. (0 to 15)
   */
  setVolL (volL) {
    this.volL = checkHex(volL)
  }

  /**
   * Set right volume (amplitude) of generator. aoec uses 2 channels.
   * @param {Number} volR Right volume. 1-digit hexadecimal. (0 to 15)
   */
  setVolR (volR) {
    this.volR = checkHex(volR)
  }

  /**
   * Mute or unmute generator. this properties is not available for frame, but it is used for whole track mute/unmute function.
   * @param {Boolean} mute true: mute generator, false: unmute generator
   */
  setMute (mute) {
    this.isMute = check.boolean(mute)
  }

  /**
   * Get hexadecimal audio signal of generator
   * @return {Number} 1-digit hexadecimal or 7.5 (no signal)
   */
  getHexSignal () {
    if (this.isMute === true || this.freq === 0) return [7.5, 7.5]

    let primarySignal = this.sequencer.read()
    let mixedL = amplitude(primarySignal, this.volL)
    let mixedR = amplitude(primarySignal, this.volR)
    return [
      (this.isInv) ? 15 - mixedL : mixedL,
      (this.isInv) ? 15 - mixedR : mixedR
    ]
  }
}

module.exports = WaveGenerator

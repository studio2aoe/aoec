const amplitude = require('./amplitude')

const SAMPLE_RATE = 44100

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
   * @desc Set frequency of generator.
   * @param {Number} freq Frequency (1 to 22050, 0: off generator)
   */
  setFreq (freq) {
    if (Number.isFinite(freq) && freq >= 0) {
      if (freq > 22050) freq = 22050
      this.freq = freq
      this.period = SAMPLE_RATE / freq
    }
  }

  /**
   * @desc Set waveform number
   * @param {Number} num Number of waveform
   */
  setWaveform (num) {
    if (Number.isInteger(num) && num >= 0) {
      this.waveNum = num
    }
  }

  /**
   * @desc Set phase-inverse of waveform
   * @param {boolean} inv Is waveform phase-inversed?
   */
  setInv (inv) {
    if (typeof inv === 'boolean') {
      this.isInv = inv
    }
  }

  /**
   * @desc Set volume (amplitude) of generator. aoec used 2 channels.
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
   * @desc Mute or unmute generator. this properties is not available for frame, but it is used for whole track mute/unmute function.
   * @param {Boolean} mute true: mute generator, false: unmute generator
   */
  setMute (mute) {
    if (typeof mute === 'boolean') {
      this.isMute = mute
    }
  }

  /**
   * @desc Calculate hexadecimal audio signal of generator. need implemented on child class.
   * @param {Number} phase Phase of sampler (0 to 44099)
   * @return {Number} 1-digit hexadecimal
   */
  calcHexSignal (phase) { return 0 }

  /**
   * Get phase angle from sampler phase and generator period
   * @param {Number} phase Phase of sampler (0 to 44099)
   * @return {Number} 0.0 to 1.0
   */
  getPhaseAngle (phase) { return (phase % this.period) / this.period }

  /**
   * @desc Get hexadecimal audio signal of generator
   * @param {Number} phase Phase of sampler (0 to 44099)
   * @return {Number} 1-digit hexadecimal or 7.5 (no signal)
   */
  getHexSignal (phase) {
    if (this.isMute === true || this.freq === 0) return [7.5, 7.5]

    let primarySignal = this.calcHexSignal(phase)
    let mixedL =
      (this.volL === 0) ? 7.5 : amplitude(primarySignal, this.volL)
    let mixedR =
      (this.volL === 0) ? 7.5 : amplitude(primarySignal, this.volR)

    return [
      (this.isInv) ? 15 - mixedL : mixedL,
      (this.isInv) ? 15 - mixedR : mixedR
    ]
  }

  /** @desc send properties to generator */
  send (freq, num, inv, volL, volR) {
    this.setFreq(freq)
    this.setWaveform(num)
    this.setInv(inv)
    this.setVol(volL, volR)
  }
}

module.exports = WaveGenerator

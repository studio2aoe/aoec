import AUDIO_CTX from './audioctx'

/** @ignore */
const SAMPLE_RATE = AUDIO_CTX.sampleRate

class WaveGenerator {
  /**
   * @desc Set type of waveform
   * @param {Number} type Type of waveform. it works different each generator type
   */
  setType (type) {
    /** @ignore */
    this.__type = type
  }

  /**
   * @desc Set phase-inverse of waveform
   * @param {boolean} inv true: phase-inversed waveform, false: normal waveform
   */
  setInv (inv) {
    /** @ignore */
    this.__isInv = inv
  }

  /**
   * @desc Set volume (amplitude) of generator.
   * @param {Number} vol 1-digit hexadecimal. (0 to 15)
   */
  setVol (vol) {
    /** @ignore */
    if (vol > 15) vol = 15
    if (vol < 0) vol = 0
    this.__vol = vol
  }

  /**
   * @desc Set frequency of generator.
   * @param {Number} freq Frequency (1 to 22050)
   */
  setFreq (freq) {
    if (freq > 22050) freq = 22050
    if (freq < 1) freq = 1
    /** @ignore */
    this.__freq = freq
    /** @ignore */
    this.__period = SAMPLE_RATE / freq
  }

  /**
   * Get phase angle from sampler phase and generator period
   * @param {Number} phase Phase of sampler (0 to 44099)
   * @return {Number} 0.0 to 1.0
   */
  getPhaseAngle (phase) {
    return (phase % this.__period) / this.__period
  }

  /**
   * @desc Get phase value (waveform data) of generator
   * @param {Number} phase Phase of sampler (0 to 44099)
   * @return {Number} 1-digit hexadecimal
   */
  getPhaseValue (phase) {
    return 0 // need implement on child class
  }
}

export default WaveGenerator

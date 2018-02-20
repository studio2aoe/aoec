import VOLUME_TABLE from './volumetable'
import AUDIO_CTX from './audioctx'

const SAMPLE_RATE = AUDIO_CTX.sampleRate

class WaveGenerator {
  /**
   * @desc Set type of waveform
   * @param {Number} type Type of waveform. it works different each generator type
   */
  setType (type) {
    this.__type = type
  }

  /**
   * @desc Set phase-inverse of waveform
   * @param {boolean} inv true: phase-inversed waveform, false: normal waveform
   */
  setInv (inv) {
    this.__isInv = inv
  }

  /**
   * @desc Set volume (amplitude) of generator.
   * @param {Number} volL Left volume. 1-digit hexadecimal. (0 to 15)
   * @param {Number} volR Right volume. 1-digit hexadecimal. (0 to 15)
   */
  setVol (volL, volR) {
    if (volL > 15) volL = 15
    if (volL < 0) volL = 0
    if (volR > 15) volR = 15
    if (volR < 0) volR = 0
    this.__volL = volL
    this.__volR = volR
  }

  /**
   * @desc Set frequency of generator.
   * @param {Number} freq Frequency (1 to 22050)
   */
  setFreq (freq) {
    if (freq > 22050) freq = 22050
    if (freq < 1) freq = 1
    this.__freq = freq
    this.__period = SAMPLE_RATE / freq
  }

  /**
   * @desc Calculate phase value (waveform data) of generator. Need implemented on child class.
   * @param {Number} phase Phase of sampler (0 to 44099)
   * @return {Number} 1-digit hexadecimal
   */
  calcPhaseValue (phase) {
    return 0
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
    if ((this.__volL === 0 && this.__volR === 0) || this.__type === 0) return [0, 0]
    let phaseValue = this.calcPhaseValue(phase)
    let MixedL = VOLUME_TABLE.mix(phaseValue, this.__volL)
    let MixedR = VOLUME_TABLE.mix(phaseValue, this.__volR)
    return [
      (this.__isInv) ? 15 - MixedL : MixedL,
      (this.__isInv) ? 15 - MixedR : MixedR
    ]
  }
}

export default WaveGenerator

import VOLUME_TABLE from './volumetable'
import WaveGenerator from './wavegenerator'

/**
 * @desc Built-in-waveform generator. it generates pulse, triangle, sawtooth wave.
 */
class BuiltInWaveform extends WaveGenerator {
  /**
   * @desc Constructor of class BuiltInWaveform
   */
  constructor () {
    super()
    this.setType(0)
    this.setVol(0xF)
    this.setFreq(440)
    this.setInv(0)
  }

  getPhaseValue (phase) {
    if (this.__vol === 0) return 0
    if (this.__type === 0) return 0
    let phaseAngle = this.getPhaseAngle(phase)
    let phaseValue
    switch (this.__type) {
      case 1: case 2: case 3: case 4:
        phaseValue =
          (phaseAngle > (this.__type / 8)) ? 0 : 15
        break
      case 5:
        phaseValue =
          (phaseAngle < 0.5) ? (phaseAngle * 32) : (-phaseAngle * 32) + 32
        break
      case 6:
        phaseValue =
          phaseAngle * 16
        break
      default:
        return 0
    }
    phaseValue = Math.floor(phaseValue)
    if (this.__isInv) phaseValue = 15 - phaseValue
    phaseValue = VOLUME_TABLE.mix(phaseValue, this.__vol)
    return phaseValue
  }
}

export default BuiltInWaveform

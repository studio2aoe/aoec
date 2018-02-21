import WaveGenerator from './wavegenerator'

class CustomWaveform extends WaveGenerator {
  constructor () {
    super()
    this.setType(0)
    this.setVol(0x0, 0x0)
    this.setFreq(440)
    this.setInv(0)
    this.__current = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
  }
  setType (type) {
    if (type > 255) this.__type = 256
    else if (type < 0) this.__type = 256
    else this.__type = type
  }
  calcPhaseValue (phase) {
    let phaseIndex = Math.floor(this.getPhaseAngle(phase) * 32)
    return this.__current[phaseIndex]
  }
}

export default CustomWaveform

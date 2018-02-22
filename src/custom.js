import WaveGenerator from './wavegenerator'
import WaveMemory from './wavememory'

const MEM_SIZE = 1024
const WAVE_SIZE = 32

class CustomWaveform extends WaveGenerator {
  constructor () {
    super()
    // TO DO: Hide WaveManager instance by assign global const
    this.__wave = new WaveMemory()
    this.setType(0)
    this.setVol(0x0, 0x0)
    this.setFreq(440)
    this.setInv(0)
  }
  setType (type) {
    if (type < MEM_SIZE) {
      this.__type = type
    }
  }
  calcPhaseValue (phase) {
    let phaseIndex = Math.floor(this.getPhaseAngle(phase) * WAVE_SIZE)
    return this.__wave.read(this.__type)[phaseIndex]
  }
}

export default CustomWaveform

const WaveGenerator = require('./wavegenerator')
const WaveMemory = require('./wavememory')
const WAVE_MEMORY = new WaveMemory()

const MEM_SIZE = 1024
const WAVE_SIZE = 32

class CustomWaveform extends WaveGenerator {
  constructor () {
    super()
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
    return WAVE_MEMORY.read(this.__type)[phaseIndex]
  }
}

module.exports = CustomWaveform

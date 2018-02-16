import VOLUME_TABLE from './volumetable'
import WaveGenerator from './wavegenerator'
import Lfsr from './lfsr'

class Noise extends WaveGenerator {
  constructor () {
    super()
    this.lfsr = new Lfsr()
    this.setType(1) // 0: off, 1: long, 2: short
    this.setVol(0xF)
    this.setFreq(1)
    this.setInv(0)
  }

  setType (type) {
    super.setType(type)
    if (type === 1) this.lfsr.setMode(false)
    else if (type === 2) this.lfsr.setMode(true)
  }

  getPhaseValue (phase) {
    if (this.__vol === 0) return 0
    if (this.__type === 0) return 0
    let phaseValue = this.lfsr.getHex()
    if (phase % this.__freq === 0) this.lfsr.clock()
    if (this.__isInv) phaseValue = 15 - phaseValue
    phaseValue = VOLUME_TABLE.mix(phaseValue, this.__vol)
    return phaseValue
  }
}

export default Noise
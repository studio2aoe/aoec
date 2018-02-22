import WaveGenerator from './wavegenerator'
import Lfsr from './lfsr'

const SAMPLE_RATE = 44100
const GCD = function (n, m) {
  n = Math.abs(n)
  m = Math.abs(m)
  if (m > n) { var temp = n; n = m; m = temp }
  while (true) {
    if (m === 0) return n
    n %= m
    if (n === 0) return m
    m %= n
  }
}

class NoiseWaveform extends WaveGenerator {
  constructor () {
    super()
    this.lfsr = new Lfsr()
    this.setType(0) // 0: long, 1: short
    this.setVol(0x0, 0x0)
    this.setFreq(44100)
    this.setInv(0)
  }

  setFreq (freq) {
    const gcd = GCD(freq, SAMPLE_RATE)
    this.freq = freq
    this.divisedFreq = freq / gcd
    this.divisedRate = SAMPLE_RATE / gcd
    this.quotient = Math.floor(this.divisedFreq / this.divisedRate)
    this.remainder = this.divisedFreq % this.divisedRate
  }

  clock (phase) {
    const divisible = (this.remainder * phase) % this.divisedRate < this.remainder
    const repeat = divisible ? this.quotient + 1 : this.quotient
    for (let i = 0; i < repeat; i++) {
      this.lfsr.clock()
    }
  }

  setType (type) {
    super.setType(type)
    if (type === 1) this.lfsr.setMode(true)
    else this.lfsr.setMode(false)
  }

  calcPhaseValue (phase) {
    let phaseValue = this.lfsr.getHex()
    this.clock(phase)
    return phaseValue
  }
}

export default NoiseWaveform

const WaveGenerator = require('./wavegenerator')
const Lfsr = require('./lfsr')

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
  }
  setFreq (freq) {
    if (Number.isFinite(freq) && freq > 0) {
      const gcd = GCD(freq, SAMPLE_RATE)
      this.freq = freq
      this.divisedFreq = freq / gcd
      this.divisedRate = SAMPLE_RATE / gcd
      this.quotient = Math.floor(this.divisedFreq / this.divisedRate)
      this.remainder = this.divisedFreq % this.divisedRate
    }
  }
  setWaveform (num) {
    if (num === 1) {
      this.lfsr.setMode(true)
      this.waveNum = num
    } else if (num === 0) {
      this.lfsr.setMode(false)
      this.waveNum = num
    }
  }
  clock (phase) {
    const divisible = (this.remainder * phase) % this.divisedRate < this.remainder
    const repeat = divisible ? this.quotient + 1 : this.quotient
    for (let i = 0; i < repeat; i++) {
      this.lfsr.clock()
    }
  }
  calcPhaseValue (phase) {
    let phaseValue = this.lfsr.getHex()
    this.clock(phase)
    return phaseValue
  }
}

module.exports = NoiseWaveform

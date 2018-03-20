const WaveGenerator = require('../super')
const Lfsr = require('./lfsr')

const SAMPLE_RATE = 44100

/**
 * @desc White-noise generator. 15-bit LFSR based.
 */
class NoiseGenerator extends WaveGenerator {
  constructor () {
    super()
    this.lfsr = new Lfsr()
  }
  setFreq (freq) {
    if (Number.isFinite(freq) && freq > 0) {
      this.freq = freq
      const freqRatio = freq / SAMPLE_RATE
      const integerPart = Math.floor(freqRatio)
      const fractionalPart = freqRatio - integerPart
      this.repeat = integerPart
      this.period = Math.pow(fractionalPart, -1)
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
    const divisible = phase % this.period < 1
    const repeat = divisible ? this.repeat + 1 : this.repeat
    for (let i = 0; i < repeat; i++) {
      this.lfsr.clock()
    }
  }
  calcHexSignal (phase) {
    let signal = this.lfsr.getHex()
    this.clock(phase)
    return signal
  }
}

module.exports = NoiseGenerator

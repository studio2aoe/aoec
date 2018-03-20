const WaveGenerator = require('../super')
const Lfsr = require('./lfsr')

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
      this.setPeriod(freq)
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
  generatorClock () { this.lfsr.clock() }
  calcHexSignal (phase) { return this.lfsr.getHex() }
}

module.exports = NoiseGenerator

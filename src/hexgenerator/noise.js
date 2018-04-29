const HexGenerator = require('./super')
const Lfsr = require('./lfsr')

/**
 * @desc White-noise generator. 15-bit LFSR based.
 */
class NoiseGenerator extends HexGenerator {
  constructor () {
    super()
    this.generatorType = 'N'
    this.sequencer = new Lfsr()
  }
  setFreq (freq) {
    if (Number.isFinite(freq) && freq > 0) {
      this.freq = freq
      this.setPeriod(freq)
    }
  }
  setWaveform (id) {
    if (id === 1) {
      this.sequencer.setMode(true)
      this.waveNum = id
    } else if (id === 0) {
      this.sequencer.setMode(false)
      this.waveNum = id
    }
  }
}

module.exports = NoiseGenerator

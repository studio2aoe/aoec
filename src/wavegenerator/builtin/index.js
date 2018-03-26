const WaveGenerator = require('../super')

/**
 * @desc Built-in-waveform generator. it generates pulse, triangle, sawtooth wave.
 */
class BuiltInGenerator extends WaveGenerator {
  constructor () {
    super()
    this.generatorType = 'B'
  }
  calcHexSignal () {
    let idx = this.generatorCount
    let num = this.waveNum
    if (num === 0x00) return 0
    else if (num <= 0x1F) return (idx >= num) ? 0 : 15
    else if (num >= 0x20 && num <= 0x2F) return (idx < 16) ? idx : -idx + 31
    else if (num >= 0x30 && num <= 0x3F) return Math.floor(idx / 2)
    else return 0
  }
}

module.exports = BuiltInGenerator

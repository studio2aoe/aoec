const WaveGenerator = require('../super')
const Waveform = require('../../waveform')

const MEM_SIZE = 4096

/**
 * @desc Custom-waveform generator. it generates waveform from memory.
 */
class CustomGenerator extends WaveGenerator {
  setWaveform (num) {
    if (Number.isInteger(num) && num >= 0 && num < MEM_SIZE) {
      this.waveNum = num
    }
  }
  calcHexSignal () { return Waveform.read(this.waveNum)[this.generatorCount] }
}

module.exports = CustomGenerator

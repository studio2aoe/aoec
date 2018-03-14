const WaveGenerator = require('../super')
const Waveform = require('../../waveform')

const MEM_SIZE = 1024
const WAVE_SIZE = 32

/**
 * @desc Custom-waveform generator. it generates waveform from memory.
 */
class CustomGenerator extends WaveGenerator {
  setWaveform (num) {
    if (Number.isInteger(num) && num >= 0 && num < MEM_SIZE) {
      this.waveNum = num
    }
  }
  calcHexSignal (phase) {
    let phaseIndex = Math.floor(this.getPhaseAngle(phase) * WAVE_SIZE)
    return Waveform.read(this.waveNum)[phaseIndex]
  }
}

module.exports = CustomGenerator

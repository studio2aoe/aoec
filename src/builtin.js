const WaveGenerator = require('./wavegenerator')

/**
 * @desc Built-in-waveform generator. it generates pulse, triangle, sawtooth wave.
 */
class BuiltInGenerator extends WaveGenerator {
  calcHexSignal (phase) {
    let signal
    let phaseAngle = this.getPhaseAngle(phase)
    switch (this.waveNum) {
      case 1: case 2: case 3: case 4:
        signal =
          (phaseAngle > (this.waveNum / 8)) ? 0 : 15
        break
      case 5:
        signal =
          (phaseAngle < 0.5) ? (phaseAngle * 32) : (-phaseAngle * 32) + 32
        break
      case 6:
        signal =
          phaseAngle * 16
        break
      default:
        return 0
    }
    signal = Math.floor(signal)
    return signal
  }
}

module.exports = BuiltInGenerator

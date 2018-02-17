import BuiltInWaveform from './builtin'
import Noise from './noise'
import AUDIO_CTX from './audioctx'

/**
 * @desc Main class of AOEC
 */
export class Aoec {
  /**
   * @param {Number} [buffsize=4096] Buffer size of script processor. It must be a power of 2 between 256 and 16384, that is 256, 512, 1024, 2048, 4096, 8192, 16384.
   */
  constructor (buffsize = 4096) {
    this.createNodes(buffsize)
    this.connect()
  }

  foo () {
    return 0
  }

  createNodes (buffsize) {
    this.master = AUDIO_CTX.createGain()
    this.master.gain.setValueAtTime(0.2, AUDIO_CTX.currentTime)
    this.master.connect(AUDIO_CTX.destination)

    this.processor = AUDIO_CTX.createScriptProcessor(buffsize, 2, 2)
    this.processor.connect(this.master)

    this.generatorB1 = new BuiltInWaveform()
    this.generatorN1 = new Noise()
  }

  connect () {
    let clock = 0
    var self = this
    var buffsize = this.processor.bufferSize
    this.processor.onaudioprocess = function (e) {
      let output = [
        e.outputBuffer.getChannelData(0),
        e.outputBuffer.getChannelData(1)
      ]
      for (let i = 0; i < buffsize; i++) {
        let value = 0
        value += self.generatorB1.getPhaseValue(clock)
        value += self.generatorN1.getPhaseValue(clock)
        value /= 8
        value -= 0.5
        output[0][i] = value
        output[1][i] = value
        // Update clock
        clock++
        if (clock >= 44100) clock %= 44100
      }
    }
  }
}

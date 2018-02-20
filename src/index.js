import BuiltInWaveform from './builtin'
import Noise from './noise'
import AUDIO_CTX from './audioctx'

const SAMPLE_RATE = AUDIO_CTX.sampleRate

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

  createNodes (buffsize) {
    this.master = AUDIO_CTX.createGain()
    this.master.gain.setValueAtTime(0.5, AUDIO_CTX.currentTime)
    this.master.connect(AUDIO_CTX.destination)
    this.processor = AUDIO_CTX.createScriptProcessor(buffsize, 2, 2)
    this.generatorB1 = new BuiltInWaveform()
    this.generatorN1 = new Noise()
  }

  connect () {
    let clock = 0
    let self = this
    let buffsize = this.processor.bufferSize

    this.processor.connect(this.master)
    this.processor.onaudioprocess = function (e) {
      let output = [
        e.outputBuffer.getChannelData(0),
        e.outputBuffer.getChannelData(1)
      ]
      for (let i = 0; i < buffsize; i++) {
        let valueL = 0
        let valueR = 0

        // Get left value
        valueL += self.generatorB1.getPhaseValue(clock)[0]
        valueL += self.generatorN1.getPhaseValue(clock)[0]

        // Get right value
        valueR += self.generatorB1.getPhaseValue(clock)[1]
        valueR += self.generatorN1.getPhaseValue(clock)[1]

        // Convert hexadecimal to value
        valueL /= 16
        valueL -= 0.5

        valueR /= 16
        valueR -= 0.5

        // Write value on output buffer
        output[0][i] = valueL
        output[1][i] = valueR

        // Update clock
        clock++
        if (clock >= SAMPLE_RATE) clock %= SAMPLE_RATE
      }
    }
  }

  disconnect () {
    this.processor.disconnect()
    this.processor.onaudioprocess = function (e) {
    }
  }
}

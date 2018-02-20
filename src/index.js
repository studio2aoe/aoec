import BuiltInWaveform from './builtin'
import NoiseWaveform from './noise'
import CustomWaveform from './custom'
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
    this.setupMaster(buffsize)
  }

  setupMaster (buffsize) {
    this.master = AUDIO_CTX.createGain()
    this.setMasterVolume(0.5)
    this.master.connect(AUDIO_CTX.destination)
    this.processor = AUDIO_CTX.createScriptProcessor(buffsize, 2, 2)
  }

  setupGenerator (pBuilt, pCustom, pNoise) {
    this.generator = []
    for (let i = 0; i < pBuilt; i++) {
      this.generator.push(new BuiltInWaveform())
    }
    for (let i = 0; i < pCustom; i++) {
      this.generator.push(new CustomWaveform())
    }
    for (let i = 0; i < pNoise; i++) {
      this.generator.push(new NoiseWaveform())
    }
  }

  sendGenerator (id, freq, type, inv, volL, volR) {
    const checkID = Number.isInteger(id)
    const checkFreq = Number.isInteger(freq)
    const checkType = Number.isInteger(type)
    const checkInv = Number.isInteger(inv)
    const checkVol = Number.isInteger(volL) && Number.isInteger(volR)

    if (checkID) {
      if (checkFreq) this.generator[id].setFreq(freq)
      if (checkType) this.generator[id].setType(type)
      if (checkInv) this.generator[id].setInv(inv)
      if (checkVol) this.generator[id].setVol(volL, volR)
    }
  }

  setMasterVolume (vol) {
    this.master.gain.setValueAtTime(vol, AUDIO_CTX.currentTime)
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

        // Get value
        self.generator.forEach(elem => {
          valueL += elem.getPhaseValue(clock)[0]
          valueR += elem.getPhaseValue(clock)[1]
        })

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

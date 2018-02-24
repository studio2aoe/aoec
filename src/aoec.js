const BuiltInWaveform = require('./builtin')
const NoiseWaveform = require('./noise')
const CustomWaveform = require('./custom')
const WaveMemory = require('./wavememory')

const SAMPLE_RATE = 44100
/**
 * @desc Main class of AOEC
 */
class Aoec {
  /**
   * @param {Object} audioContext Audio context of target environment
   * @param {Number} [buffsize=4096] Buffer size of script processor. It must be a power of 2 between 256 and 16384, that is 256, 512, 1024, 2048, 4096, 8192, 16384.
   * @param {String} [generatorSet='BBCNS'] Initial generator settings. 'B': built-in, 'C': custom, 'N': noise, 'S': sampler.
   */
  constructor (
    audioContext, buffsize, generatorSet) {
    this.master = audioContext.createGain()
    this.master.connect(audioContext.destination)
    this.processor = audioContext.createScriptProcessor(buffsize, 2, 2)
    this.resetGenerator(generatorSet)
    this.WaveMemory = WaveMemory
  }

  resetGenerator (generatorSet) {
    this.disconnect()
    this.generator = []
    generatorSet.split('').forEach(elem => {
      switch (elem) {
        case 'B':
          this.generator.push(new BuiltInWaveform())
          break
        case 'C':
          this.generator.push(new CustomWaveform())
          break
        case 'N':
          this.generator.push(new NoiseWaveform())
          break
        case 'S':
          // this.generator.push(new Sampler())
          break
      }
    })
  }

  setMasterVolume (vol) {
    this.master.gain.setValueAtTime(vol, this.master.context.currentTime)
  }

  connect () {
    let samplerPhase = 0
    let frameInterval = 918.75
    let framePhase = 0
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

        // Get phase value from generators
        self.generator.forEach(elem => {
          valueL += elem.getPhaseValue(samplerPhase)[0]
          valueR += elem.getPhaseValue(samplerPhase)[1]
        })

        // Convert phase value hexadecimal to real
        valueL /= 16
        valueL -= 0.5
        valueR /= 16
        valueR -= 0.5

        // Write phase value on output buffer
        output[0][i] = valueL
        output[1][i] = valueR

        // Update Phase
        samplerPhase++
        framePhase++
        if (samplerPhase % SAMPLE_RATE === 0) samplerPhase %= SAMPLE_RATE
        if (framePhase % frameInterval < 1) {
          self.generator.forEach(elem => {
            elem.sequencer.execute()
            framePhase %= frameInterval
          })
        }
      }
    }
  }

  disconnect () {
    this.processor.disconnect()
    this.processor.onaudioprocess = function (e) {
    }
  }
}

module.exports = Aoec

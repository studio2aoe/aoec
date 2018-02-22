const BuiltInWaveform = require('./builtin')
const NoiseWaveform = require('./noise')
const CustomWaveform = require('./custom')
const WaveMemory = require('./wavememory')

const SAMPLE_RATE = 44100
const WAVE_MEMORY = new WaveMemory()

/**
 * @desc Main class of AOEC
 */
class Aoec {
  /**
   * @param {Object} audioContext Target audio context environment. default is browser.
   * @param {Number} buffsize Buffer size of script processor. It must be a power of 2 between 256 and 16384, that is 256, 512, 1024, 2048, 4096, 8192, 16384.
   * @param {String} generatorSet Initial generator settings. 'B' is built-in, 'C' is custom, 'N' is noise, 'S' is sampler.
   */
  constructor (
    audioContext, buffsize, generatorSet) {
    this.audioContext = audioContext
    this.master = audioContext.createGain()
    this.setMasterVolume(0.5)
    this.master.connect(audioContext.destination)
    this.processor = audioContext.createScriptProcessor(buffsize, 2, 2)
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

  writeWaveMemory (idx, input) { WAVE_MEMORY.write(idx, input) }
  readWaveMemory (idx) { return WAVE_MEMORY.read(idx) }
  lockWaveMemory (idx) { WAVE_MEMORY.lock(idx) }
  unlockWaveMemory (idx) { WAVE_MEMORY.unlock(idx) }

  sendGenerator (id, freq, type, inv, volL, volR) {
    const checkID = Number.isInteger(id) && id >= 0
    const checkFreq = Number.isInteger(freq) && freq >= 0
    const checkType = Number.isInteger(type) && type >= 0
    const checkInv = (typeof inv === 'boolean')
    const checkVolL = Number.isInteger(volL) && volL >= 0 && volL <= 15
    const checkVolR = Number.isInteger(volR) && volR >= 0 && volR <= 15
    const checkVol = checkVolL && checkVolR

    if (checkID) {
      if (checkFreq) this.generator[id].setFreq(freq)
      if (checkType) this.generator[id].setType(type)
      if (checkInv) this.generator[id].setInv(inv)
      if (checkVol) this.generator[id].setVol(volL, volR)
    }
  }

  setMasterVolume (vol) {
    this.master.gain.setValueAtTime(vol, this.audioContext.currentTime)
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

module.exports = Aoec

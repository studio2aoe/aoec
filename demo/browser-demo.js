const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()
const aoec = new Aoec(AUDIO_CONTEXT, 512, 'BBCNS')

class Demo {
  constructor() {
    this.waveMemorySetup()
    this.resetCounter()
  }
  waveMemorySetup() {
    for (let i = 0; i < 31; i++) {
      let waveform = new Array(32)
      for (let j = 0; j < 32; j++) {
        if (j > i) waveform[j] = '0'
        else waveform[j] = 'F'
      }
      aoec.writeWaveMemory(i, waveform)
    }
  }
  resetCounter() { this.__counter = 0 }
  waveMemoryTest() {
    if (this.__counter < 32) {
      aoec.sendGenerator(2, 110, this.__counter, 0, 0xF, 0xF)
      this.__counter++
    } else this.resetCounter()
  }
  volumeTest() {
    if (this.__counter < 16) {
      aoec.sendGenerator(0, 110, 2, 0, 15 - this.__counter, 15 - this.__counter)
      aoec.sendGenerator(1, 138, 2, 0, 15 - this.__counter, 15 - this.__counter)
      aoec.sendGenerator(2, 165, 8, 0, 15 - this.__counter, 15 - this.__counter)
      this.__counter++
    } else this.resetCounter()
  }
  freqTest() {
    if (this.__counter < 512) {
      aoec.sendGenerator(0, 110 + 11 * this.__counter, 2, 0, 0xF, 0xF)
      aoec.sendGenerator(1, 138 + 14 * this.__counter, 2, 0, 0xF, 0xF)
      aoec.sendGenerator(2, 165 + 17 * this.__counter, 8, 0, 0xF, 0xF)
      this.__counter++
    } else this.resetCounter()
  }
} const demo = new Demo()

setInterval(() => {
  demo.freqTest()
}, 10)

aoec.connect()

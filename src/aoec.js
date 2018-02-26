const GeneratorSet = require('./generatorset')

let master
let processor

const init = (audioContext, buffsize = 4096) => {
  if (!(processor === undefined)) disconnect()
  master = audioContext.createGain()
  master.connect(audioContext.destination)
  processor = audioContext.createScriptProcessor(buffsize, 2, 2)
  GeneratorSet.init()
}

const setMasterVolume = (vol) => {
  master.gain.setValueAtTime(vol, master.context.currentTime)
}

const connect = () => {
  let clock = 0
  let buffsize = processor.bufferSize

  processor.connect(master)
  processor.onaudioprocess = (audioEvent) => {
    let output = [
      audioEvent.outputBuffer.getChannelData(0),
      audioEvent.outputBuffer.getChannelData(1)
    ]
    for (let i = 0; i < buffsize; i++) {
      let value = GeneratorSet.getVoltage(clock)
      output[0][i] = value[0]
      output[1][i] = value[1]
      clock++
    }
  }
}

const disconnect = () => {
  processor.disconnect()
  processor.onaudioprocess = (audioEveont) => {}
}

module.exports = {
  init: init,
  GeneratorSet: GeneratorSet,
  setMasterVolume: setMasterVolume,
  connect: connect,
  disconnect: disconnect
}

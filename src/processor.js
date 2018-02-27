const GeneratorSet = require('./generatorSet')
const Scheduler = require('./scheduler')

let processorNode
let destinationNode

const init = (audioContext, buffsize) => {
  processorNode = audioContext.createScriptProcessor(buffsize, 2, 2)
}

const connect = (destination = destinationNode) => {
  processorNode.connect(destination)
}

const disconnect = () => {
  processorNode.disconnect()
}

const play = () => {
  let clock = 0
  let buffsize = processorNode.bufferSize
  processorNode.onaudioprocess = (audioEvent) => {
    let output = [
      audioEvent.outputBuffer.getChannelData(0),
      audioEvent.outputBuffer.getChannelData(1)
    ]
    for (let i = 0; i < buffsize; i++) {
      let value = GeneratorSet.getVoltage(clock)
      output[0][i] = value[0]
      output[1][i] = value[1]
      Scheduler.execute(clock)
      clock++
    }
  }
}

const stop = () => {
  let buffsize = processorNode.bufferSize
  processorNode.onaudioprocess = (audioEvent) => {
    let output = [
      audioEvent.outputBuffer.getChannelData(0),
      audioEvent.outputBuffer.getChannelData(1)
    ]
    for (let i = 0; i < buffsize; i++) {
      output[0][i] = 0.0
      output[1][i] = 0.0
    }
  }
}

module.exports = {
  /* Aoec functions */
  init: init,
  connect: connect,
  disconnect: disconnect,
  play: play,
  stop: stop
}

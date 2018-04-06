const GeneratorSet = require('../wavegenerator')
const Scheduler = require('../scheduler')

let processorNode
let destinationNode

/**
 * Initialize processor.
 * @param {Object} audioContext Audio context of target environment.
 * @param {Number} buffsize Buffer size of processor. it must be 2^n integer 256 to 16384.
 */
const init = (audioContext, buffsize) => {
  processorNode = audioContext.createScriptProcessor(buffsize, 2, 2)
}

/**
 * Connect processor to other audio node.
 * @param {Object} destination destination oudio node. if this argument is undefined, processor connects to recently connected destination.
 */
const connect = (destination = destinationNode) => {
  processorNode.connect(destination)
}

/**
 * Disconnect processor.
 */
const disconnect = () => {
  processorNode.disconnect()
}

/**
 * Play processor.
 */
const play = () => {
  let sampleCount = 0
  let buffsize = processorNode.bufferSize
  processorNode.onaudioprocess = (audioEvent) => {
    let output = [
      audioEvent.outputBuffer.getChannelData(0),
      audioEvent.outputBuffer.getChannelData(1)
    ]
    for (let i = 0; i < buffsize; i++) {
      let value = GeneratorSet.voltage(sampleCount)
      output[0][i] = value[0]
      output[1][i] = value[1]
      Scheduler.execute(sampleCount)
      sampleCount++
    }
  }
}

/**
 * Stop processor.
 */
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

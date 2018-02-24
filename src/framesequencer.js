
const emptyFrame = [undefined, undefined, undefined, undefined, undefined]
const emptyStep = {
  isLoop: true,
  frameList: [emptyFrame]
}

class FrameSequencer {
  constructor (generator) {
    this.generator = generator
    this.setStep(emptyStep)
  }
  setStep (step) {
    this.frameIndex = 0
    this.frameList = step.frameList
    this.isLoop = step.isLoop
    this.currentFrame = step.frameList[0]
  }
  execute () {
    const frame = this.currentFrame
    this.generator.send(frame[0], frame[1], frame[2], frame[3], frame[4])
    this.next()
  }
  next () {
    const endFrame = (this.frameList.length - this.frameIndex) === 1
    if (endFrame) {
      if (this.isLoop) {
        this.frameIndex = 0
        this.currentFrame = this.frameList[0]
      } else {
        this.currentFrame = emptyFrame
      }
    } else {
      this.frameIndex++
      this.currentFrame = this.frameList[this.frameIndex]
    }
  }
}

module.exports = FrameSequencer

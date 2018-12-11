/* Require */
const check = require('check-types').assert
const HexGenerator = require('../hexgenerator')
const Automation = require('../automation')
const Pitch = require('../pitch')
const misc = require('../misc')
const mixVol = require('../volume')
const Instrument = require('../instrument')

/* Alias */
const checkHex = misc.checkHex
const checkUByte = misc.checkUByte
const convertSByte = misc.convertSByte

class Track {
  constructor (id) {
    this.__id = misc.checkArrayID(id, HexGenerator.getString())
    this.__type = HexGenerator.getType(this.__id)
    this.__generator = HexGenerator.getGenerator(this.__id)

    this.__note = '---'
    this.__inv = false
    this.__volL = 0x0
    this.__volR = 0x0
    this.__tuneType = 0
    this.__bank = 0x0
    this.__seqA = new Automation.Sequencer()
    this.__seqD = new Automation.Sequencer()
    this.__seqE = new Automation.Sequencer()
    this.__seqW = new Automation.Sequencer()
  }

  setNote (note) {
    check.string(note)
    check.hasLength(note, 3)
    switch (note) {
      case '   ':
      case '___':
        break
      case '===':
        this.release()
        break
      case '---':
      default:
        this.__note = note
        this.__seqA.init()
        this.__seqD.init()
    }
  }

  setVol (volL, volR) {
    this.setVolL(volL)
    this.setVolR(volR)
  }
  setVolL (volL) {
    try {
      this.__volL = checkHex(volL)
    } catch (err) {}
    this.__seqE.init()
    this.__seqW.init()
  }
  setVolR (volR) {
    try {
      this.__volR = checkHex(volR)
    } catch (err) { }
    this.__seqE.init()
    this.__seqW.init()
  }

  setInv (isInv) { this.__inv = check.boolean(isInv) }

  setTuneType (id) { this.__tuneType = checkHex(id) }

  setBank (id) { this.__bank = checkHex(id) }

  setQuickA (data) {
    this.__seqA = new Automation.Sequencer(data)
    this.__seqA.init()
    this.__seqD.init()
    this.__seqA.id = undefined
  }

  setQuickD (data) {
    this.__seqD = new Automation.Sequencer(data)
    this.__seqA.init()
    this.__seqD.init()
    this.__seqD.id = undefined
  }

  setQuickE (data) {
    this.__seqE = new Automation.Sequencer(data)
    this.__seqE.init()
    this.__seqW.init()
    this.__seqE.id = undefined
  }

  setQuickW (data) {
    this.__seqW = new Automation.Sequencer(data)
    this.__seqE.init()
    this.__seqW.init()
    this.__seqW.id = undefined
  }

  setA (id) {
    this.setQuickA(Automation.Memory.read('A', checkUByte(id)))
    this.__seqA.id = id
  }

  setD (id) {
    this.setQuickD(Automation.Memory.read('D', checkUByte(id)))
    this.__seqD.id = id
  }

  setE (id) {
    this.setQuickE(Automation.Memory.read('E', checkUByte(id)))
    this.__seqE.id = id
  }

  setW (id) {
    this.setQuickW(Automation.Memory.read('W', checkUByte(id)))
    this.__seqW.id = id
  }

  setInst (id) {
    this.__inst = checkUByte(id)
    const data = Instrument.Memory.read(id)
    if (data.inv) this.setInv(data.inv)
    if (data.tuneType) this.setTuneType(data.tuneType)
    if (data.bank) this.setBank(data.bank)
    if (data.seqA) this.setA(data.seqA)
    if (data.seqD) this.setD(data.seqD)
    if (data.seqE) this.setE(data.seqE)
    if (data.seqW) this.setW(data.seqW)

    this.__seqA.init()
    this.__seqD.init()
    this.__seqE.init()
    this.__seqW.init()
  }

  __readPitch () {
    const note = this.__note
    if (note === '---') return 0
    check.string(note)
    check.hasLength(note, 3)
    const semi = convertSByte(this.__seqA.read())
    const cent = convertSByte(this.__seqD.read())
    const type = this.__tuneType
    return Pitch.getFreq(type, note, semi, cent)
  }

  __readEnvelope () {
    if (this.note === '---') return 0
    const env = this.__seqE.read()
    const envL = Math.floor(env / 16)
    const envR = env % 16
    const volL = this.__volL
    const volR = this.__volR
    return { L: mixVol(volL, envL), R: mixVol(volR, envR) }
  }

  __readWaveNumber () {
    const prefix = this.__bank
    const suffix = this.__seqW.read()
    if (this.__type === 'C') return prefix * 0x100 + suffix
    else return suffix
  }

  execute () {
    this.__generator.setFreq(this.__readPitch())
    this.__generator.setWaveform(this.__readWaveNumber())
    this.__generator.setInv(this.__inv)
    this.__generator.setVolL(this.__readEnvelope().L)
    this.__generator.setVolR(this.__readEnvelope().R)
  }

  release () {
    this.__seqA.release()
    this.__seqD.release()
    this.__seqE.release()
    this.__seqW.release()
  }

  next () {
    this.__seqA.next()
    this.__seqD.next()
    this.__seqE.next()
    this.__seqW.next()
  }
}
module.exports = Track

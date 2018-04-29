/* Require */
const check = require('check-types').assert
const HexGenerator = require('../hexgenerator')
const Automation = require('../automation')
const Pitch = require('../pitch')
const misc = require('../misc')
const mixVol = require('../volume')
const Memory = require('./memory')

/* Alias */
const checkHex = misc.checkHex
const checkUByte = misc.checkUByte
const convertSByte = misc.convertSByte

class Instrument {
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

  setTuneType (id) { this.__tuneType = checkHex(id) }

  setBank (id) { this.__bank = checkHex(id) }

  setA (id) {
    checkUByte(id)
    this.__seqA = new Automation.Sequencer(Automation.Memory.read('A', id))
    this.__seqA.id = id
    this.__seqA.init()
    this.__seqD.init()
  }
  setD (id) {
    checkUByte(id)
    this.__seqD = new Automation.Sequencer(Automation.Memory.read('D', id))
    this.__seqD.id = id
    this.__seqA.init()
    this.__seqD.init()
  }
  setE (id) {
    checkUByte(id)
    this.__seqE = new Automation.Sequencer(Automation.Memory.read('E', id))
    this.__seqE.id = id
    this.__seqE.init()
    this.__seqW.init()
  }
  setW (id) {
    checkUByte(id)
    this.__seqW = new Automation.Sequencer(Automation.Memory.read('W', id))
    this.__seqW.id = id
    this.__seqE.init()
    this.__seqW.init()
  }

  setInst (id) {
    this.__inst = checkUByte(id)
    const data = Memory.read(id)
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
module.exports = Instrument

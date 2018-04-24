/* Require */
const check = require('check-types').assert
const WaveGenerator = require('../wavegenerator')
const Automation = require('../automation')
const Pitch = require('../pitch')
const misc = require('../misc')
const mixVol = require('../volume')

/* Alias */
const TABLE_REGEX = '[ADEW]'
const checkType = (type) =>
  check.match(check.hasLength(type, 1), TABLE_REGEX)
const checkHex = misc.checkHex
const checkUByte = misc.checkUByte
const convertSByte = misc.convertSByte

class Instrument {
  constructor (id) {
    this.__id = misc.checkArrayID(id, WaveGenerator.getString())
    this.__type = WaveGenerator.getType(this.__id)
    this.__generator = WaveGenerator.getGenerator(this.__id)

    this.__note = '---'
    this.__inv = false
    this.__volL = 0x0
    this.__volR = 0x0
    this.__tuneType = 0
    this.__bank = 0x0

    this.__automation = {
      A: new Automation.Sequencer(),
      D: new Automation.Sequencer(),
      E: new Automation.Sequencer(),
      W: new Automation.Sequencer(),
      w: new Automation.Sequencer()
    }
    this.__automationID = {}

    this.setAutomation('A', 0x00)
    this.setAutomation('D', 0x00)
    this.setAutomation('E', 0x00)
    this.setAutomation('W', 0x00)
  }

  __readAutomation (type) { return this.__automation[checkType(type)].read() }

  __readPitch () {
    const note = this.__note
    if (note === '---') return 0
    check.string(note)
    check.hasLength(note, 3)
    const semi = convertSByte(this.__readAutomation('A'))
    const cent = convertSByte(this.__readAutomation('D'))
    const type = this.__tuneType
    return Pitch.getFreq(type, note, semi, cent)
  }

  __readEnvelope () {
    if (this.note === '---') return 0
    const env = this.__readAutomation('E')
    const envL = Math.floor(env / 16)
    const envR = env % 16
    const volL = this.__volL
    const volR = this.__volR
    return { L: mixVol(volL, envL), R: mixVol(volR, envR) }
  }

  __readWaveNumber () {
    const prefix = this.__bank
    const suffix = this.__readAutomation('W')
    if (this.__type === 'C') return prefix * 0x100 + suffix
    else return suffix
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
        this.__automation.A.init()
        this.__automation.D.init()
    }
  }

  setVol (volL, volR) {
    try {
      this.__volL = checkHex(volL)
    } catch (err) { }
    try {
      this.__volR = checkHex(volR)
    } catch (err) { }
    this.__automation.E.init()
    this.__automation.W.init()
    this.__automation.w.init()
  }

  setTuneType (id) { this.__tuneType = checkHex(id) }

  setBank (id) { this.__bank = checkUByte(id) }

  setAutomation (type, id) {
    checkUByte(id)
    checkType(type)
    this.__automation[type] =
      new Automation.Sequencer(Automation.Memory.read(type, id))
    this.__automationID[type] = id
    if (type === 'E' || type === 'W' || type === 'w') {
      this.__automation.E.init()
      this.__automation.W.init()
      this.__automation.w.init()
    }
    if (type === 'A' || type === 'D') {
      this.__automation.A.init()
      this.__automation.D.init()
    }
  }

  setInst (id) {
    this.inst = checkUByte(id)
    /* TODO: Implement inst data */
    this.__automation.A.init()
    this.__automation.D.init()
    this.__automation.E.init()
    this.__automation.W.init()
    this.__automation.w.init()
  }

  execute () {
    this.__generator.setFreq(this.__readPitch())
    this.__generator.setWaveform(this.__readWaveNumber())
    this.__generator.setInv(this.__inv)
    this.__generator.setVolL(this.__readEnvelope().L)
    this.__generator.setVolR(this.__readEnvelope().R)
  }

  release () {
    this.__automation.A.release()
    this.__automation.D.release()
    this.__automation.E.release()
    this.__automation.W.release()
    this.__automation.w.release()
  }

  next () {
    this.__automation.A.next()
    this.__automation.D.next()
    this.__automation.E.next()
    this.__automation.W.next()
    this.__automation.w.next()
  }
}
module.exports = Instrument

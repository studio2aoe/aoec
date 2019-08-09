
/* Private Property Symbols */
const __list = Symbol('list')
const __loopstart = Symbol('loopstart')
const __loopend = Symbol('loopend')
const __current = Symbol('current')
const __released = Symbol('released')

class AutomationSequencer {
  constructor (data = {
    name: '',
    list: [0],
    loopstart: -1,
    loopend: -1
  }) {
    this[__list] = data.list
    this[__loopstart] = data.loopstart
    this[__loopend] = data.loopend
    this[__current] = 0
    this[__released] = false
  }

  init () {
    this[__current] = 0
    this[__released] = false
  }

  read () {
    return this[__list][this[__current]]
  }

  next () {
    const hasLoopStart = this[__loopstart] >= 0
    const hasLoopEnd = this[__loopend] >= 0 && this[__loopend] >= this[__loopstart]
    const loopOK = !this[__released]
    const jumpfrom = (hasLoopEnd && loopOK) ? this[__loopend] : this[__list].length - 1
    const jumpto = (hasLoopStart && loopOK) ? this[__loopstart] : jumpfrom
    const hasNext = this[__current] < jumpfrom
    return hasNext ? (this[__current] += 1) : (this[__current] = jumpto)
  }

  release () {
    this[__released] = true
  }
}

module.exports = AutomationSequencer

class Lfsr {
  constructor () {
    this.__mode = 0 // mode flag. true: use tap 6, false: use tap 1
    this.__tapB = 1
    this.__shiftRegister = 1
  }

  setMode (mode) {
    this.__mode = mode
    if (mode) this.__tapB = 6
    else this.__tapB = 1
  }

  clock () {
    const bitA = this.__shiftRegister & 1
    const bitB = (this.__shiftRegister >> this.__tapB) & 1
    let feedback = (bitA ^ bitB) << 14
    this.__shiftRegister >>= 1
    this.__shiftRegister |= feedback
  }

  getHex () {
    return this.__shiftRegister >> 11
  }
}

export default Lfsr

/**
 * @desc GB/NES style 15-bit LFSR (Linear Feedback Shift Register)
 */
class Lfsr {
  constructor () {
    this.__mode = 0
    this.__tapB = 1
    this.__register = 1
  }

  /**
   * @desc Set mode flag of LFSR tap. True: Use 6 / False: Use 1
   * @param {Boolean} mode 
   */
  setMode (mode) {
    this.__mode = mode
    if (mode) this.__tapB = 6
    else this.__tapB = 1
  }

  /**
   * @desc Calculate next bit
   */
  clock () {
    const bitA = this.__register & 1 // 1 is tabA
    const bitB = (this.__register >> this.__tapB) & 1
    const feedback = (bitA ^ bitB) << 14
    this.__register >>= 1
    this.__register |= feedback
  }

  /**
   * @desc Get hexadecimal random number from the latest 4-bits of register
   * @return {Number} Hexadecimal number (0 to 15)
   */
  getHex () {
    return this.__register >> 11
  }
}

export default Lfsr

/**
 * GB/NES style 15-bit LFSR (Linear Feedback Shift Register)
 */
class Lfsr {
  constructor () {
    this.__mode = 0
    this.__tapB = 1
    this.__register = 1
  }

  /**
   * Set mode flag of LFSR tap.
   * @param {Boolean} mode True: Use 6 / False: Use 1
   */
  setMode (mode) {
    this.__mode = mode
    this.__tapB = mode ? 6 : 1
  }

  /**
   * Calculate next bit
   */
  next () {
    const bitA = this.__register & 1 // 1 is tabA
    const bitB = (this.__register >> this.__tapB) & 1
    const feedback = (bitA ^ bitB) << 14
    this.__register >>= 1
    this.__register |= feedback
  }

  /**
   * Get hexadecimal random number from the latest 4-bits of register
   * @return {Number} Hexadecimal number (0 to 15)
   */
  read () {
    return this.__register >> 11
  }
}

module.exports = Lfsr

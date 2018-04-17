/* Require */
const uint4 = require('uint4')
const check = require('check-types').assert

/* Alias */
const readHex = uint4.readUInt4LE
const writeHex = uint4.writeUInt4LE
const checkPosInt = (num) => check.integer(check.positive(num))
const NOSET_ERROR = new Error('This paramater can\'t be changed directly. please use init()')

class HexBuffer {
  constructor (len) {
    this.init(len)
  }

  init (len = 0) {
    this.__hexSize = checkPosInt(len)
    const byteSize = Math.ceil(this.__hexSize / 2)
    this.__buffer = Buffer.alloc(byteSize)
  }

  get length () { return this.__hexSize }
  get hexSize () { return this.__hexSize }
  get byteSize () { return this.__buffer.byteLength }

  set length (arg) { throw NOSET_ERROR }
  set hexSize (arg) { throw NOSET_ERROR }
  set byteSize (arg) { throw NOSET_ERROR }

  read () {
    const indexes = [...Array(this.length).keys()]
    return indexes.map(i => readHex(this.__buffer, i / 2))
  }

  write (arr) {
    check.equal(arr.length, this.length)
    arr.forEach((elem, i) => writeHex(this.__buffer, elem, i / 2))
  }
}

module.exports = HexBuffer

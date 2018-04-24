/* Require */
const check = require('check-types').assert

/* Public Functions */

const checkRangedInt =
  (num, min, max) => check.inRange(check.integer(num), min, max)

const checkArrayID = (id, arr) => checkRangedInt(id, 0, arr.length - 1)

const checkHex = (hex) => checkRangedInt(hex, 0, 15)
const checkUByte = (uByte) => checkRangedInt(uByte, 0, 255)
const checkSByte = (sByte) => checkRangedInt(sByte, -128, 127)

const convertUByte = (sByte) => new Uint8Array(1).fill(checkSByte(sByte))[0]
const convertSByte = (uByte) => new Int8Array(1).fill(checkUByte(uByte))[0]

const parseUByte = (str) => {
  check.hasLength(check.string(str), 2)
  const hexL = checkHex(parseInt(str[0], 16))
  const hexR = checkHex(parseInt(str[1], 16))
  return hexL * 16 + hexR
}
const parseSByte = (str) => convertSByte(parseUByte(str))

module.exports = {
  checkRangedInt: checkRangedInt,
  checkArrayID: checkArrayID,
  checkHex: checkHex,
  checkUByte: checkUByte,
  checkSByte: checkSByte,
  convertUByte: convertUByte,
  convertSByte: convertSByte,
  parseUByte: parseUByte,
  parseSByte: parseSByte
}

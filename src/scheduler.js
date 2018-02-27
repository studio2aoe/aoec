let schedulerFunction = () => {}

/**
 * Set scheduler function.
 * @param {Function} func Function executed when processor reads each sample.
 */
const setFunc = func => { schedulerFunction = func }

/**
 * Execute scheduler function. it is executed when processor reads each sample.
 * @param {*} clock sampler phase time
 */
const execute = clock => schedulerFunction(clock)

module.exports = {
  setFunc: setFunc,
  execute: execute
}

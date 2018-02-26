let schedulerFunction = () => {}
const setFunc = func => { schedulerFunction = func }
const execute = clock => schedulerFunction(clock)

module.exports = {
  setFunc: setFunc,
  execute: execute
}

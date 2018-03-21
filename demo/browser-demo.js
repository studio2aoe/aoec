const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()

/* Setup Master */
const master = AUDIO_CONTEXT.createGain()
master.connect(AUDIO_CONTEXT.destination)
master.gain.setValueAtTime(0.5, master.context.currentTime)

/* Setup AOEC Processor */
aoec.Processor.init(AUDIO_CONTEXT, 4096)
aoec.Processor.connect(master)

/* Setup Waveform generator */
aoec.GeneratorSet.init('BBCN')


/*
aoec.WaveformMemory.write(1, 'FFFFFFFFFFFFFFFF0000000000000000')
aoec.GeneratorSet.send(0, 440, 16, true, 15, 15)
aoec.GeneratorSet.send(1, 220, 8, true, 15, 15)
aoec.GeneratorSet.send(2, 55, 1, false, 15, 15)
aoec.GeneratorSet.send(3, 32768, 0, false, 15, 15)
*/

const tempo = 120
const beatperiod = 60 / tempo
const frameperiod = (beatperiod / 24) * 44100
let fcount = 0
aoec.GeneratorSet.send(0, 440, 16, true, 15, 15)
aoec.Scheduler.setFunc((clock) => {
  if (clock % frameperiod < 1) {
    if (fcount % 3 === 0) aoec.GeneratorSet.sendFreq(0, 440)
    else if (fcount % 3 === 1) aoec.GeneratorSet.sendFreq(0, 660)
    else if (fcount % 3 === 2) aoec.GeneratorSet.sendFreq(0, 880)
    fcount++
  }
})

/* Play */
aoec.Processor.play()
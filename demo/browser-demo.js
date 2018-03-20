const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()

/* Setup Master */
const master = AUDIO_CONTEXT.createGain()
master.connect(AUDIO_CONTEXT.destination)
master.gain.setValueAtTime(0.5, master.context.currentTime)

/* Setup AOEC Processor */
aoec.Processor.init(AUDIO_CONTEXT, 4096)
aoec.Processor.connect(master)

/* Setup Waveform generator example */
aoec.GeneratorSet.init('BBCN')
aoec.WaveformMemory.write(1, 'FFFFFFFFFFFFFFFF0000000000000000')
// aoec.GeneratorSet.send(2, 440, 1, false, 15, 15)
// aoec.GeneratorSet.send(0, 330, 4, false, 15, 15)
aoec.GeneratorSet.send(3, 16383, 0, false, 15, 15)
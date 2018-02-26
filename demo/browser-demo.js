const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()

Aoec.init(AUDIO_CONTEXT, 4096, 'BBCNS')
Aoec.setMasterVolume(0.5)

Aoec.GeneratorSet.send(0, 440, 2, 0, 15, 15)

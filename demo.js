const aoec = new Aoec.Aoec()
aoec.sendGenerator(0, 440, 5, 0, 0xF, 0xF)
aoec.sendGenerator(1, 660, 5, 0, 0xF, 0xF)
aoec.sendGenerator(2, 880, 5, 0, 0xF, 0xF)
aoec.generator[2].__wave.write(5, '0123456789ABCDEFFEDCBA9876543210')
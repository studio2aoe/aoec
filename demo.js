const aoec = new Aoec.Aoec()
aoec.setupGenerator(1, 0, 1)
aoec.sendGenerator(0, 440, 2, 0, 0xF, 0xF)
aoec.sendGenerator(1, 22050, 0, 0, 0x0, 0x0)
aoec.connect()

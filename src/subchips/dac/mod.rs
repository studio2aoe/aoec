mod table;

pub struct DAC {
    pub mute: bool,
    pub env: u8,
    pub pan: u8,
    table: table::DACtable,
}

impl DAC {
    pub fn new() -> DAC {
        DAC {
            mute: false,
            env: 0,
            pan: 0,
            table: table::DACtable::new(),
        }
    }
    pub fn reset(&mut self) {
        self.mute = false;
        self.env = 0;
        self.pan = 0;
    }

    pub fn mix(&self, ch: usize, hex: u8) -> f32 {
        match self.mute {
            true => 0.0,
            false => {
                self.table.env[(self.env & 0x0F) as usize] *
                self.table.pan[(self.pan & 0x0F) as usize][ch] *
                self.table.env[(hex & 0x0F) as usize]
            }
        }
    }
}

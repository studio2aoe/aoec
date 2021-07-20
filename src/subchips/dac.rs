pub struct DAC {
    pub mute: bool,
    pub env: [u8; 2],
}

macro_rules! mix {
    ($hex:expr, $env: expr) => {
        (($hex as f32 / 7.5) - 1.0) * ($env as f32 / 15.0)
    }
}

impl DAC {
    pub fn new() -> DAC {
        DAC {
            mute: false,
            env: [0, 0]
        }
    }
    pub fn reset(&mut self) {
        self.mute = false;
        self.env = [0, 0];
    }
    pub fn mix(&self, ch: usize, hex: u8) -> f32 {
        mix!(hex, self.env[ch])
    }
}

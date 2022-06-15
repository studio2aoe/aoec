const Q_PI: f32 = std::f32::consts::FRAC_PI_4;
const SQRT2: f32 = std::f32::consts::SQRT_2;
const HTOA_TABLE: [f32; 16] = [
    (0.0 / 7.5) - 1.0,
    (1.0 / 7.5) - 1.0,
    (2.0 / 7.5) - 1.0,
    (3.0 / 7.5) - 1.0,
    (4.0 / 7.5) - 1.0,
    (5.0 / 7.5) - 1.0,
    (6.0 / 7.5) - 1.0,
    (7.0 / 7.5) - 1.0,
    (8.0 / 7.5) - 1.0,
    (9.0 / 7.5) - 1.0,
    (10.0 / 7.5) - 1.0,
    (11.0 / 7.5) - 1.0,
    (12.0 / 7.5) - 1.0,
    (13.0 / 7.5) - 1.0,
    (14.0 / 7.5) - 1.0,
    (15.0 / 7.5) - 1.0,
];

pub struct DAC {
    mute: bool,
    vol: u8,
    pan: u8,
    realvol: [f32; 2],
}

impl DAC {
    pub fn new() -> DAC {
        DAC {
            mute: false,
            vol: 0,
            pan: 0,
            realvol: [0f32, 0f32],
        }
    }
    pub fn reset(&mut self) {
        self.mute = false;
        self.vol = 0;
        self.pan = 0;
    }

    pub fn set_vol(&mut self, vol: u8) {
        self.vol = vol & 0x0F;
        self.refresh_realvol();
    }

    pub fn set_pan(&mut self, pan: u8) {
        self.pan = pan & 0x0F;
        self.refresh_realvol();
    }

    pub fn set_mute(&mut self, mute: bool) {
        self.mute = mute;
        self.refresh_realvol();
    }

    pub fn mix(&self, ch: usize, hex: u8) -> f32 {
        let hex = hex as usize;
        self.realvol[ch] * HTOA_TABLE[hex]
    }

    fn refresh_realvol(&mut self) {
        if self.mute == true {
            self.realvol = [0.0, 0.0]
        }
        else {
            let vtoa = self.vol as f32 / 15.0; // volume to analogue
            let ptoa = match self.pan { // panning to analogue
                0 => 0.0,
                p => ((p as f32 - 8.0) / 7.0)
            };
            let rad = ptoa * Q_PI; // panning angle as radian
            self.realvol = [
                (rad.cos() - rad.sin()) * SQRT2 * vtoa,
                (rad.cos() + rad.sin()) * SQRT2 * vtoa
            ]
        }
    }
}

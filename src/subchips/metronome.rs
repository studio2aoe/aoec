pub struct Metronome {
    sample_rate: f32,
    tempo: f32,
    period: f32,
    offset: f32
}

impl Metronome {
    pub fn new(sample_rate: f32, tempo: f32) -> Metronome {
        let mut new = Metronome {
            sample_rate,
            tempo,
            period: 0_f32,
            offset: 0_f32,
        };
        new.init();
        new
    }

    pub fn init(&mut self) {
        self.refresh_tempo();
        self.reset_offset();
    }

    pub fn reset_offset(&mut self) {
        self.offset = 0_f32;
    }

    pub fn tick(&mut self) -> bool {
        match self.offset >= self.period {
            true => {
                self.offset -= self.period;
                true
            },
            false => false
        } 
    }

    pub fn clock(&mut self) {
        self.offset += 1.0;
    }

    pub fn set_sample_rate(&mut self, sample_rate: f32) {
        self.sample_rate = match sample_rate {
            sample_rate if sample_rate == 0f32 => panic!("sample_rate value must not be 0"),
            _ => sample_rate
        };
        self.refresh_tempo();
    }

    pub fn set_tempo(&mut self, tempo: f32) {
        self.tempo = match tempo {
            t if t  < 0f32 => t * -1f32, // use absolute value
            t if t == 0f32 => panic!("tempo value must not be 0.0"),
            _ => tempo,
        };
        self.refresh_tempo();
    }

    fn refresh_tempo(&mut self) {
        let minute_period = self.sample_rate * 60_f32;
        let beat_period = minute_period / self.tempo;
        let tick_period = beat_period / 96_f32;

        self.period = tick_period;
    }
}
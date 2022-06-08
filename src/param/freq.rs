use super::Param;

pub struct Frequency {
    // `Param` properties that can be accessed by g/setter
    // see `trait Param` (in `./mod.rs`)
    base: f32,
    now: f32,
    delta: f32,
    period: f32,

    // Internal properties
    sample_count: f32, // clock for every sample counts
    delta_count: u32, // clock periodly
}

impl Frequency {
    pub fn new(base: f32) -> Self {
        let mut new = Frequency {
            base,
            now: base,
            delta: 1_f32,
            period: 960_f32,
            sample_count: 0_f32,
            delta_count: 0,
        };
        new.set_delta(1f32);
        new
    }
}

impl Param<f32> for Frequency {
    fn clock(&mut self) -> bool {
        let truth = match self.sample_count >= self.period {
            true => {
                self.sample_count -= self.period;
                self.now *= self.delta;
                self.delta_count += 1;
                true
            },
            false => false
        };
        self.sample_count += 1_f32;
        truth
    }

    fn reset_now(&mut self) {
        self.delta_count = 0;
        self.now = self.base;
    }
    fn set_base(&mut self, freq: f32) {
        // Filter the input param `freq`
        self.base = match freq {
            v if v  < 0_f32 => v * -1_f32, // use absolute value
            v if v == 0_f32 => panic!("freq value must not be 0.0"),
            _ => freq,
        };

        // refresh `now` prop by delta count
        self.now =
            self.base * self.delta.powi(self.delta_count as i32);
    }
    fn set_delta(&mut self, delta: f32) {
        // Input param is the pitch interval. (uses `cent` unit)
        // But `self.delta` prop stores frequency ratio
        // that calculated from pitch interval.
        self.delta = 2_f32.powf(delta / 1200_f32);
    }
    fn set_period(&mut self, period: f32) {
        // Filter the input param `period`
        self.period = match period {
            t if t  < 0f32 => t * -1f32, // use absolute value
            t if t == 0f32 => panic!("period value must not be 0.0"),
            _ => period,
        };
    }

    fn get_base(&self) -> f32 {
        self.base
    }
    fn get_now(&self) -> f32 {
        self.now
    }
    fn get_delta(&self) -> f32 {
        // Return value is the pitch interval. (uses `cent` unit)
        // So it needs calculated from frequency ratio
        // that stored in `self.delta` prop
        1200_f32 * self.delta.log2()
    }
    fn get_period(&self) -> f32 {
        self.period
    }
}
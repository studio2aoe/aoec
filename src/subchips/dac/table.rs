const Q_PI: f32 = std::f32::consts::FRAC_PI_4;
const SQRT2: f32 = std::f32::consts::SQRT_2;

fn calc_envvol(env: usize) -> f32 {
    ((env & 0x0F) as f32) / 15.0
}
fn calc_panvol(pan: usize) -> [f32; 2] {
    let analogue = match pan & 0x0F {
        0 => 0.0,
        p => (p as f32 - 8.0) / 7.0
    };
    let rad = analogue * Q_PI;
    let lvol = (rad.cos() - rad.sin()) * SQRT2;
    let rvol = (rad.cos() + rad.sin()) * SQRT2;
    [lvol, rvol]
}
fn calc_hexvol(hex: usize) -> f32 { 
    (((hex & 0x0F) as f32) / 7.5) - 1.0 
}

fn create_envtable() -> [f32; 16] {
    let mut etable = [0.0; 16];
    for i in 0..16 { etable[i] = calc_envvol(i) }
    etable
}

fn create_pantable() -> [[f32; 2]; 16] {
    let mut ptable = [[0.0; 2]; 16];
    for i in 0..16 { ptable[i] = calc_panvol(i) }
    ptable
}

fn create_hextable() -> [f32; 16] {
    let mut htable = [0.0; 16];
    for i in 0..16 { htable[i] = calc_hexvol(i) }
    htable
}

pub struct DACtable {
    pub env: [f32; 16],
    pub pan: [[f32; 2]; 16],
    pub hex: [f32; 16],
}

impl DACtable {
    pub fn new() -> DACtable {
        DACtable {
            env: create_envtable(),
            pan: create_pantable(),
            hex: create_hextable(),
        }
    }
}
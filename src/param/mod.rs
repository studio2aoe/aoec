/* trait `Param`
    trait `Param` is interface for Mutable Paramter.
    It clocks periodically and in/decreases param value
    for each clocks.

    The structs implimenting `Param` should have 4 properties.
    
    base: the base value of param which when you can change by command
    now: the current value of param changed from base by clocks
    delta: the amount increasing param value when the param clocks
    period: the period that the parameter clocks

    and should have following methods:
*/
pub trait Param<T: Clone> {
    // Clock and update `now` property
    fn clock(&mut self) -> bool;

    // Setters of each parameter
    fn reset_now(&mut self);
    fn set_base(&mut self, value: T);
    fn set_delta(&mut self, delta: T);
    fn set_period(&mut self, period: f32);
    
    // Getters of each parameter
    fn get_base(&self) -> T;
    fn get_now(&self) -> T;
    fn get_delta(&self) -> T;
    fn get_period(&self) -> f32;
}


// Following modules are the structs implimenting `Param`
mod freq;
// mod vol;
// mod pan;
// mod mute;
// mod wtype;
// mod wparam;

pub use freq::Frequency;
// pub use vol::Volume;
// pub use pan::Panning;
// pub use mute::Mute;
// pub use wtype::WaveformType;
// pub use wparam::WaveformParameter;

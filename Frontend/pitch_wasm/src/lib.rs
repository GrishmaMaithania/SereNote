use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn detect_pitch(samples: &[f32], sample_rate: f32) -> f32 {
    let mut max_corr = 0.0;
    let mut pitch = 0.0;
    let size = samples.len();

    for lag in 20..(sample_rate as usize / 50) {
        let mut sum = 0.0;
        for i in 0..(size - lag) {
            sum += samples[i] * samples[i + lag];
        }
        if sum > max_corr {
            max_corr = sum;
            pitch = sample_rate / lag as f32;
        }
    }
    pitch
}

/**
 * Web Audio API Sound Effects Synthesizer for ShopSphere
 * Creates crisp, zero-latency payment chimes and UI sound animations
 * without needing external MP3/WAV file downloads.
 */

class SoundEffectsService {
  constructor() {
    this.audioCtx = null;
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Plays the iconic melodic ascending chime (UPI Success / Payment Received)
   */
  playPaymentSuccessChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // Melodic UPI Success Chord Arpeggio (C5 -> E5 -> G5 -> C6)
      const notes = [
        { freq: 523.25, time: now + 0.0, duration: 0.18 }, // C5
        { freq: 659.25, time: now + 0.12, duration: 0.18 }, // E5
        { freq: 783.99, time: now + 0.24, duration: 0.22 }, // G5
        { freq: 1046.5, time: now + 0.38, duration: 0.65 }, // C6 (High Bell sustain)
      ];

      notes.forEach(({ freq, time, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle'; // Soft, warm bell-like chime
        osc.frequency.setValueAtTime(freq, time);

        // Exponential decay for realistic chime envelope
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(0.35, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + duration + 0.05);
      });
    } catch (e) {
      console.warn('[SoundEffects] AudioContext error:', e);
    }
  }

  /**
   * Subtle soft click on selecting a payment method or tab
   */
  playSelectClick() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      // AudioContext not allowed or disabled
    }
  }
}

export const soundEffects = new SoundEffectsService();

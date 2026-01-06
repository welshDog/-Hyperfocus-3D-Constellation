// Audio Context Setup
class AudioEngine {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        this.masterGain.gain.value = 0.3;

        this.ambientGain = this.audioContext.createGain();
        this.ambientGain.connect(this.masterGain);
        this.ambientGain.gain.value = 0.2;

        this.effectsGain = this.audioContext.createGain();
        this.effectsGain.connect(this.masterGain);
        this.effectsGain.gain.value = 0.4;

        this.enabled = true;
        this.setupControls();
    }

    setupControls() {
        const ambientVolume = document.getElementById('ambient-volume');
        const effectsVolume = document.getElementById('effects-volume');
        const audioEnabled = document.getElementById('audio-enabled');

        if (ambientVolume) {
            ambientVolume.addEventListener('input', (e) => {
                this.ambientGain.gain.value = (e.target.value / 100) * 0.2;
                document.getElementById('ambient-value').textContent = e.target.value;
            });
        }

        if (effectsVolume) {
            effectsVolume.addEventListener('input', (e) => {
                this.effectsGain.gain.value = (e.target.value / 100) * 0.4;
                document.getElementById('effects-value').textContent = e.target.value;
            });
        }

        if (audioEnabled) {
            audioEnabled.addEventListener('change', (e) => {
                this.enabled = e.target.checked;
                if (this.enabled) {
                    this.masterGain.gain.value = 0.3;
                } else {
                    this.masterGain.gain.value = 0;
                }
            });
        }
    }

    // Whoosh Effect - Sweeping upward sound
    whoosh() {
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;
        const duration = 0.3;

        // Create oscillator for main whoosh
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.effectsGain);

        // Frequency sweep (low to high)
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + duration * 0.7);
        osc.frequency.exponentialRampToValueAtTime(300, now + duration);

        // Amplitude envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + duration * 0.2);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        // Filter sweep
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.linearRampToValueAtTime(4000, now + duration);

        osc.start(now);
        osc.stop(now + duration);

        // Noise component
        this.addNoiseLayer(now, duration, 0.2);
    }

    // Click Effect - Satisfying interface click
    click(pitch = 1) {
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;
        const duration = 0.08;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.effectsGain);

        // Pitch-based frequency
        const baseFreq = 800 * pitch;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.6, now + duration);

        // Sharp attack, quick decay
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.01);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        filter.type = 'highpass';
        filter.frequency.value = 2000;

        osc.start(now);
        osc.stop(now + duration);
    }

    // Glitch Effect - Bit-crushed digital sound
    glitch(intensity = 0.5) {
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;
        const duration = 0.15;
        const numGlitches = Math.floor(3 + intensity * 4);

        for (let i = 0; i < numGlitches; i++) {
            const glitchStart = now + (i / numGlitches) * duration;
            const glitchDuration = 0.02 + Math.random() * 0.03;

            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.effectsGain);

            // Random frequencies for glitch effect
            osc.frequency.value = 100 + Math.random() * 800;
            filter.type = 'highpass';
            filter.frequency.value = 1000 + Math.random() * 3000;

            gain.gain.setValueAtTime(0, glitchStart);
            gain.gain.linearRampToValueAtTime(0.3 * intensity, glitchStart + 0.005);
            gain.gain.linearRampToValueAtTime(0, glitchStart + glitchDuration);

            osc.start(glitchStart);
            osc.stop(glitchStart + glitchDuration);
        }
    }

    // Notification Sound - Ascending beep
    notification() {
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;
        const noteDuration = 0.1;
        const delayBetweenNotes = 0.05;

        // Three ascending notes
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

        notes.forEach((frequency, index) => {
            const noteStart = now + index * delayBetweenNotes;

            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.effectsGain);

            osc.frequency.value = frequency;

            gain.gain.setValueAtTime(0, noteStart);
            gain.gain.linearRampToValueAtTime(0.3, noteStart + 0.01);
            gain.gain.linearRampToValueAtTime(0, noteStart + noteDuration);

            osc.start(noteStart);
            osc.stop(noteStart + noteDuration);
        });
    }

    // Success Sound - Positive flourish
    success() {
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;
        const duration = 0.3;

        // Create a pleasant chord (major triad)
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

        notes.forEach((frequency, index) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.connect(gain);
            gain.connect(this.effectsGain);

            osc.frequency.value = frequency;

            // Staggered attack
            const stagger = index * 0.03;
            gain.gain.setValueAtTime(0, now + stagger);
            gain.gain.linearRampToValueAtTime(0.2, now + stagger + 0.02);
            gain.gain.linearRampToValueAtTime(0, now + duration);

            osc.start(now + stagger);
            osc.stop(now + duration);
        });
    }

    // Error Sound - Warning buzz
    error() {
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;
        const duration = 0.2;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.effectsGain);

        // Lower frequency for warning
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(150, now + duration);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.01);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        osc.start(now);
        osc.stop(now + duration);
    }

    // Ambient Drone - Subtle background music
    startAmbientDrone() {
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;

        // Create a subtle chord that loops
        const baseFrequencies = [110, 220, 330]; // A2, A3, A4

        baseFrequencies.forEach((frequency) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const lfo = this.audioContext.createOscillator();

            osc.connect(gain);
            lfo.connect(gain.gain);
            gain.connect(this.ambientGain);

            osc.frequency.value = frequency;
            osc.type = 'sine';

            // Modulate volume with LFO
            lfo.frequency.value = 0.5 + Math.random() * 0.3;
            gain.gain.value = 0.1;

            osc.start();
            lfo.start();
        });
    }

    // Noise layer helper
    addNoiseLayer(startTime, duration, intensity) {
        const bufferSize = this.audioContext.sampleRate * duration;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const noiseSource = this.audioContext.createBufferSource();
        const noiseGain = this.audioContext.createGain();
        const noiseFilter = this.audioContext.createBiquadFilter();

        noiseSource.buffer = noiseBuffer;
        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.effectsGain);

        // Filter settings
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 3000;

        // Amplitude envelope for noise
        noiseGain.gain.setValueAtTime(0, startTime);
        noiseGain.gain.linearRampToValueAtTime(intensity * 0.2, startTime + duration * 0.2);
        noiseGain.gain.linearRampToValueAtTime(0, startTime + duration);

        noiseSource.start(startTime);
        noiseSource.stop(startTime + duration);
    }

    // Particle selection sweep
    selectParticle(pitch = 1) {
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;
        const duration = 0.25;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.effectsGain);

        const startFreq = 400 * pitch;
        const endFreq = 600 * pitch;

        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.linearRampToValueAtTime(endFreq, now + duration);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        osc.start(now);
        osc.stop(now + duration);
    }

    // Language filter sweep
    filterSweep(language) {
        if (!this.enabled) return;

        // Different pitches for different languages
        const pitchMap = {
            'Python': 1.2,
            'JavaScript': 1.0,
            'TypeScript': 0.9,
            'Rust': 1.3,
            'Go': 0.8,
            'default': 1.0,
        };

        const pitch = pitchMap[language] || pitchMap['default'];
        this.click(pitch);
    }

    // Zoom in/out sound
    zoom(direction = 'in') {
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;
        const duration = 0.15;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.effectsGain);

        if (direction === 'in') {
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(1000, now + duration);
        } else {
            osc.frequency.setValueAtTime(1000, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + duration);
        }

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        filter.type = 'highpass';
        filter.frequency.value = 500;

        osc.start(now);
        osc.stop(now + duration);
    }
}

// Global audio engine instance
const audioEngine = new AudioEngine();

// Resume audio context on user interaction
document.addEventListener('click', () => {
    if (audioEngine.audioContext.state === 'suspended') {
        audioEngine.audioContext.resume();
    }
});

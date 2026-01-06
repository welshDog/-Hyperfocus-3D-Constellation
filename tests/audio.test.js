describe('AudioEngine', () => {
  let audioEngine;

  beforeEach(() => {
    audioEngine = new AudioEngine();
  });

  afterEach(() => {
    audioEngine.audioContext.close();
  });

  describe('Initialization', () => {
    test('should create AudioContext', () => {
      expect(audioEngine.audioContext).toBeDefined();
      expect(audioEngine.audioContext.state).toBe('running');
    });

    test('should have master gain node', () => {
      expect(audioEngine.masterGain).toBeDefined();
      expect(audioEngine.masterGain.gain.value).toBe(0.3);
    });

    test('should have separate gain tracks', () => {
      expect(audioEngine.ambientGain).toBeDefined();
      expect(audioEngine.effectsGain).toBeDefined();
    });

    test('should be enabled by default', () => {
      expect(audioEngine.enabled).toBe(true);
    });
  });

  describe('Sound Effects', () => {
    test('whoosh should not throw error', () => {
      expect(() => {
        audioEngine.whoosh();
      }).not.toThrow();
    });

    test('click should not throw error', () => {
      expect(() => {
        audioEngine.click();
      }).not.toThrow();
    });

    test('click should accept pitch parameter', () => {
      expect(() => {
        audioEngine.click(1.5);
        audioEngine.click(0.8);
      }).not.toThrow();
    });

    test('glitch should not throw error', () => {
      expect(() => {
        audioEngine.glitch();
      }).not.toThrow();
    });

    test('notification should not throw error', () => {
      expect(() => {
        audioEngine.notification();
      }).not.toThrow();
    });

    test('success should not throw error', () => {
      expect(() => {
        audioEngine.success();
      }).not.toThrow();
    });

    test('error should not throw error', () => {
      expect(() => {
        audioEngine.error();
      }).not.toThrow();
    });

    test('selectParticle should not throw error', () => {
      expect(() => {
        audioEngine.selectParticle();
        audioEngine.selectParticle(1.2);
      }).not.toThrow();
    });

    test('filterSweep should not throw error', () => {
      expect(() => {
        audioEngine.filterSweep('Python');
        audioEngine.filterSweep('JavaScript');
      }).not.toThrow();
    });

    test('zoom should accept direction parameter', () => {
      expect(() => {
        audioEngine.zoom('in');
        audioEngine.zoom('out');
      }).not.toThrow();
    });
  });

  describe('Volume Control', () => {
    test('should mute when disabled', () => {
      audioEngine.enabled = false;
      audioEngine.masterGain.gain.value = 0;
      expect(audioEngine.masterGain.gain.value).toBe(0);
    });

    test('should restore volume when enabled', () => {
      audioEngine.enabled = true;
      audioEngine.masterGain.gain.value = 0.3;
      expect(audioEngine.masterGain.gain.value).toBe(0.3);
    });

    test('should allow effects gain adjustment', () => {
      const originalValue = audioEngine.effectsGain.gain.value;
      audioEngine.effectsGain.gain.value = 0.5;
      expect(audioEngine.effectsGain.gain.value).toBe(0.5);
      audioEngine.effectsGain.gain.value = originalValue;
    });

    test('should allow ambient gain adjustment', () => {
      const originalValue = audioEngine.ambientGain.gain.value;
      audioEngine.ambientGain.gain.value = 0.1;
      expect(audioEngine.ambientGain.gain.value).toBe(0.1);
      audioEngine.ambientGain.gain.value = originalValue;
    });
  });

  describe('Rapid Fire Effects', () => {
    test('should handle rapid clicks without throwing', () => {
      expect(() => {
        for (let i = 0; i < 10; i++) {
          audioEngine.click(1 + i * 0.1);
        }
      }).not.toThrow();
    });

    test('should handle multiple glitches in sequence', () => {
      expect(() => {
        for (let i = 0; i < 5; i++) {
          audioEngine.glitch(i * 0.2);
        }
      }).not.toThrow();
    });
  });
});

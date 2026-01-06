import { repositories } from './data.js';

export class UIManager {
  constructor(callbacks = {}) {
    this.callbacks = callbacks;
    this.audioContext = null;
    this.ambientSound = null;
    this.ambientGain = null;
    this.audioEnabled = false;
    this.ambientVolume = 0.5;
    this.effectsVolume = 0.3;
    this.achievements = new Set();
    
    // Initialize
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        if (this.callbacks.onSearch) {
          this.callbacks.onSearch(e.target.value);
        }
      });
    }

    // Voice search
    const voiceBtn = document.getElementById('voice-search-btn');
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        this.startVoiceSearch();
      });
    }

    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        if (this.callbacks.onFilter) {
          this.callbacks.onFilter(category);
        }
        
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
      });
    });

    // Accessibility controls
    this.setupAccessibilityControl('motion-reduction', (checked) => {
        if (this.callbacks.onMotionToggle) this.callbacks.onMotionToggle(checked);
        document.body.classList.toggle('motion-reduced', checked);
    });

    this.setupAccessibilityControl('focus-mode', (checked) => {
        if (this.callbacks.onFocusToggle) this.callbacks.onFocusToggle(checked);
        document.body.classList.toggle('focus-mode', checked);
    });

    this.setupAccessibilityControl('high-contrast', (checked) => {
        if (this.callbacks.onContrastToggle) this.callbacks.onContrastToggle(checked);
        document.body.classList.toggle('high-contrast-mode', checked);
    });

    this.setupAccessibilityControl('audio-enabled', (checked) => {
        this.toggleAudio(checked);
    });

    // Volume controls
    const ambientSlider = document.getElementById('ambient-volume');
    if (ambientSlider) {
      ambientSlider.addEventListener('input', (e) => {
        this.ambientVolume = e.target.value / 100;
        document.getElementById('ambient-value').textContent = e.target.value;
        this.updateAudioVolume();
      });
    }

    const effectsSlider = document.getElementById('effects-volume');
    if (effectsSlider) {
      effectsSlider.addEventListener('input', (e) => {
        this.effectsVolume = e.target.value / 100;
        document.getElementById('effects-value').textContent = e.target.value;
      });
    }

    // Tour and controls
    this.setupClick('start-tour', () => this.callbacks.onTourStart && this.callbacks.onTourStart());
    this.setupClick('export-view', () => this.callbacks.onExport && this.callbacks.onExport());
    this.setupClick('reset-view', () => this.callbacks.onReset && this.callbacks.onReset());
    this.setupClick('close-info', () => this.hideRepoInfo());
    this.setupClick('bookmark-btn', () => this.callbacks.onBookmarkToggle && this.callbacks.onBookmarkToggle());
    this.setupClick('share-btn', () => this.shareCurrentView());
    this.setupClick('toggle-bookmarks', () => this.toggleBookmarksPanel());

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      this.handleKeyboard(event);
    });
  }

  setupAccessibilityControl(id, handler) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', (e) => handler(e.target.checked));
    }
  }

  setupClick(id, handler) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', handler);
    }
  }

  handleKeyboard(event) {
    switch (event.code) {
      case 'Space':
        event.preventDefault();
        if (this.callbacks.onReset) this.callbacks.onReset();
        break;
      case 'KeyF':
        if (event.ctrlKey) {
          event.preventDefault();
          document.getElementById('search-input').focus();
        }
        break;
      case 'Escape':
        this.hideRepoInfo();
        break;
      case 'KeyT':
        if (this.callbacks.onTourStart) this.callbacks.onTourStart();
        break;
    }
  }

  startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    const voiceBtn = document.getElementById('voice-search-btn');
    voiceBtn.classList.add('listening');
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('search-input').value = transcript;
      if (this.callbacks.onSearch) this.callbacks.onSearch(transcript);
    };
    
    recognition.onend = () => {
      voiceBtn.classList.remove('listening');
    };
    
    recognition.start();
  }

  toggleAudio(enabled) {
    this.audioEnabled = enabled;
    
    if (enabled && !this.audioContext) {
      this.initializeAudio();
    }
    
    if (this.ambientSound) { // ambientSound isn't defined as a property yet, let's fix in initializeAudio
       // Wait, I didn't store ambientSound reference in the original code properly?
       // Original code: ambientSound = null; ... ambientSound was not assigned in createAmbientSound?
       // Ah, createAmbientSound created oscillators but didn't assign to ambientSound variable.
       // The toggleAudio logic in original code checked 'ambientSound', but it was likely broken or I missed where it was assigned.
       // Looking at original code: `let ambientSound = null;` ... `createAmbientSound` creates oscillators but doesn't set `ambientSound`.
       // It sets `this.ambientGain`.
       // I'll assume the intention was to suspend/resume context or gain.
    }
    
    if (this.audioContext) {
        if (enabled) {
            this.audioContext.resume();
            if (this.ambientGain) this.ambientGain.gain.setTargetAtTime(this.ambientVolume * 0.1, this.audioContext.currentTime, 0.1);
        } else {
            if (this.ambientGain) this.ambientGain.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.1);
             // or this.audioContext.suspend();
        }
    }
  }

  initializeAudio() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.createAmbientSound();
  }

  createAmbientSound() {
    const oscillator1 = this.audioContext.createOscillator();
    const oscillator2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(40, this.audioContext.currentTime);
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(80, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(this.ambientVolume * 0.1, this.audioContext.currentTime);
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator1.start();
    oscillator2.start();
    
    this.ambientGain = gainNode;
  }

  updateAudioVolume() {
    if (this.ambientGain && this.audioContext) {
      this.ambientGain.gain.setValueAtTime(this.ambientVolume * 0.1, this.audioContext.currentTime);
    }
  }

  playClickSound() {
    if (!this.audioEnabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(this.effectsVolume * 0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  playAchievementSound() {
    if (!this.audioEnabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(this.effectsVolume * 0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  showRepoInfo(repo, isBookmarked) {
    console.log('Showing info for:', repo.name);
    const panel = document.getElementById('repo-info-panel');
    
    document.getElementById('repo-name').textContent = repo.name;
    document.getElementById('repo-category').textContent = repo.category;
    document.getElementById('repo-language').textContent = repo.language;
    document.getElementById('repo-stars').textContent = `⭐ ${repo.stars}`;
    document.getElementById('repo-description').textContent = repo.description;
    document.getElementById('repo-updated').textContent = `Updated: ${repo.updated}`;
    
    const statusEl = document.getElementById('repo-status');
    statusEl.textContent = repo.status;
    statusEl.className = `status status--${repo.status === 'active' ? 'success' : repo.status === 'development' ? 'warning' : 'info'}`;
    
    const githubLink = document.getElementById('repo-github-link');
    githubLink.href = repo.githubUrl;
    
    // Update bookmark button
    this.updateBookmarkButton(isBookmarked);
    
    panel.classList.remove('hidden');
  }

  updateBookmarkButton(isBookmarked) {
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const bookmarkIcon = document.getElementById('bookmark-icon');
    if (isBookmarked) {
      bookmarkIcon.textContent = '📌';
      bookmarkBtn.querySelector('span').innerHTML = '📌 Bookmarked';
    } else {
      bookmarkIcon.textContent = '🔖';
      bookmarkBtn.querySelector('span').innerHTML = '🔖 Bookmark';
    }
  }

  hideRepoInfo() {
    document.getElementById('repo-info-panel').classList.add('hidden');
    if (this.callbacks.onCloseInfo) this.callbacks.onCloseInfo();
  }

  updateCategoryCounts(counts) {
    document.getElementById('count-all').textContent = counts.all;
    document.getElementById('count-core').textContent = counts['Core Empire'];
    document.getElementById('count-creative').textContent = counts['Creative'];
    document.getElementById('count-devtools').textContent = counts['Dev Tools'];
    document.getElementById('count-social').textContent = counts['Social'];
  }

  startLoadingSequence() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingStatus = document.getElementById('loading-status');
    
    const steps = [
      'Initializing 3D engine...',
      'Creating stellar particles...',
      'Mapping repository positions...',
      'Generating particle systems...',
      'Calibrating orbital mechanics...',
      'Activating constellation links...',
      'Ready for hyperfocus!'
    ];
    
    let currentStep = 0;
    
    const updateLoading = () => {
      if (currentStep < steps.length) {
        loadingStatus.textContent = steps[currentStep];
        loadingBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
        currentStep++;
        
        setTimeout(updateLoading, 500);
      } else {
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          this.triggerAchievement('Space Explorer', 'Welcome to the constellation!');
        }, 500);
      }
    };
    
    updateLoading();
  }

  triggerAchievement(title, description) {
    if (this.achievements.has(title)) return;
    
    this.achievements.add(title);
    
    const notification = document.getElementById('achievement-notification');
    const text = document.getElementById('achievement-text');
    
    text.textContent = `${title}: ${description}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
    
    this.playAchievementSound();
  }

  shareCurrentView() {
    const url = window.location.href;
    const text = 'Check out this amazing 3D repository constellation!';
    
    if (navigator.share) {
      navigator.share({
        title: 'Hyperfocus Constellation',
        text: text,
        url: url
      });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        this.triggerAchievement('Sharer', 'Link copied to clipboard!');
      });
    }
  }

  toggleBookmarksPanel() {
    const panel = document.getElementById('bookmarks-panel');
    panel.classList.toggle('hidden');
  }

  updateBookmarksList(bookmarkedRepos, allRepos) {
    const bookmarksList = document.getElementById('bookmarks-list');
    bookmarksList.innerHTML = '';
    
    bookmarkedRepos.forEach(repoName => {
      const repo = allRepos.find(r => r.name === repoName);
      if (!repo) return;
      
      const item = document.createElement('div');
      item.className = 'bookmark-item';
      item.innerHTML = `
        <span class="bookmark-name" title="${repo.name}">${repo.name}</span>
        <button class="remove-bookmark" data-repo="${repoName}">×</button>
      `;
      
      item.querySelector('.bookmark-name').addEventListener('click', () => {
        if (this.callbacks.onBookmarkClick) this.callbacks.onBookmarkClick(repoName);
      });
      
      item.querySelector('.remove-bookmark').addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.callbacks.onBookmarkRemove) this.callbacks.onBookmarkRemove(repoName);
      });
      
      bookmarksList.appendChild(item);
    });
  }
}

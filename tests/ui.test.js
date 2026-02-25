import { jest } from '@jest/globals';
import { UIManager, initializeDraggablePanels } from '../ui.js';

const createBaseDom = () => {
  document.body.innerHTML = `
    <input id="search-input" />
    <button id="voice-search-btn"></button>
    <button class="filter-btn" data-category="all"></button>
    <button class="filter-btn" data-category="Creative"></button>
    <input type="checkbox" id="motion-reduction" />
    <input type="checkbox" id="focus-mode" />
    <input type="checkbox" id="high-contrast" />
    <input type="checkbox" id="audio-enabled" />
    <input id="ambient-volume" type="range" value="50" />
    <input id="effects-volume" type="range" value="30" />
    <button id="start-tour"></button>
    <button id="export-view"></button>
    <button id="reset-view"></button>
    <button id="close-info"></button>
    <button id="bookmark-btn"><span></span></button>
    <button id="share-btn"></button>
    <button id="toggle-bookmarks"></button>
    <div id="bookmarks-panel" class="hidden"></div>
    <div id="bookmarks-list"></div>
    <div id="info-panel" class="hidden"></div>
    <div id="repo-name"></div>
    <div id="repo-language"></div>
    <div id="repo-stars"></div>
    <div id="repo-description"></div>
    <div id="repo-updated"></div>
    <div id="repo-status"></div>
    <a id="repo-link"></a>
    <span id="count-all"></span>
    <span id="count-core"></span>
    <span id="count-creative"></span>
    <span id="count-devtools"></span>
    <span id="count-social"></span>
    <div id="achievement-notification" class="hidden"></div>
    <div id="achievement-text"></div>
    <div id="loading-screen"></div>
    <div id="loading-bar"></div>
    <div id="loading-status"></div>
  `;
};

describe('UIManager', () => {
  beforeEach(() => {
    createBaseDom();
    window.AudioContext = class {
      constructor() {
        this.state = 'running';
        this.currentTime = 0;
        this.destination = {};
      }
      createOscillator() {
        return {
          connect: jest.fn(),
          start: jest.fn(),
          stop: jest.fn(),
          frequency: {
            setValueAtTime: jest.fn(),
            exponentialRampToValueAtTime: jest.fn(),
          },
          type: 'sine',
        };
      }
      createGain() {
        return {
          connect: jest.fn(),
          gain: {
            value: 0,
            setValueAtTime: jest.fn(),
            setTargetAtTime: jest.fn(),
            linearRampToValueAtTime: jest.fn(),
            exponentialRampToValueAtTime: jest.fn(),
          },
        };
      }
      resume() {
        return Promise.resolve();
      }
    };
    navigator.share = jest.fn(() => Promise.resolve());
    navigator.clipboard = { writeText: jest.fn(() => Promise.resolve()) };
    window.SpeechRecognition = class {
      constructor() {
        window.__lastRecognition = this;
      }
      start() {}
    };
    window.alert = jest.fn();
  });

  test('search input triggers callback', () => {
    const onSearch = jest.fn();
    new UIManager({ onSearch });
    const searchInput = document.getElementById('search-input');
    searchInput.value = 'Hyper';
    searchInput.dispatchEvent(new Event('input'));
    expect(onSearch).toHaveBeenCalledWith('Hyper');
  });

  test('filter buttons toggle active class', () => {
    new UIManager({});
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons[1].click();
    expect(filterButtons[1].classList.contains('active')).toBe(true);
  });

  test('motion reduction toggles body class', () => {
    new UIManager({});
    const toggle = document.getElementById('motion-reduction');
    toggle.checked = true;
    toggle.dispatchEvent(new Event('change'));
    expect(document.body.classList.contains('motion-reduced')).toBe(true);
  });

  test('showRepoInfo updates UI content', () => {
    const ui = new UIManager({});
    const repo = {
      name: 'Test Repo',
      language: 'JavaScript',
      stars: 3,
      description: 'Example repo',
      updated: 'today',
      status: 'Active',
      githubUrl: 'https://github.com/example',
    };
    ui.showRepoInfo(repo, false);
    expect(document.getElementById('repo-name').textContent).toBe('Test Repo');
    expect(document.getElementById('repo-language').textContent).toBe('JavaScript');
    expect(document.getElementById('repo-stars').textContent).toBe('3');
    expect(document.getElementById('repo-description').textContent).toBe('Example repo');
    expect(document.getElementById('repo-updated').textContent).toBe('today');
    expect(document.getElementById('repo-link').href).toBe('https://github.com/example');
  });

  test('updateBookmarksList renders items and triggers callback', () => {
    const onBookmarkClick = jest.fn();
    const onBookmarkRemove = jest.fn();
    const ui = new UIManager({ onBookmarkClick, onBookmarkRemove });
    const bookmarkedRepos = new Set(['Demo']);
    const allRepos = [{ name: 'Demo' }];
    ui.updateBookmarksList(bookmarkedRepos, allRepos);
    const item = document.querySelector('.bookmark-item .bookmark-name');
    const remove = document.querySelector('.bookmark-item .remove-bookmark');
    item.click();
    remove.click();
    expect(onBookmarkClick).toHaveBeenCalledWith('Demo');
    expect(onBookmarkRemove).toHaveBeenCalledWith('Demo');
  });

  test('toggleAudio initializes context and updates gain', () => {
    const ui = new UIManager({});
    const audioToggle = document.getElementById('audio-enabled');
    audioToggle.checked = true;
    audioToggle.dispatchEvent(new Event('change'));
    expect(ui.audioContext).toBeTruthy();
    ui.toggleAudio(false);
    expect(ui.ambientGain.gain.setTargetAtTime).toHaveBeenCalled();
  });

  test('startLoadingSequence completes and triggers achievement', () => {
    jest.useFakeTimers();
    const ui = new UIManager({});
    ui.startLoadingSequence();
    jest.runAllTimers();
    const loadingScreen = document.getElementById('loading-screen');
    expect(loadingScreen.classList.contains('hidden')).toBe(true);
    jest.useRealTimers();
  });

  test('shareCurrentView uses navigator share', async () => {
    const ui = new UIManager({});
    await ui.shareCurrentView();
    expect(navigator.share).toHaveBeenCalled();
  });

  test('updateCategoryCounts sets counts', () => {
    const ui = new UIManager({});
    const counts = { all: 10, 'Core Empire': 2, Creative: 3, 'Dev Tools': 4, Social: 1 };
    ui.updateCategoryCounts(counts);
    expect(document.getElementById('count-all').textContent).toBe('10');
    expect(document.getElementById('count-core').textContent).toBe('2');
    expect(document.getElementById('count-creative').textContent).toBe('3');
    expect(document.getElementById('count-devtools').textContent).toBe('4');
    expect(document.getElementById('count-social').textContent).toBe('1');
  });

  test('toggleBookmarksPanel toggles hidden class', () => {
    const ui = new UIManager({});
    const panel = document.getElementById('bookmarks-panel');
    ui.toggleBookmarksPanel();
    expect(panel.classList.contains('hidden')).toBe(false);
    ui.toggleBookmarksPanel();
    expect(panel.classList.contains('hidden')).toBe(true);
  });

  test('keyboard handler triggers reset', () => {
    const onReset = jest.fn();
    new UIManager({ onReset });
    const evt = new KeyboardEvent('keydown', { code: 'Space' });
    document.dispatchEvent(evt);
    expect(onReset).toHaveBeenCalled();
  });

  test('keyboard handler focuses search and hides info', () => {
    const ui = new UIManager({});
    const input = document.getElementById('search-input');
    const focusSpy = jest.spyOn(input, 'focus');
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF', ctrlKey: true }));
    expect(focusSpy).toHaveBeenCalled();
    ui.showRepoInfo({
      name: 'Info Repo',
      language: 'JavaScript',
      stars: 1,
      description: 'Info',
      updated: 'now',
      status: 'Active',
      githubUrl: '#',
    }, false);
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    expect(document.getElementById('info-panel').classList.contains('hidden')).toBe(true);
  });

  test('keyboard handler starts tour', () => {
    const onTourStart = jest.fn();
    new UIManager({ onTourStart });
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyT' }));
    expect(onTourStart).toHaveBeenCalled();
  });

  test('voice search writes transcript', () => {
    const onSearch = jest.fn();
    new UIManager({ onSearch });
    document.getElementById('voice-search-btn').click();
    window.__lastRecognition.onresult({ results: [[{ transcript: 'Voice Query' }]] });
    expect(document.getElementById('search-input').value).toBe('Voice Query');
    expect(onSearch).toHaveBeenCalledWith('Voice Query');
  });

  test('shareCurrentView falls back to clipboard', async () => {
    navigator.share = undefined;
    const ui = new UIManager({});
    await ui.shareCurrentView();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test('triggerAchievement shows notification', () => {
    const ui = new UIManager({});
    jest.useFakeTimers();
    ui.triggerAchievement('Win', 'Nice');
    const notification = document.getElementById('achievement-notification');
    expect(notification.classList.contains('hidden')).toBe(false);
    jest.runAllTimers();
    expect(notification.classList.contains('hidden')).toBe(true);
    jest.useRealTimers();
  });

  test('hideRepoInfo triggers close callback', () => {
    const onCloseInfo = jest.fn();
    const ui = new UIManager({ onCloseInfo });
    ui.hideRepoInfo();
    expect(onCloseInfo).toHaveBeenCalled();
  });

  test('updateBookmarkButton toggles label', () => {
    const ui = new UIManager({});
    ui.updateBookmarkButton(true);
    expect(document.querySelector('#bookmark-btn span').innerHTML).toContain('Bookmarked');
    ui.updateBookmarkButton(false);
    expect(document.querySelector('#bookmark-btn span').innerHTML).toContain('Bookmark');
  });

  test('playClickSound and playAchievementSound run when enabled', () => {
    const ui = new UIManager({});
    ui.toggleAudio(true);
    ui.playClickSound();
    ui.playAchievementSound();
    expect(ui.audioContext).toBeTruthy();
  });

  test('updateBookmarksList handles missing repo', () => {
    const ui = new UIManager({});
    ui.updateBookmarksList(new Set(['Missing']), []);
    expect(document.querySelectorAll('.bookmark-item').length).toBe(0);
  });

  test('startVoiceSearch handles unsupported browser', () => {
    delete window.SpeechRecognition;
    delete window.webkitSpeechRecognition;
    const ui = new UIManager({});
    ui.startVoiceSearch();
    expect(window.alert).toHaveBeenCalled();
  });

  test('initializeDraggablePanels applies dragging behavior', () => {
    const panel = document.createElement('div');
    panel.className = 'glass-panel';
    const header = document.createElement('h3');
    header.textContent = 'Panel';
    panel.appendChild(header);
    document.body.appendChild(panel);
    initializeDraggablePanels();
    header.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 10, bubbles: true }));
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 20 }));
    window.dispatchEvent(new MouseEvent('mouseup'));
    expect(panel.style.position).toBe('fixed');
  });
});

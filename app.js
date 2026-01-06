import { repositories } from './data.js';
import { GalaxyScene } from './scene.js';

class ConstellationApp {
  constructor() {
    this.bookmarkedRepos = new Set();
    this.ui = null;
    
    // Initialize Galaxy Scene
    this.scene = new GalaxyScene('galaxy-canvas', {
      onSelect: (repo) => {
        if (this.ui) {
          this.ui.showRepoInfo(repo, this.bookmarkedRepos.has(repo.name));
          this.ui.playClickSound();
          this.ui.triggerAchievement('Repository Explorer', `Visited ${repo.name}`);
        }
      },
      onDeselect: () => {
        if (this.ui) this.ui.hideRepoInfo();
      }
    });
    
    // Lazy Initialize UI
    this.initUI();
  }

  async initUI() {
    // Yield to main thread to prioritize scene rendering
    if ('requestIdleCallback' in window) {
      await new Promise(r => requestIdleCallback(r));
    } else {
      await new Promise(r => setTimeout(r, 100));
    }

    const { UIManager, initializeDraggablePanels } = await import('./ui.js');

    this.ui = new UIManager({
      onSearch: (query) => this.handleSearch(query),
      onFilter: (category) => this.handleFilter(category),
      onMotionToggle: (enabled) => this.scene.setMotionReduced(enabled),
      onFocusToggle: (enabled) => console.log('Focus mode:', enabled),
      onContrastToggle: (enabled) => console.log('High contrast:', enabled),
      onTourStart: () => this.startTour(),
      onExport: () => this.exportView(),
      onReset: () => {
        this.scene.resetCamera();
        if (this.ui) this.ui.hideRepoInfo();
      },
      onBookmarkToggle: () => this.toggleBookmark(),
      onBookmarkClick: (repoName) => {
        this.scene.flyToRepository(repoName);
        const repo = repositories.find(r => r.name === repoName);
        if (repo && this.ui) this.ui.showRepoInfo(repo, true);
      },
      onBookmarkRemove: (repoName) => this.removeBookmark(repoName),
      onCloseInfo: () => {
        this.scene.selectedRepo = null;
      }
    });

    // Initial setup
    this.updateCounts();
    this.ui.startLoadingSequence();
    
    // Initialize draggable panels
    initializeDraggablePanels();
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.scene.showAllRepositories();
      return;
    }

    const matches = repositories.filter(repo => 
      repo.name.toLowerCase().includes(query.toLowerCase()) ||
      repo.description.toLowerCase().includes(query.toLowerCase()) ||
      repo.category.toLowerCase().includes(query.toLowerCase())
    );

    console.log('Search matches:', matches);
    this.scene.highlightRepositories(matches);
    
    if (matches.length === 1) {
      this.scene.flyToRepository(matches[0].name);
      this.ui.triggerAchievement('Precision Search', 'Found exact match!');
      this.ui.showRepoInfo(matches[0], this.bookmarkedRepos.has(matches[0].name));
    } else if (matches.length > 0) {
      this.ui.triggerAchievement('Explorer', `Found ${matches.length} matches!`);
    }
  }

  handleFilter(category) {
    this.scene.filterByCategory(category);
    this.ui.triggerAchievement('Category Explorer', `Filtered by ${category}`);
  }

  startTour() {
    const tourRepositories = repositories.filter(r => r.stars > 0);
    if (tourRepositories.length === 0) return;
    
    let tourIndex = 0;
    
    const nextTourStop = () => {
      if (tourIndex >= tourRepositories.length) {
        this.ui.triggerAchievement('Tour Guide', 'Completed guided tour!');
        this.scene.resetCamera();
        this.ui.hideRepoInfo();
        return;
      }
      
      const repo = tourRepositories[tourIndex];
      this.scene.flyToRepository(repo.name);
      this.ui.showRepoInfo(repo, this.bookmarkedRepos.has(repo.name));
      
      setTimeout(() => {
        tourIndex++;
        nextTourStop();
      }, 4000);
    };
    
    nextTourStop();
  }

  exportView() {
    this.scene.renderer.render(this.scene.scene, this.scene.camera);
    const dataURL = this.scene.renderer.domElement.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = 'hyperfocus-constellation.png';
    link.href = dataURL;
    link.click();
    
    this.ui.triggerAchievement('Photographer', 'Captured the constellation!');
  }

  toggleBookmark() {
    const selectedRepo = this.scene.selectedRepo;
    if (!selectedRepo) return;
    
    const repoName = selectedRepo.userData.repository.name;
    
    if (this.bookmarkedRepos.has(repoName)) {
      this.bookmarkedRepos.delete(repoName);
    } else {
      this.bookmarkedRepos.add(repoName);
      this.ui.triggerAchievement('Collector', 'Repository bookmarked!');
    }
    
    this.ui.updateBookmarksList(this.bookmarkedRepos, repositories);
    this.ui.updateBookmarkButton(this.bookmarkedRepos.has(repoName));
  }

  removeBookmark(repoName) {
    this.bookmarkedRepos.delete(repoName);
    this.ui.updateBookmarksList(this.bookmarkedRepos, repositories);
    
    // Update button if currently showing this repo
    const selectedRepo = this.scene.selectedRepo;
    if (selectedRepo && selectedRepo.userData.repository.name === repoName) {
      this.ui.updateBookmarkButton(false);
    }
  }

  updateCounts() {
    const counts = {
      all: repositories.length,
      'Core Empire': 0,
      'Creative': 0,
      'Dev Tools': 0,
      'Social': 0
    };
    
    repositories.forEach(repo => {
      counts[repo.category]++;
    });
    
    this.ui.updateCategoryCounts(counts);
  }
}

// Initialize the application
new ConstellationApp();

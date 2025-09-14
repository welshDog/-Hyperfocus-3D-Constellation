# 🛠️ API Documentation

**Developer guide for extending and customizing the Hyperfocus 3D Constellation**

---

## 📖 **Overview**

The Hyperfocus 3D Constellation provides a JavaScript API for:
- ✨ **Customizing the visual experience**
- 🔧 **Adding new repository data**
- 🎮 **Controlling camera and interactions** 
- ♿ **Enhancing accessibility features**
- 🎨 **Creating custom themes and effects**

---

## 🎯 **Quick Start**

### **Basic Usage**
```javascript
// Initialize the constellation
const constellation = new HyperConstellationEngine({
  container: '#galaxy-container',
  data: repositoryData,
  options: {
    neurodivergentMode: true,
    motionReduction: false,
    focusMode: false
  }
});

// Start the galaxy
constellation.init();
```

### **Adding Custom Repository**
```javascript
constellation.addRepository({
  name: "my-awesome-project",
  category: "Creative", 
  description: "An amazing neurodivergent-friendly tool",
  language: "JavaScript",
  stars: 42,
  githubUrl: "https://github.com/user/my-awesome-project",
  position: { x: 100, y: 50, z: 0 }
});
```

---

## 🏗️ **Core Classes**

### **HyperConstellationEngine**
*Main controller for the 3D constellation*

#### **Constructor Options**
```javascript
const options = {
  // Container
  container: '#galaxy-container',    // Required: DOM selector
  
  // Accessibility 
  neurodivergentMode: true,         // Enable ADHD-friendly features
  motionReduction: false,           // Reduce animations
  focusMode: false,                 // Dim non-active elements
  
  // Visual Settings
  particleCount: 1000,              // Particle system density
  bloomIntensity: 0.8,              // Glow effect strength
  cameraSpeed: 1.0,                 // Camera movement speed
  
  // Audio
  spatialAudio: true,               // Enable 3D positioned audio
  ambientVolume: 0.5,               // Background music volume
  effectsVolume: 0.3,               // Sound effects volume
  
  // Performance
  devicePixelRatio: window.devicePixelRatio, // Rendering quality
  antialias: true,                  // Smooth edges
  shadows: true,                    // Enable shadows
  
  // Data
  data: [],                         // Repository data array
  autoUpdate: true,                 // Auto-refresh GitHub data
  updateInterval: 300000            // Update every 5 minutes
};
```

#### **Core Methods**

##### **`.init()`**
*Initialize the 3D constellation*
```javascript
constellation.init()
  .then(() => console.log('Galaxy ready!'))
  .catch(error => console.error('Failed to initialize:', error));
```

##### **`.addRepository(repoData)`**
*Add a new repository to the constellation*
```javascript
constellation.addRepository({
  name: "repository-name",
  category: "Core Empire" | "Creative" | "Social" | "Dev Tools",
  description: "Repository description",
  language: "JavaScript",
  stars: 0,
  updated: "2025-09-14",
  status: "active" | "development" | "maintenance",
  githubUrl: "https://github.com/user/repo",
  position: { x: 0, y: 0, z: 0 }    // Optional: custom position
});
```

##### **`.removeRepository(name)`**
*Remove a repository from the constellation*
```javascript
constellation.removeRepository("repository-name");
```

##### **`.updateRepository(name, newData)`**
*Update repository data*
```javascript
constellation.updateRepository("repository-name", {
  stars: 100,
  description: "Updated description",
  status: "active"
});
```

##### **`.focusOnRepository(name)`**  
*Fly camera to specific repository*
```javascript
constellation.focusOnRepository("hyperfocus-constellation");
```

##### **`.searchRepositories(query)`**
*Search and filter repositories*
```javascript
const results = constellation.searchRepositories("javascript");
console.log(`Found ${results.length} matching repositories`);
```

##### **`.setAccessibilityMode(mode, enabled)`**
*Control accessibility features*
```javascript
// Enable focus mode
constellation.setAccessibilityMode('focus', true);

// Reduce motion
constellation.setAccessibilityMode('motion', false);

// High contrast mode
constellation.setAccessibilityMode('contrast', true);
```

---

## 🎨 **Visual Customization**

### **ThemeManager**
*Control visual themes and colors*

```javascript
const theme = constellation.themeManager;

// Apply built-in theme
theme.applyTheme('neurodivergent-dark');
theme.applyTheme('high-contrast');
theme.applyTheme('colorblind-friendly');

// Custom theme
theme.setCustomTheme({
  background: '#0a0a0f',
  particles: '#ffffff',
  categories: {
    'Core Empire': '#9333ea',
    'Creative': '#32b8c6', 
    'Social': '#ec4899',
    'Dev Tools': '#3b82f6'
  },
  glow: {
    intensity: 0.8,
    radius: 20
  }
});
```

### **EffectsController**
*Manage visual effects*

```javascript
const effects = constellation.effectsController;

// Particle effects
effects.setParticleCount(1500);
effects.setParticleSpeed(0.5);
effects.enableParticlePhysics(true);

// Bloom effects  
effects.setBloomIntensity(1.2);
effects.setBloomRadius(0.8);

// Camera effects
effects.enableDepthOfField(true);
effects.setFocusDistance(10);
```

---

## 🎮 **Camera & Navigation**

### **CameraController**
*Control camera movement and interactions*

```javascript
const camera = constellation.cameraController;

// Camera position
camera.setPosition({ x: 0, y: 0, z: 100 });
camera.lookAt({ x: 0, y: 0, z: 0 });

// Camera animation
camera.flyTo({
  position: { x: 50, y: 30, z: 80 },
  target: { x: 25, y: 15, z: 0 },
  duration: 2000,
  easing: 'easeInOutQuad'
});

// Orbit controls
camera.enableOrbitControls(true);
camera.setOrbitSpeed(1.0);
camera.setZoomLimits({ min: 10, max: 500 });

// Camera events
camera.on('move', (position, target) => {
  console.log('Camera moved:', position, target);
});
```

---

## 🔊 **Audio Integration**

### **AudioManager**
*3D spatial audio and sound effects*

```javascript
const audio = constellation.audioManager;

// Background music
audio.setAmbientTrack('space-ambient.mp3');
audio.setAmbientVolume(0.5);

// Sound effects
audio.playSpatialEffect('repo-click.mp3', { x: 10, y: 5, z: 0 });
audio.setEffectsVolume(0.3);

// Binaural beats for focus
audio.enableBinauralBeats(true);
audio.setBinauralFrequency(40); // 40Hz for focus

// Audio events
audio.on('trackStart', (trackName) => {
  console.log('Audio started:', trackName);
});
```

---

## 📊 **Data Management**

### **DataController**  
*Handle repository data and GitHub integration*

```javascript
const data = constellation.dataController;

// GitHub API integration
data.connectGitHubAPI({
  token: 'your-github-token',
  username: 'welshDog',
  autoUpdate: true,
  updateInterval: 300000 // 5 minutes
});

// Custom data sources
data.addDataSource('custom-api', {
  url: 'https://api.example.com/repos',
  transformer: (rawData) => {
    return rawData.map(repo => ({
      name: repo.name,
      category: repo.tags[0],
      description: repo.description,
      // ... transform to constellation format
    }));
  }
});

// Data events
data.on('update', (newRepositories) => {
  console.log(`Updated ${newRepositories.length} repositories`);
});

data.on('error', (error) => {
  console.error('Data update failed:', error);
});
```

---

## ♿ **Accessibility API**

### **AccessibilityManager**
*Neurodivergent-friendly features and WCAG compliance*

```javascript
const a11y = constellation.accessibilityManager;

// ADHD-specific features
a11y.enableHyperfocusMode(true);
a11y.setDistractionsLevel('minimal'); // minimal, moderate, full

// Autism-friendly features  
a11y.enablePredictableAnimations(true);
a11y.setSensoryReduction(0.7); // 0-1 scale

// Dyslexia support
a11y.setReadingSupport({
  fontFamily: 'OpenDyslexic',
  lineSpacing: 1.5,
  letterSpacing: 0.1
});

// Screen reader integration
a11y.announceRepositoryChange((repo) => {
  return `Focused on ${repo.name}, ${repo.category} repository with ${repo.stars} stars`;
});

// Keyboard navigation
a11y.setKeyboardShortcuts({
  'f': () => constellation.toggleFocusMode(),
  'r': () => constellation.toggleMotionReduction(),
  'h': () => constellation.showHelp(),
  'Escape': () => constellation.exitCurrentMode()
});
```

---

## 🎪 **Event System**

### **Available Events**
*Listen for constellation events*

```javascript
// Repository events
constellation.on('repository:click', (repo) => {
  console.log('Repository clicked:', repo.name);
});

constellation.on('repository:hover', (repo) => {
  console.log('Repository hovered:', repo.name);  
});

constellation.on('repository:focus', (repo) => {
  console.log('Repository focused:', repo.name);
});

// Navigation events  
constellation.on('camera:move', (position, target) => {
  console.log('Camera moved to:', position);
});

constellation.on('search:results', (query, results) => {
  console.log(`Search "${query}" found ${results.length} results`);
});

// Accessibility events
constellation.on('accessibility:modeChange', (mode, enabled) => {
  console.log(`${mode} mode ${enabled ? 'enabled' : 'disabled'}`);
});

// Performance events
constellation.on('performance:fps', (fps) => {
  if (fps < 30) console.warn('Low FPS detected:', fps);
});

constellation.on('performance:memory', (usage) => {
  console.log('Memory usage:', usage);
});
```

---

## 🔧 **Plugins & Extensions**

### **Creating Custom Plugins**
*Extend constellation functionality*

```javascript
// Define a plugin
const myPlugin = {
  name: 'repository-analytics',
  version: '1.0.0',
  
  install(constellation, options = {}) {
    // Add analytics tracking
    constellation.trackRepository = function(repoName, event) {
      console.log(`Tracking: ${event} on ${repoName}`);
      // Your analytics code here
    };
    
    // Listen for repository interactions
    constellation.on('repository:click', (repo) => {
      constellation.trackRepository(repo.name, 'click');
    });
  },
  
  uninstall(constellation) {
    delete constellation.trackRepository;
  }
};

// Install plugin
constellation.use(myPlugin, {
  trackingId: 'your-analytics-id'
});
```

### **Built-in Plugins**

#### **GitHub Integration Plugin**
```javascript
constellation.use('github-integration', {
  token: 'your-github-token',
  autoUpdate: true,
  updateInterval: 300000
});
```

#### **Voice Search Plugin**
```javascript
constellation.use('voice-search', {
  language: 'en-US',
  continuous: false,
  interimResults: true
});
```

#### **Screenshot Plugin**
```javascript
constellation.use('screenshot', {
  quality: 0.9,
  format: 'png',
  filename: 'constellation-{timestamp}.png'
});

// Take screenshot
constellation.takeScreenshot()
  .then(blob => {
    // Handle the image blob
  });
```

---

## 📱 **Mobile & Touch API**

### **TouchController**
*Handle mobile interactions*

```javascript
const touch = constellation.touchController;

// Touch gestures
touch.enableGestures({
  pinchZoom: true,
  twoFingerRotate: true,  
  swipeNavigation: true,
  tapToFocus: true
});

// Custom gesture handlers
touch.addGesture('three-finger-tap', {
  fingers: 3,
  maxDuration: 500,
  handler: () => {
    constellation.toggleAccessibilityPanel();
  }
});

// Haptic feedback
touch.enableHaptics(true);
touch.setHapticIntensity(0.5); // 0-1 scale
```

---

## 📊 **Performance Monitoring**

### **PerformanceMonitor**
*Track and optimize performance*

```javascript
const perf = constellation.performanceMonitor;

// Enable monitoring
perf.start({
  fps: true,
  memory: true,
  renderTime: true,
  networkRequests: true
});

// Performance metrics
const metrics = perf.getMetrics();
console.log('Current FPS:', metrics.fps);
console.log('Memory usage:', metrics.memory);
console.log('Render time:', metrics.renderTime);

// Performance events
perf.on('lowPerformance', (metrics) => {
  console.warn('Performance degraded:', metrics);
  // Automatically reduce quality
  constellation.setQuality('low');
});

// Manual optimization
perf.optimize({
  reduceParticles: true,
  disableShadows: true,
  lowerResolution: true
});
```

---

## 🛠️ **Development Tools**

### **Debug Mode**
*Development and debugging utilities*

```javascript
// Enable debug mode
constellation.setDebugMode(true);

// Debug panel
constellation.showDebugPanel({
  fps: true,
  cameraPosition: true,
  repositoryCount: true,
  performanceMetrics: true
});

// Console logging
constellation.setLogLevel('debug'); // error, warn, info, debug

// Visual debugging
constellation.debug.showRepositoryBounds(true);
constellation.debug.showCameraHelper(true);
constellation.debug.showParticleStats(true);
```

---

## 📚 **TypeScript Definitions**

### **Type Definitions**
*For TypeScript projects*

```typescript
interface Repository {
  name: string;
  category: 'Core Empire' | 'Creative' | 'Social' | 'Dev Tools';
  description: string;
  language: string;
  stars: number;
  updated: string;
  status: 'active' | 'development' | 'maintenance';
  githubUrl: string;
  position?: Vector3;
}

interface ConstellationOptions {
  container: string | HTMLElement;
  data?: Repository[];
  neurodivergentMode?: boolean;
  motionReduction?: boolean;
  focusMode?: boolean;
  particleCount?: number;
  bloomIntensity?: number;
  cameraSpeed?: number;
  spatialAudio?: boolean;
  ambientVolume?: number;
  effectsVolume?: number;
}

class HyperConstellationEngine {
  constructor(options: ConstellationOptions);
  init(): Promise<void>;
  addRepository(repo: Repository): void;
  removeRepository(name: string): void;
  updateRepository(name: string, data: Partial<Repository>): void;
  focusOnRepository(name: string): void;
  searchRepositories(query: string): Repository[];
  setAccessibilityMode(mode: AccessibilityMode, enabled: boolean): void;
  // ... more methods
}
```

---

## 🎯 **Best Practices**

### **Performance** ⚡
```javascript
// Good: Batch updates
constellation.batchUpdate(() => {
  constellation.addRepository(repo1);
  constellation.addRepository(repo2);
  constellation.addRepository(repo3);
});

// Avoid: Individual updates in loops
repositories.forEach(repo => {
  constellation.addRepository(repo); // Causes multiple re-renders
});
```

### **Accessibility** ♿
```javascript
// Always provide alternatives
constellation.setAccessibilityMode('focus', true);

// Announce changes to screen readers  
constellation.announceToScreenReader('Repository added: ' + repo.name);

// Respect user preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  constellation.setAccessibilityMode('motion', false);
}
```

### **Memory Management** 💾
```javascript
// Clean up when done
window.addEventListener('beforeunload', () => {
  constellation.dispose();
});

// Remove unused repositories
constellation.removeRepository('old-repo');

// Optimize for mobile
if (constellation.isMobile()) {
  constellation.setParticleCount(500); // Reduce particles
  constellation.setQuality('medium');  // Lower quality
}
```

---

## 🐛 **Troubleshooting**

### **Common Issues**

#### **WebGL Not Supported**
```javascript
if (!constellation.isWebGLSupported()) {
  console.warn('WebGL not supported, falling back to 2D');
  constellation.enable2DFallback();
}
```

#### **Performance Issues**
```javascript
// Check performance and auto-optimize
constellation.on('performance:low', () => {
  constellation.setQuality('low');
  constellation.setParticleCount(200);
});
```

#### **Accessibility Issues**
```javascript
// Ensure screen reader compatibility
constellation.validateAccessibility()
  .then(results => {
    if (results.issues.length > 0) {
      console.warn('Accessibility issues found:', results.issues);
    }
  });
```

---

## 🤝 **Contributing to the API**

**Want to improve the constellation API?**

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/api-improvement`)
3. **Add** your API improvements
4. **Update** this documentation  
5. **Add** TypeScript definitions
6. **Test** thoroughly for accessibility
7. **Submit** pull request

**API Design Principles:**
- ✅ **Accessibility first** - All APIs must support neurodivergent users
- ✅ **Clear naming** - Methods should be self-documenting
- ✅ **Error handling** - Graceful degradation always
- ✅ **Performance aware** - No blocking operations
- ✅ **Event-driven** - Emit events for all significant changes

---

## 💜 **Community**

**Get help with the API:**
- 💬 **Discord:** [Hyperfocus Zone Community](https://discord.gg/ZKpHHrDctT)
- 📧 **Email:** api@hyperfocuszone.com
- 📝 **GitHub:** [API Questions](https://github.com/welshDog/hyperfocus-3d-constellation/discussions)

**Built with 💜 by neurodivergent minds, documented for everyone who builds differently.**
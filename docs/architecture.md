# 🏑 Architecture Guide

## Overview

Hyperfocus-3D-Constellation is a **single-page application** (SPA) with no build step. It consists of:

```
index.html (Markup + CSS) → app.js (Three.js Scene) + audio.js (Web Audio API)
                              ↑
                         GitHub API (fetch repos)
```

---

## 💿 Tech Stack

| Layer | Technology | Purpose | Why |
|-------|-----------|---------|-----|
| **Markup** | HTML5 | Structure + UI | Semantic, accessible |
| **Styling** | CSS3 + Variables | Layout + theming | No build required |
| **3D Graphics** | Three.js r128 | Galaxy visualization | WebGL, proven, lightweight |
| **Camera Control** | OrbitControls.js | User interaction | Smooth, intuitive |
| **Audio Synthesis** | Web Audio API | Sound effects | Zero-dependency synthesis |
| **Data** | GitHub REST API | Repository info | 68 repos, real-time |
| **No build tools** | HTML-only | Direct deployment | Static GitHub Pages |

---

## 🎫 Three.js Scene Architecture

### **Initialization Flow**

```javascript
init()
  └── initThreeJS()                // Create scene, camera, renderer
       └── setupLighting()            // Add lights (ambient, directional, point)
       └── createStarfield()          // Background 1500 stars
  └── fetchAllRepos()             // GitHub API: paginate 68 repos
  └── For each repo:
       └── createRepoParticle()       // Create sphere, add to scene
  └── setupEventListeners()       // Keyboard, mouse, UI events
  └── animate()                  // Start render loop
```

### **Scene Graph**

```
scene
├── lighting
│   ├── ambientLight (0.3 intensity)
│   ├── directionalLight (shadows)
│   ├── pointLight1 (cyan glow, 300 range)
│   └── pointLight2 (magenta glow, 300 range)
├── starfield
│   └── Points (1500 white stars)
├── particles (68 repos)
│   ├── particle[0] -> Python repo
│   │   ├── geometry: IcosahedronGeometry
│   │   ├── material: MeshStandardMaterial (emissive + metalness)
│   │   ├── position: spherical coords (from repo index)
│   │   ├── userData: { repo, phase, velocity, rotSpeed }
│   │   └── rotation: (animated)
│   ├── particle[1] -> JavaScript repo
│   └── particle[N] -> ...
└── fog (linear, 1-1000 units for depth)
```

### **Particle Properties**

Each particle (repo) has:

```javascript
mesh.userData = {
  repo: { name, language, stargazers_count, ... },  // GitHub data
  originalPos: Vector3,                              // Center position
  velocity: Vector3,                                 // Floating motion
  phase: number,                                     // Animation phase (0-2π)
  rotSpeed: number                                   // Rotation speed
}
```

### **Animation Loop**

```javascript
animate() {
  // Called 60x per second
  
  particles.forEach(particle => {
    // Floating motion
    phase += 0.01
    offset = sin(phase) * 0.1
    particle.position = originalPos + (velocity * offset)
    
    // Rotation
    particle.rotation.x += rotSpeed
    particle.rotation.y += rotSpeed * 1.5
  })
  
  // Update camera
  controls.update()
  
  // Render
  renderer.render(scene, camera)
}
```

---

## 🔊 Web Audio API Architecture

### **AudioEngine Class Structure**

```javascript
AudioEngine
└── audioContext (Web Audio API context)
    ├── destination (speakers)
    ├── masterGain
    │   ├── ambientGain (background drone)
    │   └── effectsGain (UI sounds)
    └── Methods:
        ├── whoosh()           // Startup/camera reset
        ├── click()            // UI interaction
        ├── glitch()           // Error/dismiss
        ├── notification()     // Success
        ├── success()          // Bookmark added
        ├── error()            // Network error
        ├── filterSweep()      // Language filter
        ├── zoom()             // Scroll in/out
        └── selectParticle()   // Click repo
```

### **Audio Signal Flow**

```
Oscillator          Noise Buffer
  │                    │
  ├──── Filter        → Filter
  └───── Gain           → Gain
           │                    │
           └────────── Mix
                         │
                    masterGain
                         │
                   (effectsGain or ambientGain)
                         │
                   audioContext.destination
                         │
                      Speakers♀️
```

### **Effect Synthesis Examples**

#### **Whoosh** (Startup)
```
Frequency sweep:  100 Hz → 800 Hz → 300 Hz (0.3s)
Amplitude:        0 → 0.3 → 0 (envelope)
Filter:           highpass, 200 Hz → 4000 Hz
Noise:            0.2 intensity overlay
Result:           Ascending whoosh sound
```

#### **Click** (Button interaction)
```
Frequency:        800 Hz (base) * pitch modifier (0.6-1.3)
Amplitude:        Sharp attack (10ms), quick decay (70ms)
Filter:           Highpass 2000 Hz
Result:           Short, crisp beep
```

#### **Glitch** (Error/dismiss)
```
3-7 random glitches in 150ms:
Each glitch:
  - Random frequency (100-800 Hz)
  - Random filter (1000-4000 Hz highpass)
  - 5-30ms duration
  - Staggered timing
Result:           Digital error sound
```

---

## 🔄 Data Flow Diagram

```
🌐 GitHub API
   │
   └─ fetchAllRepos() → [repo1, repo2, ..., repo68]
          │
          └─ appState.repos
              appState.languages (Set)
          │
          └─ For each repo → createRepoParticle()
                  │
                  └─ THREE.Sphere geometry
                     THREE.Material (color by language)
                     userData (repo data + animation state)
                  │
                  └─ appState.particles[]
                     scene.add(mesh)
          │
          └─ UI
              filterContainer.add(filterBtn) for each language
              document.getElementById('repos').text = count
```

---

## 🔁 Interaction Flow

### **User Clicks Repo**
```
1. onCanvasClick(event)
   └── raycaster.setFromCamera(mouse, camera)
   └── intersects = raycaster.intersectObjects(particles)
   └── selectedMesh = intersects[0].object

2. showRepoInfo(selectedMesh.userData.repo)
   └── Update info panel HTML
   └── panel.classList.add('show')
   └── appState.selectedRepo = repo

3. highlightParticle(selectedMesh)
   └── particle.material.emissiveIntensity = 0.8

4. audioEngine.selectParticle(1.1)
   └── Play melodic sweep sound
```

### **User Filters by Language**
```
1. Click filter button (data-lang="Python")

2. filterByLanguage('Python')
   └── particles.forEach(p => {
       p.visible = (p.userData.repo.language === 'Python')
   })

3. audioEngine.filterSweep('Python')
   └── Play language-specific pitch click

4. UI updates
   └── Filter button.classList.add('active')
   └── Repo count updates
```

### **User Searches**
```
1. Input event on search box

2. particles.forEach(p => {
     match = p.userData.repo.name.includes(query) OR
             p.userData.repo.description.includes(query)
     p.visible = match
   })

3. Every 3rd character: audioEngine.click(0.6)

4. UI updates
   └── document.getElementById('repos').text = visibleCount
```

---

## 📌 State Management

### **appState Object**

```javascript
const appState = {
  repos: [],                  // All 68 repos from GitHub
  particles: [],              // THREE.Mesh objects
  selectedRepo: null,         // Currently selected repo
  raycaster: new THREE.Raycaster(),
  mouse: new THREE.Vector2(),
  languages: new Set(),       // Unique languages
};
```

**No external state management** (Redux, Vuex, etc.)
- Simpler
- Faster
- No build required
- Direct DOM manipulation via classList

---

## 📄 Performance Considerations

### **Rendering**
- **68 particles**: Each has geometry + material + animation
- **Lights**: 4 total (1 ambient, 1 directional, 2 point)
- **Stars**: 1500 points (low poly, performant)
- **Target**: 60 FPS on mid-range devices

### **Optimizations Done**
- ✅ Icosahedron geometry (only 16 subdivisions, not 64)
- ✅ Material reuse (not creating new material per particle)
- ✅ Particle pooling (create once, update in loop)
- ✅ No particle addition/removal in animation loop
- ✅ Fog to hide far objects (less rendering)

### **Potential Future Optimizations**
- InstancedGeometry (if scaling to 1000+ repos)
- WebGPU renderer (when stable)
- Compute shaders for animation
- LOD (Level of Detail) for distant particles

---

## 🖫 Error Handling

### **GitHub API Errors**
```javascript
try {
  const repos = await fetchAllRepos();
  // Process repos
} catch (error) {
  console.error('GitHub API error:', error);
  updateStatus('❌ Error loading repositories');
  audioEngine.error();
}
```

### **Audio Context Errors**
```javascript
// Browser may require user gesture to start audio
// Solution: auto-resume on first click
document.addEventListener('click', () => {
  if (audioEngine.audioContext.state === 'suspended') {
    audioEngine.audioContext.resume();
  }
});
```

---

## 🔍 Debugging Tips

### **Three.js Inspector**
```javascript
// In console, pause animation to inspect scene
controls.autoRotate = false;
renderer.render(scene, camera); // Manual render
```

### **Audio Analyzer**
```javascript
// Check if audio is playing (check volume levels in devtools)
const analyser = audioEngine.audioContext.createAnalyser();
audioEngine.masterGain.connect(analyser);
// Inspect analyser.getByteFrequencyData()
```

### **Performance Profiling**
```javascript
// DevTools > Performance tab
// Record 1 frame animation cycle
// Look for:
// - geometry.setFromPoints (should be minimal)
// - renderer.render (target <16ms for 60 FPS)
// - GC pauses (should be none)
```

---

## 🌝 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| WebGL 2.0 | ✅ | ✅ | ✅ | ✅ |
| Web Audio API | ✅ | ✅ | ✅ | ✅ |
| Fetch API | ✅ | ✅ | ✅ | ✅ |
| ES6+ | ✅ | ✅ | ✅ | ✅ |
| CSS Grid | ✅ | ✅ | ✅ | ✅ |

**Minimum versions**: Chrome 90+, Firefox 88+, Safari 15+

---

## 📋 Future Architecture Ideas

### **Phase 2: Data Persistence**
- Save user's bookmarks to localStorage
- Cache repo data (reuse in offline mode)
- Store filter preferences

### **Phase 3: Advanced Visuals**
- Particle trails (history of movement)
- Connection lines between repos (same author, same language)
- Heatmap overlay (activity, stars over time)
- Custom particle shapes per language

### **Phase 4: Multiplayer**
- WebSocket for shared galaxy view
- Real-time user cursors
- Collaborative exploration

### **Phase 5: Mobile App**
- React Native or Flutter version
- Touch controls (pinch zoom, swipe)
- Mobile-optimized UI

---

## 📚 References

- **Three.js Documentation**: https://threejs.org/docs/
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **OrbitControls**: https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/OrbitControls.js
- **GitHub REST API**: https://docs.github.com/en/rest

---

**Questions?** See [`README.md`](../README.md) or [`accessibility.md`](./accessibility.md)

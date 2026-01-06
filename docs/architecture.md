# 🏗️ Architecture Overview

## System Design

### Core Components
- **ConstellationApp** - Application coordinator
- **UIManager** - User interface controller
- **GalaxyScene** - 3D rendering engine

### API Resilience
- Primary: GitHub REST API (live data)
- Fallback: `data/repos.json` (cached snapshot)
- Auto-detection of rate limits (403 responses)

### Performance Strategy
- Lazy particle rendering
- Intersection Observer for visibility
- RequestAnimationFrame throttling
- WebGL optimization for 60fps target

Built for neurodivergent minds with accessibility-first design.

---

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
```

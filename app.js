// Repository data from the application
const repositories = [
  {
    "name": "-MIND-VAULT-ULTIMATE-GAME",
    "category": "Creative",
    "description": "Welcome to Hyperfocus Zone - where your neurodivergent visual-spatial superpowers shine! This guide gets you playing and mastering puzzles in minutes.",
    "language": "JavaScript",
    "stars": 0,
    "updated": "1 hour ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/-MIND-VAULT-ULTIMATE-GAME"
  },
  {
    "name": "THE-HYPERFOCUS-ultra-FULL-MODE-EXPERIENCE-",
    "category": "Core Empire",
    "description": "ADHD-friendly design - quick visual feedback, bite-sized interactions. Gamified progress - perfect for your BROski$ system. 3D/AR elements.",
    "language": "JavaScript",
    "stars": 0,
    "updated": "2 days ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/THE-HYPERFOCUS-ultra-FULL-MODE-EXPERIENCE-"
  },
  {
    "name": "-ULTIMATE-ADHD-BRAIN-ARCADE-",
    "category": "Core Empire",
    "description": "The World's First Professional-Grade Brain Training Platform Designed Specifically for ADHD & Neurodivergent Minds",
    "language": "JavaScript",
    "stars": 0,
    "updated": "2 days ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/-ULTIMATE-ADHD-BRAIN-ARCADE-"
  },
  {
    "name": "Hyperfocus-Booster-Beacon",
    "category": "Creative",
    "description": "The way those binaural beats kick in when you hit that pulsing center... chef's kiss 👌 And those particle effects? Pure eye candy for the ADHD brain!",
    "language": "CSS",
    "stars": 0,
    "updated": "2 days ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/Hyperfocus-Booster-Beacon"
  },
  {
    "name": "hyperfocus-constellation",
    "category": "Core Empire",
    "description": "hyperfocus constellation a star map of all the hyperfocus zone repos",
    "language": "CSS",
    "stars": 1,
    "updated": "2 days ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/hyperfocus-constellation"
  },
  {
    "name": "HYPERFOCUSzone-starting-code-",
    "category": "Core Empire",
    "description": "HYPERFOCUS Mega Fusion Ecosystem - Private Development Repository",
    "language": "Python",
    "stars": 1,
    "updated": "3 days ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/HYPERFOCUSzone-starting-code-"
  },
  {
    "name": "HyperSpace",
    "category": "Dev Tools",
    "description": "Next-generation development environment for neurodivergent minds",
    "language": "TypeScript",
    "stars": 0,
    "updated": "5 days ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/HyperSpace"
  },
  {
    "name": "BROski-Hyperspace-template",
    "category": "Dev Tools",
    "description": "BROski-Hyperspace-template a cool place to vibe code",
    "language": "TypeScript",
    "stars": 0,
    "updated": "5 days ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/BROski-Hyperspace-template"
  },
  {
    "name": "My-Social-COMs-Buddy",
    "category": "Social",
    "description": "AI to help me communicate with others with my Dyslexia",
    "language": "TypeScript",
    "stars": 1,
    "updated": "5 days ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/My-Social-COMs-Buddy"
  },
  {
    "name": "hyperfocus-neurodivergent-HYPER-tool",
    "category": "Dev Tools",
    "description": "Ultimate toolkit for neurodivergent developers",
    "language": "JavaScript",
    "stars": 1,
    "updated": "last week",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/hyperfocus-neurodivergent-HYPER-tool"
  },
  {
    "name": "HYPERFOCUS-ZONE-NEURO-SOCIAL-DREAMER-",
    "category": "Social",
    "description": "Hyperfocus Social: Reimagining Social Media for Neurodivergent Creators",
    "language": "JavaScript",
    "stars": 1,
    "updated": "last week",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/HYPERFOCUS-ZONE-NEURO-SOCIAL-DREAMER-"
  },
  {
    "name": "HYPERFOCUS-UNIFIED-EMPIRE",
    "category": "Core Empire",
    "description": "Unified AI HyperFocus Ecosystem",
    "language": "Python",
    "stars": 1,
    "updated": "last week",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/HYPERFOCUS-UNIFIED-EMPIRE"
  },
  {
    "name": "hl-model-api",
    "category": "Dev Tools",
    "description": "test on a easy AI build on week ass laptop",
    "language": "Python",
    "stars": 0,
    "updated": "last week",
    "status": "development",
    "githubUrl": "https://github.com/welshDog/hl-model-api"
  },
  {
    "name": "HYPERFOCUSzone-Community",
    "category": "Social",
    "description": "HYPERFOCUS Mega Fusion Ecosystem - Community Showcase",
    "language": "HTML",
    "stars": 1,
    "updated": "last week",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/HYPERFOCUSzone-Community"
  },
  {
    "name": "Hyper-vibe-engine",
    "category": "Creative",
    "description": "Turn images into soundtracks. Turn stories into portals",
    "language": "JavaScript",
    "stars": 1,
    "updated": "last week",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/Hyper-vibe-engine"
  },
  {
    "name": "hyper-vibe-studio",
    "category": "Creative",
    "description": "🚀 Ultimate VS Code Workspace Configuration - Automation Revolution v3.0",
    "language": "JavaScript",
    "stars": 1,
    "updated": "2 weeks ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/hyper-vibe-studio"
  },
  {
    "name": "github-ai-mangaer-helper",
    "category": "Dev Tools",
    "description": "🚀 Advanced GitHub repository security scanner with AI assistance",
    "language": "Python",
    "stars": 1,
    "updated": "2 weeks ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/github-ai-mangaer-helper"
  },
  {
    "name": "-HYPERFOCUS-ZONE-Omega-Vault-",
    "category": "Core Empire",
    "description": "The Omega Vault is the legendary archive of the Hyperfocus Zone — a secure chamber of artifacts, constructs, and relics forged in pure focus.",
    "language": "JavaScript",
    "stars": 1,
    "updated": "2 weeks ago",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/-HYPERFOCUS-ZONE-Omega-Vault-"
  },
  {
    "name": "RAZ-PI-EYE",
    "category": "Dev Tools",
    "description": "way to see inside a raspberry pi CPU with wifi or bluetooth",
    "language": "TypeScript",
    "stars": 1,
    "updated": "last month",
    "status": "maintenance",
    "githubUrl": "https://github.com/welshDog/RAZ-PI-EYE"
  },
  {
    "name": "tHe-HYPER-dOoK-STorY",
    "category": "Creative",
    "description": "OUR HYPER dOoK of life",
    "language": "HTML",
    "stars": 1,
    "updated": "last month",
    "status": "active",
    "githubUrl": "https://github.com/welshDog/tHe-HYPER-dOoK-STorY"
  }
];

// Global 3D variables
let scene, camera, renderer, controls;
let repoSpheres = [];
let particleSystems = [];
let selectedRepo = null;
let hoveredRepo = null;
let currentFilter = 'all';
let bookmarkedRepos = new Set();
let achievements = new Set();
let isMotionReduced = false;
let isFocusMode = false;
let isHighContrast = false;
let audioEnabled = false;
let ambientVolume = 0.5;
let effectsVolume = 0.3;

// Performance monitoring
let frameCount = 0;
let lastTime = performance.now();
let renderTimes = [];

// Mouse and raycaster for interactions
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

// Category colors and materials
const categoryConfig = {
  'Core Empire': { 
    color: 0x8b5cf6, 
    emissive: 0x4c1d95,
    particleColor: 0x8b5cf6 
  },
  'Creative': { 
    color: 0x06b6d4, 
    emissive: 0x0891b2,
    particleColor: 0x06b6d4 
  },
  'Dev Tools': { 
    color: 0x3b82f6, 
    emissive: 0x1d4ed8,
    particleColor: 0x3b82f6 
  },
  'Social': { 
    color: 0xec4899, 
    emissive: 0xbe185d,
    particleColor: 0xec4899 
  }
};

// Audio context (will be initialized on user interaction)
let audioContext = null;
let ambientSound = null;

class ConstellationApp {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.updateCategoryCounts();
    this.startLoadingSequence();
  }

  init() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupControls();
    this.setupLighting();
    this.createStarField();
    this.createRepositorySpheres();
    this.setupMinimap();
    this.animate();
  }

  setupScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 50, 300);
    
    // Add subtle nebula background
    const nebulaGeometry = new THREE.SphereGeometry(200, 32, 32);
    const nebulaMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a0a2e,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);
  }

  setupCamera() {
    camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 50);
  }

  setupRenderer() {
    const canvas = document.getElementById('galaxy-canvas');
    renderer = new THREE.WebGLRenderer({ 
      canvas: canvas, 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
  }

  setupControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 150;
    controls.maxPolarAngle = Math.PI;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x00d4ff, 0.8, 100);
    pointLight1.position.set(-30, 20, 30);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6b9d, 0.6, 80);
    pointLight2.position.set(30, -20, -30);
    scene.add(pointLight2);
  }

  createStarField() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8
    });

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 400;
      const y = (Math.random() - 0.5) * 400;
      const z = (Math.random() - 0.5) * 400;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
  }

  createRepositorySpheres() {
    repositories.forEach((repo, index) => {
      this.createRepoSphere(repo, index);
    });
    this.createConnectionLines();
  }

  createRepoSphere(repo, index) {
    const config = categoryConfig[repo.category];
    const starCount = Math.max(repo.stars, 0.5);
    const radius = Math.max(0.5 + (starCount * 0.3), 0.8);
    
    // Position in a spiral galaxy formation
    const angle = (index / repositories.length) * Math.PI * 8;
    const distance = 15 + (index % 4) * 8;
    const height = (Math.sin(angle * 0.5) * 5) + (Math.random() - 0.5) * 3;
    
    const position = {
      x: Math.cos(angle) * distance,
      y: height,
      z: Math.sin(angle) * distance
    };

    // Create main sphere geometry
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    
    // Create material with glow effect
    const material = new THREE.MeshPhongMaterial({
      color: config.color,
      emissive: config.emissive,
      emissiveIntensity: 0.2,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(position.x, position.y, position.z);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    
    // Store repository data
    sphere.userData = {
      repository: repo,
      originalPosition: { ...position },
      originalScale: 1,
      targetScale: 1,
      pulsePhase: Math.random() * Math.PI * 2,
      isVisible: true,
      originalEmissiveIntensity: 0.2
    };

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(radius * 1.3, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    sphere.add(glowSphere);

    // Create particle system around sphere
    this.createParticleSystem(sphere, config.particleColor);

    scene.add(sphere);
    repoSpheres.push(sphere);
  }

  createParticleSystem(parentSphere, color) {
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2 + Math.random() * 3;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(theta);
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.userData = { velocities: velocities };
    
    const particleMaterial = new THREE.PointsMaterial({
      color: color,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    parentSphere.add(particleSystem);
    particleSystems.push({ system: particleSystem, parent: parentSphere });
  }

  createConnectionLines() {
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    // Create connections between repositories of same category
    repositories.forEach((repo1, i) => {
      repositories.forEach((repo2, j) => {
        if (i < j && repo1.category === repo2.category && Math.random() > 0.7) {
          const sphere1 = repoSpheres[i];
          const sphere2 = repoSpheres[j];
          
          linePositions.push(
            sphere1.position.x, sphere1.position.y, sphere1.position.z,
            sphere2.position.x, sphere2.position.y, sphere2.position.z
          );
        }
      });
    });
    
    if (linePositions.length > 0) {
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.3
      });
      
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);
    }
  }

  setupMinimap() {
    const minimapCanvas = document.getElementById('minimap-canvas');
    const minimapCtx = minimapCanvas.getContext('2d');
    
    this.updateMinimap = () => {
      minimapCtx.fillStyle = '#1a1a2e';
      minimapCtx.fillRect(0, 0, 150, 150);
      
      repoSpheres.forEach(sphere => {
        if (!sphere.userData.isVisible) return;
        
        const repo = sphere.userData.repository;
        const config = categoryConfig[repo.category];
        
        // Map 3D position to 2D minimap
        const x = ((sphere.position.x + 50) / 100) * 150;
        const y = ((sphere.position.z + 50) / 100) * 150;
        
        minimapCtx.fillStyle = `#${config.color.toString(16).padStart(6, '0')}`;
        minimapCtx.beginPath();
        minimapCtx.arc(x, y, 3, 0, 2 * Math.PI);
        minimapCtx.fill();
      });
      
      // Show camera position
      const camX = ((camera.position.x + 50) / 100) * 150;
      const camY = ((camera.position.z + 50) / 100) * 150;
      
      minimapCtx.strokeStyle = '#00d4ff';
      minimapCtx.lineWidth = 2;
      minimapCtx.beginPath();
      minimapCtx.arc(camX, camY, 8, 0, 2 * Math.PI);
      minimapCtx.stroke();
    };
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    // Voice search
    const voiceBtn = document.getElementById('voice-search-btn');
    voiceBtn.addEventListener('click', () => {
      this.startVoiceSearch();
    });

    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        this.handleCategoryFilter(category);
        
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
      });
    });

    // Accessibility controls
    document.getElementById('motion-reduction').addEventListener('change', (e) => {
      this.toggleMotionReduction(e.target.checked);
    });

    document.getElementById('focus-mode').addEventListener('change', (e) => {
      this.toggleFocusMode(e.target.checked);
    });

    document.getElementById('high-contrast').addEventListener('change', (e) => {
      this.toggleHighContrast(e.target.checked);
    });

    document.getElementById('audio-enabled').addEventListener('change', (e) => {
      this.toggleAudio(e.target.checked);
    });

    // Volume controls
    document.getElementById('ambient-volume').addEventListener('input', (e) => {
      ambientVolume = e.target.value / 100;
      document.getElementById('ambient-value').textContent = e.target.value;
      this.updateAudioVolume();
    });

    document.getElementById('effects-volume').addEventListener('input', (e) => {
      effectsVolume = e.target.value / 100;
      document.getElementById('effects-value').textContent = e.target.value;
    });

    // Tour and controls
    document.getElementById('start-tour').addEventListener('click', () => {
      this.startGuidedTour();
    });

    document.getElementById('export-view').addEventListener('click', () => {
      this.exportCurrentView();
    });

    document.getElementById('reset-view').addEventListener('click', () => {
      this.resetCamera();
    });

    // Info panel
    document.getElementById('close-info').addEventListener('click', () => {
      this.hideRepoInfo();
    });

    document.getElementById('bookmark-btn').addEventListener('click', () => {
      this.toggleBookmark();
    });

    document.getElementById('share-btn').addEventListener('click', () => {
      this.shareCurrentView();
    });

    // Bookmarks
    document.getElementById('toggle-bookmarks').addEventListener('click', () => {
      this.toggleBookmarksPanel();
    });

    // Mouse interactions - Fixed event handling
    renderer.domElement.addEventListener('click', (event) => {
      this.handleMouseClick(event);
    });

    renderer.domElement.addEventListener('mousemove', (event) => {
      this.handleMouseMove(event);
    });

    // Resize handling
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      this.handleKeyboard(event);
    });
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.showAllRepositories();
      return;
    }

    const matches = repositories.filter(repo => 
      repo.name.toLowerCase().includes(query.toLowerCase()) ||
      repo.description.toLowerCase().includes(query.toLowerCase()) ||
      repo.category.toLowerCase().includes(query.toLowerCase())
    );

    console.log('Search matches:', matches);
    this.highlightRepositories(matches);
    
    if (matches.length === 1) {
      this.flyToRepository(matches[0].name);
      this.triggerAchievement('Precision Search', 'Found exact match!');
    } else if (matches.length > 0) {
      this.triggerAchievement('Explorer', `Found ${matches.length} matches!`);
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
      this.handleSearch(transcript);
    };
    
    recognition.onend = () => {
      voiceBtn.classList.remove('listening');
    };
    
    recognition.start();
  }

  handleCategoryFilter(category) {
    currentFilter = category;
    console.log('Filtering by category:', category);
    
    // Show/hide repositories based on filter
    repoSpheres.forEach(sphere => {
      const repo = sphere.userData.repository;
      const isVisible = category === 'all' || repo.category === category;
      sphere.userData.isVisible = isVisible;
      sphere.visible = isVisible;
      
      if (!isMotionReduced) {
        sphere.userData.targetScale = isVisible ? 1 : 0.1;
      }
    });
    
    this.triggerAchievement('Category Explorer', `Filtered by ${category}`);
  }

  toggleMotionReduction(enabled) {
    isMotionReduced = enabled;
    controls.autoRotate = !enabled;
    
    if (enabled) {
      document.body.classList.add('motion-reduced');
    } else {
      document.body.classList.remove('motion-reduced');
    }
  }

  toggleFocusMode(enabled) {
    isFocusMode = enabled;
    
    if (enabled) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
  }

  toggleHighContrast(enabled) {
    isHighContrast = enabled;
    
    if (enabled) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
  }

  toggleAudio(enabled) {
    audioEnabled = enabled;
    
    if (enabled && !audioContext) {
      this.initializeAudio();
    }
    
    if (ambientSound) {
      if (enabled) {
        ambientSound.play();
      } else {
        ambientSound.pause();
      }
    }
  }

  initializeAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.createAmbientSound();
  }

  createAmbientSound() {
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(40, audioContext.currentTime);
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(80, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(ambientVolume * 0.1, audioContext.currentTime);
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator1.start();
    oscillator2.start();
    
    this.ambientGain = gainNode;
  }

  updateAudioVolume() {
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(ambientVolume * 0.1, audioContext.currentTime);
    }
  }

  handleMouseClick(event) {
    // Prevent event when clicking on UI elements
    if (event.target.closest('#ui-overlay')) {
      return;
    }

    // Calculate mouse position in normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with repository spheres
    const intersects = raycaster.intersectObjects(repoSpheres);
    
    console.log('Click detected. Intersects:', intersects.length);
    
    if (intersects.length > 0) {
      const clickedSphere = intersects[0].object;
      console.log('Clicked repository:', clickedSphere.userData.repository.name);
      this.selectRepository(clickedSphere);
      this.playClickSound();
    } else {
      this.hideRepoInfo();
      selectedRepo = null;
    }
  }

  handleMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with repository spheres
    const intersects = raycaster.intersectObjects(repoSpheres);
    
    if (intersects.length > 0) {
      const sphere = intersects[0].object;
      if (hoveredRepo !== sphere) {
        this.hoverRepository(sphere);
        renderer.domElement.style.cursor = 'pointer';
      }
    } else {
      if (hoveredRepo) {
        this.unhoverRepository();
        renderer.domElement.style.cursor = 'default';
      }
    }
  }

  selectRepository(sphere) {
    selectedRepo = sphere;
    const repo = sphere.userData.repository;
    
    console.log('Selecting repository:', repo.name);
    
    // Show repository info
    this.showRepoInfo(repo);
    
    // Fly camera to repository
    this.flyToRepository(repo.name);
    
    this.triggerAchievement('Repository Explorer', `Visited ${repo.name}`);
  }

  hoverRepository(sphere) {
    if (hoveredRepo && hoveredRepo !== sphere) {
      this.unhoverRepository();
    }
    
    hoveredRepo = sphere;
    if (!isMotionReduced) {
      sphere.userData.targetScale = 1.2;
      // Increase emissive intensity for glow effect
      sphere.material.emissiveIntensity = 0.4;
    }
  }

  unhoverRepository() {
    if (hoveredRepo) {
      if (!isMotionReduced) {
        hoveredRepo.userData.targetScale = hoveredRepo.userData.isVisible ? 1 : 0.1;
        // Reset emissive intensity
        hoveredRepo.material.emissiveIntensity = hoveredRepo.userData.originalEmissiveIntensity;
      }
      hoveredRepo = null;
    }
  }

  showRepoInfo(repo) {
    console.log('Showing info for:', repo.name);
    const panel = document.getElementById('repo-info-panel');
    
    document.getElementById('repo-name').textContent = repo.name;
    document.getElementById('repo-category').textContent = repo.category;
    document.getElementById('repo-language').textContent = repo.language;
    document.getElementById('repo-stars').textContent = `⭐ ${repo.stars}`;
    document.getElementById('repo-description').textContent = repo.description;
    document.getElementById('repo-updated').textContent = `Updated: ${repo.updated}`;
    document.getElementById('repo-status').textContent = repo.status;
    document.getElementById('repo-status').className = `status status--${repo.status === 'active' ? 'success' : repo.status === 'development' ? 'warning' : 'info'}`;
    
    const githubLink = document.getElementById('repo-github-link');
    githubLink.href = repo.githubUrl;
    
    // Update bookmark button
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const bookmarkIcon = document.getElementById('bookmark-icon');
    if (bookmarkedRepos.has(repo.name)) {
      bookmarkIcon.textContent = '📌';
      bookmarkBtn.querySelector('span').innerHTML = '📌 Bookmarked';
    } else {
      bookmarkIcon.textContent = '🔖';
      bookmarkBtn.querySelector('span').innerHTML = '🔖 Bookmark';
    }
    
    panel.classList.remove('hidden');
  }

  hideRepoInfo() {
    document.getElementById('repo-info-panel').classList.add('hidden');
  }

  flyToRepository(repoName) {
    const repo = repositories.find(r => r.name === repoName);
    if (!repo) return;
    
    const sphere = repoSpheres.find(s => s.userData.repository.name === repoName);
    if (!sphere) return;
    
    const targetPosition = sphere.position.clone();
    targetPosition.multiplyScalar(1.5);
    
    console.log('Flying to repository:', repoName, 'at position:', targetPosition);
    
    // Animate camera movement
    if (!isMotionReduced) {
      this.animateCameraTo(targetPosition);
    } else {
      camera.position.copy(targetPosition);
      controls.target.copy(sphere.position);
    }
  }

  animateCameraTo(targetPosition) {
    const startPosition = camera.position.clone();
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = this.easeInOutCubic(progress);
      
      camera.position.lerpVectors(startPosition, targetPosition, easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  startGuidedTour() {
    if (repoSpheres.length === 0) return;
    
    let tourIndex = 0;
    const tourRepositories = repositories.filter(r => r.stars > 0);
    
    const nextTourStop = () => {
      if (tourIndex >= tourRepositories.length) {
        this.triggerAchievement('Tour Guide', 'Completed guided tour!');
        this.resetCamera();
        return;
      }
      
      const repo = tourRepositories[tourIndex];
      this.flyToRepository(repo.name);
      this.showRepoInfo(repo);
      
      setTimeout(() => {
        tourIndex++;
        nextTourStop();
      }, 4000);
    };
    
    nextTourStop();
  }

  resetCamera() {
    if (!isMotionReduced) {
      this.animateCameraTo(new THREE.Vector3(0, 0, 50));
    } else {
      camera.position.set(0, 0, 50);
      controls.target.set(0, 0, 0);
    }
    controls.reset();
    this.hideRepoInfo();
  }

  exportCurrentView() {
    renderer.render(scene, camera);
    const dataURL = renderer.domElement.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = 'hyperfocus-constellation.png';
    link.href = dataURL;
    link.click();
    
    this.triggerAchievement('Photographer', 'Captured the constellation!');
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

  toggleBookmark() {
    if (!selectedRepo) return;
    
    const repoName = selectedRepo.userData.repository.name;
    
    if (bookmarkedRepos.has(repoName)) {
      bookmarkedRepos.delete(repoName);
    } else {
      bookmarkedRepos.add(repoName);
      this.triggerAchievement('Collector', 'Repository bookmarked!');
    }
    
    this.updateBookmarksList();
    this.showRepoInfo(selectedRepo.userData.repository);
  }

  updateBookmarksList() {
    const bookmarksList = document.getElementById('bookmarks-list');
    bookmarksList.innerHTML = '';
    
    bookmarkedRepos.forEach(repoName => {
      const repo = repositories.find(r => r.name === repoName);
      if (!repo) return;
      
      const item = document.createElement('div');
      item.className = 'bookmark-item';
      item.innerHTML = `
        <span class="bookmark-name" title="${repo.name}">${repo.name}</span>
        <button class="remove-bookmark" data-repo="${repoName}">×</button>
      `;
      
      item.querySelector('.bookmark-name').addEventListener('click', () => {
        this.flyToRepository(repoName);
      });
      
      item.querySelector('.remove-bookmark').addEventListener('click', (e) => {
        e.stopPropagation();
        bookmarkedRepos.delete(repoName);
        this.updateBookmarksList();
      });
      
      bookmarksList.appendChild(item);
    });
  }

  toggleBookmarksPanel() {
    const panel = document.getElementById('bookmarks-panel');
    panel.classList.toggle('hidden');
  }

  triggerAchievement(title, description) {
    if (achievements.has(title)) return;
    
    achievements.add(title);
    
    const notification = document.getElementById('achievement-notification');
    const text = document.getElementById('achievement-text');
    
    text.textContent = `${title}: ${description}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
    
    this.playAchievementSound();
  }

  playClickSound() {
    if (!audioEnabled || !audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(effectsVolume * 0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  playAchievementSound() {
    if (!audioEnabled || !audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(effectsVolume * 0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }

  updateCategoryCounts() {
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

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    // Performance monitoring
    frameCount++;
    renderTimes.push(deltaTime);
    if (renderTimes.length > 60) renderTimes.shift();
    
    if (frameCount % 60 === 0) {
      const fps = Math.round(1000 / (renderTimes.reduce((a, b) => a + b) / renderTimes.length));
      const avgRenderTime = Math.round(renderTimes.reduce((a, b) => a + b) / renderTimes.length);
      
      document.getElementById('fps-counter').textContent = `FPS: ${fps}`;
      document.getElementById('render-time').textContent = `Render: ${avgRenderTime}ms`;
    }
    
    // Update controls
    controls.update();
    
    // Animate repository spheres
    this.animateRepositories(currentTime);
    
    // Update particle systems
    this.updateParticles();
    
    // Update minimap
    if (this.updateMinimap) {
      this.updateMinimap();
    }
    
    // Render scene
    renderer.render(scene, camera);
  }

  animateRepositories(time) {
    repoSpheres.forEach((sphere, index) => {
      const userData = sphere.userData;
      
      // Pulsing effect
      if (!isMotionReduced) {
        const pulseIntensity = userData.originalEmissiveIntensity + Math.sin(time * 0.003 + userData.pulsePhase) * 0.05;
        if (hoveredRepo !== sphere) {
          sphere.material.emissiveIntensity = pulseIntensity;
        }
        
        // Scale animation
        const targetScale = userData.targetScale;
        const currentScale = sphere.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.1;
        sphere.scale.set(newScale, newScale, newScale);
        
        // Gentle floating motion
        sphere.position.y = userData.originalPosition.y + Math.sin(time * 0.001 + index) * 0.5;
      }
      
      // Hide/show based on visibility
      if (userData.isVisible !== sphere.visible) {
        sphere.visible = userData.isVisible;
      }
    });
  }

  updateParticles() {
    if (isMotionReduced) return;
    
    particleSystems.forEach(({ system, parent }) => {
      if (!parent.visible) return;
      
      const positions = system.geometry.attributes.position.array;
      const velocities = system.geometry.userData.velocities;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Reset particles that drift too far
        const distance = Math.sqrt(
          positions[i] * positions[i] +
          positions[i + 1] * positions[i + 1] +
          positions[i + 2] * positions[i + 2]
        );
        
        if (distance > 5) {
          const phi = Math.random() * Math.PI * 2;
          const theta = Math.random() * Math.PI;
          const radius = 2;
          
          positions[i] = radius * Math.sin(theta) * Math.cos(phi);
          positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
          positions[i + 2] = radius * Math.cos(theta);
        }
      }
      
      system.geometry.attributes.position.needsUpdate = true;
    });
  }

  handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  handleKeyboard(event) {
    switch (event.code) {
      case 'Space':
        event.preventDefault();
        this.resetCamera();
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
        this.startGuidedTour();
        break;
    }
  }

  showAllRepositories() {
    repoSpheres.forEach(sphere => {
      sphere.userData.isVisible = true;
      sphere.visible = true;
      if (!isMotionReduced) {
        sphere.userData.targetScale = 1;
      }
    });
  }

  highlightRepositories(matchedRepos) {
    repoSpheres.forEach(sphere => {
      const repo = sphere.userData.repository;
      const isMatch = matchedRepos.some(m => m.name === repo.name);
      
      sphere.userData.isVisible = isMatch;
      sphere.visible = isMatch;
      
      if (!isMotionReduced) {
        sphere.userData.targetScale = isMatch ? 1.1 : 0.3;
      }
    });
  }
}

// Initialize the application when the DOM is loaded and Three.js is available
document.addEventListener('DOMContentLoaded', () => {
  // Wait for Three.js to load
  const checkThreeJS = () => {
    if (typeof THREE !== 'undefined' && typeof THREE.OrbitControls !== 'undefined') {
      new ConstellationApp();
    } else {
      setTimeout(checkThreeJS, 100);
    }
  };
  checkThreeJS();
});
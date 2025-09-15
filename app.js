/* ===== DRAGGABLE PANELS SYSTEM ===== */
class DraggablePanel {
  constructor(element) {
    this.element = element;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.currentZ = 100;
    
    this.init();
  }
  
  init() {
    // Make sure the element has the draggable class
    if (!this.element.classList.contains('draggable-panel')) {
      this.element.classList.add('draggable-panel');
    }
    
    // Ensure panel is positioned absolutely
    this.element.style.position = 'absolute';
    
    // Find or create drag handle
    let header = this.element.querySelector('.panel-header');
    if (!header) {
      header = document.createElement('div');
      header.className = 'panel-header';
      header.innerHTML = '⋮⋮ Drag Me';
      this.element.insertBefore(header, this.element.firstChild);
    }
    
    // Add event listeners
    this.addEventListeners(header);
    
    // Load saved position
    this.loadPosition();
    
    // Bring to front on click
    this.element.addEventListener('mousedown', () => {
      this.bringToFront();
    });
  }
  
  addEventListeners(header) {
    // Mouse events
    header.addEventListener('mousedown', (e) => this.startDrag(e));
    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('mouseup', () => this.stopDrag());
    
    // Touch events for mobile
    header.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.startDrag({
        clientX: touch.clientX,
        clientY: touch.clientY,
        preventDefault: () => {}
      });
    });
    
    document.addEventListener('touchmove', (e) => {
      if (this.isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        this.drag({
          clientX: touch.clientX,
          clientY: touch.clientY,
          preventDefault: () => {}
        });
      }
    });
    
    document.addEventListener('touchend', () => this.stopDrag());
    
    // Prevent default drag behavior
    header.addEventListener('dragstart', (e) => e.preventDefault());
  }
  
  startDrag(e) {
    e.preventDefault();
    this.isDragging = true;
    this.element.classList.add('dragging');
    
    const rect = this.element.getBoundingClientRect();
    this.offsetX = e.clientX - rect.left;
    this.offsetY = e.clientY - rect.top;
    
    this.bringToFront();
    
    // Add visual feedback
    document.body.style.cursor = 'grabbing';
  }
  
  drag(e) {
    if (!this.isDragging) return;
    
    e.preventDefault();
    
    let newX = e.clientX - this.offsetX;
    let newY = e.clientY - this.offsetY;
    
    // Keep panels within viewport bounds
    const maxX = window.innerWidth - this.element.offsetWidth;
    const maxY = window.innerHeight - this.element.offsetHeight;
    
    newX = Math.max(10, Math.min(newX, maxX - 10));
    newY = Math.max(10, Math.min(newY, maxY - 10));
    
    // Apply position
    this.element.style.left = newX + 'px';
    this.element.style.top = newY + 'px';
    this.element.style.right = 'auto';
    this.element.style.bottom = 'auto';
  }
  
  stopDrag() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.element.classList.remove('dragging');
    
    // Remove cursor override
    document.body.style.cursor = '';
    
    // Save position
    this.savePosition();
    
    // Show notification
    showNotification('Panel position saved', 'success');
  }
  
  bringToFront() {
    this.currentZ = Math.max(this.currentZ, getHighestZIndex()) + 1;
    this.element.style.zIndex = this.currentZ;
  }
  
  savePosition() {
    const position = {
      left: this.element.style.left,
      top: this.element.style.top,
      right: this.element.style.right,
      bottom: this.element.style.bottom,
      zIndex: this.element.style.zIndex
    };
    
    const panelId = this.element.id || this.element.className.split(' ')[0];
    localStorage.setItem(`panel-${panelId}`, JSON.stringify(position));
  }
  
  loadPosition() {
    const panelId = this.element.id || this.element.className.split(' ')[0];
    const saved = localStorage.getItem(`panel-${panelId}`);
    
    if (saved) {
      try {
        const position = JSON.parse(saved);
        if (position.left) this.element.style.left = position.left;
        if (position.top) this.element.style.top = position.top;
        if (position.right) this.element.style.right = position.right;
        if (position.bottom) this.element.style.bottom = position.bottom;
        if (position.zIndex) this.element.style.zIndex = position.zIndex;
      } catch (e) {
        console.warn('Failed to load panel position:', e);
      }
    }
  }
  
  resetToDefault() {
    // Remove saved position
    const panelId = this.element.id || this.element.className.split(' ')[0];
    localStorage.removeItem(`panel-${panelId}`);
    
    // Reset styles
    this.element.style.left = '';
    this.element.style.top = '';
    this.element.style.right = '';
    this.element.style.bottom = '';
    this.element.style.zIndex = '';
  }
}

// Helper function to get highest z-index
function getHighestZIndex() {
  const panels = document.querySelectorAll('.draggable-panel');
  let highest = 100;
  
  panels.forEach(panel => {
    const z = parseInt(panel.style.zIndex) || 100;
    if (z > highest) highest = z;
  });
  
  return highest;
}

/* ===== NOTIFICATION SYSTEM ===== */
function showNotification(message, type = 'info') {
  const container = document.getElementById('notification-container');
  if (!container) return;
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  container.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

/* ===== LAYOUT MANAGEMENT ===== */
function resetPanelPositions() {
  const panels = document.querySelectorAll('.draggable-panel');
  
  // Clear all saved positions
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('panel-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Reset all panels to default positions
  panels.forEach(panel => {
    panel.style.left = '';
    panel.style.top = '';
    panel.style.right = '';
    panel.style.bottom = '';
    panel.style.zIndex = '';
    
    // Re-apply default positions from CSS
    panel.offsetHeight; // Force reflow
  });
  
  showNotification('All panels reset to default positions', 'success');
}

function saveCurrentLayout() {
  showNotification('Layout saved successfully', 'success');
}

function toggleAllPanels() {
  const panels = document.querySelectorAll('.draggable-panel');
  const isAnyVisible = Array.from(panels).some(panel => 
    panel.style.display !== 'none'
  );
  
  panels.forEach(panel => {
    if (isAnyVisible) {
      panel.style.display = 'none';
    } else {
      panel.style.display = '';
    }
  });
  
  showNotification(isAnyVisible ? 'All panels hidden' : 'All panels shown', 'info');
}

/* ===== 3D CONSTELLATION SYSTEM ===== */
class ConstellationRenderer {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.repositories = [];
    this.stars = [];
    this.particles = null;
    this.isInitialized = false;
    
    // Performance tracking
    this.frameCount = 0;
    this.lastTime = 0;
    this.fps = 0;
  }
  
  async init() {
    try {
      await this.setupScene();
      await this.loadRepositoryData();
      this.createStars();
      this.createParticles();
      this.setupControls();
      this.setupEventListeners();
      this.startRenderLoop();
      
      this.isInitialized = true;
      this.hideLoadingScreen();
      showNotification('Constellation initialized successfully', 'success');
    } catch (error) {
      console.error('Failed to initialize constellation:', error);
      showNotification('Failed to initialize constellation', 'error');
    }
  }
  
  setupScene() {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) throw new Error('Canvas element not found');
    
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000011, 1, 5000);
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      10000
    );
    this.camera.position.set(0, 0, 1000);
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    
    // Enable shadows
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    return Promise.resolve();
  }
  
  async loadRepositoryData() {
    // Mock repository data - replace with actual GitHub API calls
    this.repositories = [
      {
        id: 1,
        name: 'HYPERFOCUS-Z...',
        category: 'core',
        position: { x: 0, y: 100, z: 0 },
        color: '#00ffff',
        stars: 15,
        language: 'JavaScript'
      },
      {
        id: 2,
        name: 'gena-stack',
        category: 'core', 
        position: { x: 200, y: 50, z: -100 },
        color: '#00ffff',
        stars: 8,
        language: 'Python'
      },
      {
        id: 3,
        name: 'hi-model-api',
        category: 'core',
        position: { x: -150, y: -50, z: 50 },
        color: '#00ffff', 
        stars: 23,
        language: 'TypeScript'
      },
      {
        id: 4,
        name: 'RAZ-Pi-EYE',
        category: 'creative',
        position: { x: -300, y: 0, z: 100 },
        color: '#8b5cf6',
        stars: 12,
        language: 'Python'
      },
      {
        id: 5,
        name: 'HYPERFOCUS-U...',
        category: 'creative',
        position: { x: 100, y: -200, z: -50 },
        color: '#8b5cf6',
        stars: 31,
        language: 'JavaScript'
      },
      // Add more repositories as needed...
    ];
    
    return Promise.resolve();
  }
  
  createStars() {
    this.repositories.forEach(repo => {
      const geometry = new THREE.SphereGeometry(8, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: repo.color,
        emissive: repo.color,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.9
      });
      
      const star = new THREE.Mesh(geometry, material);
      star.position.set(repo.position.x, repo.position.y, repo.position.z);
      star.userData = repo;
      
      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(12, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: repo.color,
        transparent: true,
        opacity: 0.1
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      star.add(glow);
      
      this.scene.add(star);
      this.stars.push(star);
    });
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    this.scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x00ffff, 1, 2000);
    pointLight.position.set(0, 0, 500);
    this.scene.add(pointLight);
  }
  
  createParticles() {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 2,
      transparent: true,
      opacity: 0.6
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }
  
  setupControls() {
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxDistance = 2000;
      this.controls.minDistance = 100;
    }
  }
  
  setupEventListeners() {
    // Window resize
    window.addEventListener('resize', () => this.handleResize());
    
    // Star click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    this.renderer.domElement.addEventListener('click', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.stars);
      
      if (intersects.length > 0) {
        const selectedStar = intersects[0].object;
        this.showRepositoryInfo(selectedStar.userData);
      }
    });
  }
  
  showRepositoryInfo(repo) {
    const panel = document.getElementById('repo-info-panel');
    if (!panel) return;
    
    document.getElementById('repo-title').textContent = repo.name;
    document.getElementById('repo-description').textContent = repo.description || 'No description available';
    document.getElementById('repo-stars').textContent = `⭐ ${repo.stars}`;
    document.getElementById('repo-language').textContent = `🔧 ${repo.language}`;
    
    const githubLink = document.getElementById('repo-github-link');
    githubLink.href = `https://github.com/welshDog/${repo.name}`;
    
    panel.style.display = 'block';
    showNotification(`Selected: ${repo.name}`, 'info');
  }
  
  startRenderLoop() {
    const animate = (currentTime) => {
      requestAnimationFrame(animate);
      
      // Update performance stats
      this.updatePerformanceStats(currentTime);
      
      // Update controls
      if (this.controls) {
        this.controls.update();
      }
      
      // Animate particles
      if (this.particles) {
        this.particles.rotation.y += 0.001;
      }
      
      // Animate stars (subtle pulse)
      this.stars.forEach((star, index) => {
        const time = currentTime * 0.001;
        star.scale.setScalar(1 + Math.sin(time + index) * 0.1);
      });
      
      // Render scene
      this.renderer.render(this.scene, this.camera);
    };
    
    animate(0);
  }
  
  updatePerformanceStats(currentTime) {
    this.frameCount++;
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      const fpsElement = document.getElementById('fps');
      if (fpsElement) {
        fpsElement.textContent = this.fps;
      }
    }
  }
  
  handleResize() {
    if (!this.camera || !this.renderer) return;
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }
}

/* ===== INITIALIZATION ===== */
let constellation = null;
let draggablePanels = [];

function initializeDraggablePanels() {
  const panelSelectors = [
    '.stats-panel',
    '.hyperfocus-story', 
    '.categories-panel',
    '.accessibility-panel',
    '.repo-info-panel',
    '.minimap',
    '.tour-controls',
    '.sponsors-logo',
    '.hyperfocus-ad'
  ];
  
  panelSelectors.forEach(selector => {
    const panel = document.querySelector(selector);
    if (panel) {
      const draggable = new DraggablePanel(panel);
      draggablePanels.push(draggable);
    }
  });
  
  console.log(`✨ Initialized ${draggablePanels.length} draggable panels`);
  showNotification(`${draggablePanels.length} panels ready to drag!`, 'success');
}

function initializeConstellation() {
  constellation = new ConstellationRenderer();
  constellation.init();
}

// Event Listeners for Layout Controls
document.addEventListener('DOMContentLoaded', function() {
  // Initialize draggable panels
  initializeDraggablePanels();
  
  // Initialize 3D constellation
  setTimeout(() => {
    initializeConstellation();
  }, 1000);
  
  // Layout control buttons
  const resetBtn = document.getElementById('reset-layout-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetPanelPositions);
  }
  
  const saveBtn = document.getElementById('save-layout-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveCurrentLayout);
  }
  
  const toggleBtn = document.getElementById('toggle-all-panels');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleAllPanels);
  }
  
  // Accessibility controls
  setupAccessibilityControls();
  
  // Search functionality
  setupSearchAndFilters();
});

/* ===== ACCESSIBILITY CONTROLS ===== */
function setupAccessibilityControls() {
  const reduceMotionCheckbox = document.getElementById('reduce-motion');
  if (reduceMotionCheckbox) {
    reduceMotionCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    });
  }
  
  const focusModeCheckbox = document.getElementById('focus-mode');
  if (focusModeCheckbox) {
    focusModeCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('focus-mode');
      } else {
        document.body.classList.remove('focus-mode');
      }
    });
  }
  
  const highContrastCheckbox = document.getElementById('high-contrast');
  if (highContrastCheckbox) {
    highContrastCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    });
  }
  
  // Volume sliders
  const ambientSlider = document.getElementById('ambient-volume');
  const ambientValue = document.getElementById('ambient-value');
  if (ambientSlider && ambientValue) {
    ambientSlider.addEventListener('input', (e) => {
      ambientValue.textContent = e.target.value;
    });
  }
  
  const effectsSlider = document.getElementById('effects-volume');
  const effectsValue = document.getElementById('effects-value');
  if (effectsSlider && effectsValue) {
    effectsSlider.addEventListener('input', (e) => {
      effectsValue.textContent = e.target.value;
    });
  }
}

/* ===== SEARCH AND FILTERS ===== */
function setupSearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      filterRepositories(query);
    });
  }
  
  // Category filter buttons
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active class from all buttons
      categoryButtons.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      e.target.classList.add('active');
      
      const category = e.target.dataset.category;
      filterByCategory(category);
    });
  });
  
  // Top filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const filter = e.target.dataset.filter;
      filterByCategory(filter);
    });
  });
}

function filterRepositories(query) {
  if (!constellation || !constellation.stars) return;
  
  constellation.stars.forEach(star => {
    const repo = star.userData;
    const matches = repo.name.toLowerCase().includes(query) ||
                   (repo.description && repo.description.toLowerCase().includes(query));
    
    star.visible = matches;
  });
  
  showNotification(`Filtered repositories: "${query}"`, 'info');
}

function filterByCategory(category) {
  if (!constellation || !constellation.stars) return;
  
  constellation.stars.forEach(star => {
    const repo = star.userData;
    star.visible = category === 'all' || repo.category === category;
  });
  
  showNotification(`Showing: ${category === 'all' ? 'All repositories' : category}`, 'info');
}

/* ===== KEYBOARD SHORTCUTS ===== */
document.addEventListener('keydown', (e) => {
  // ESC - Hide repository info panel
  if (e.key === 'Escape') {
    const infoPanel = document.getElementById('repo-info-panel');
    if (infoPanel) {
      infoPanel.style.display = 'none';
    }
  }
  
  // R - Reset layout
  if (e.key.toLowerCase() === 'r' && e.ctrlKey) {
    e.preventDefault();
    resetPanelPositions();
  }
  
  // H - Toggle all panels
  if (e.key.toLowerCase() === 'h' && e.ctrlKey) {
    e.preventDefault();
    toggleAllPanels();
  }
  
  // F - Focus search
  if (e.key === '/') {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
});

// Export for global access
window.constellation = constellation;
window.draggablePanels = draggablePanels;
window.resetPanelPositions = resetPanelPositions;

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { repositories, categoryConfig } from './data.js';

export class GalaxyScene {
  constructor(canvasId, callbacks = {}) {
    this.callbacks = callbacks;
    this.canvas = document.getElementById(canvasId);
    
    // Core components
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    
    // Objects
    this.repoSpheres = [];
    this.particleSystems = [];
    this.hoveredRepo = null;
    this.selectedRepo = null;
    
    // Interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // State
    this.isMotionReduced = false;
    
    // Performance
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.renderTimes = [];

    this.init();
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
    
    // Bind interaction events
    this.canvas.addEventListener('click', (e) => this.handleMouseClick(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('resize', () => this.handleResize());

    this.animate();
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000000, 50, 300);
    
    // Add subtle nebula background
    const nebulaGeometry = new THREE.SphereGeometry(200, 32, 32);
    const nebulaMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a0a2e,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    this.scene.add(nebula);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    this.camera.position.set(0, 0, 50);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.canvas, 
      antialias: true,
      alpha: true 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 150;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00d4ff, 0.8, 100);
    pointLight1.position.set(-30, 20, 30);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6b9d, 0.6, 80);
    pointLight2.position.set(30, -20, -30);
    this.scene.add(pointLight2);
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
    this.scene.add(starField);
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
    
    const angle = (index / repositories.length) * Math.PI * 8;
    const distance = 15 + (index % 4) * 8;
    const height = (Math.sin(angle * 0.5) * 5) + (Math.random() - 0.5) * 3;
    
    const position = {
      x: Math.cos(angle) * distance,
      y: height,
      z: Math.sin(angle) * distance
    };

    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    
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
    
    sphere.userData = {
      repository: repo,
      originalPosition: { ...position },
      originalScale: 1,
      targetScale: 1,
      pulsePhase: Math.random() * Math.PI * 2,
      isVisible: true,
      originalEmissiveIntensity: 0.2
    };

    const glowGeometry = new THREE.SphereGeometry(radius * 1.3, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    sphere.add(glowSphere);

    this.createParticleSystem(sphere, config.particleColor);

    this.scene.add(sphere);
    this.repoSpheres.push(sphere);
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
    this.particleSystems.push({ system: particleSystem, parent: parentSphere });
  }

  createConnectionLines() {
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    repositories.forEach((repo1, i) => {
      repositories.forEach((repo2, j) => {
        if (i < j && repo1.category === repo2.category && Math.random() > 0.7) {
          const sphere1 = this.repoSpheres[i];
          const sphere2 = this.repoSpheres[j];
          
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
      this.scene.add(lines);
    }
  }

  setupMinimap() {
    const minimapCanvas = document.getElementById('minimap-canvas');
    if (!minimapCanvas) return;
    const minimapCtx = minimapCanvas.getContext('2d');
    
    this.updateMinimap = () => {
      minimapCtx.fillStyle = '#1a1a2e';
      minimapCtx.fillRect(0, 0, 150, 150);
      
      this.repoSpheres.forEach(sphere => {
        if (!sphere.userData.isVisible) return;
        
        const repo = sphere.userData.repository;
        const config = categoryConfig[repo.category];
        
        const x = ((sphere.position.x + 50) / 100) * 150;
        const y = ((sphere.position.z + 50) / 100) * 150;
        
        minimapCtx.fillStyle = `#${config.color.toString(16).padStart(6, '0')}`;
        minimapCtx.beginPath();
        minimapCtx.arc(x, y, 3, 0, 2 * Math.PI);
        minimapCtx.fill();
      });
      
      const camX = ((this.camera.position.x + 50) / 100) * 150;
      const camY = ((this.camera.position.z + 50) / 100) * 150;
      
      minimapCtx.strokeStyle = '#00d4ff';
      minimapCtx.lineWidth = 2;
      minimapCtx.beginPath();
      minimapCtx.arc(camX, camY, 8, 0, 2 * Math.PI);
      minimapCtx.stroke();
    };
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    this.frameCount++;
    this.renderTimes.push(deltaTime);
    if (this.renderTimes.length > 60) this.renderTimes.shift();
    
    if (this.frameCount % 60 === 0) {
      const fps = Math.round(1000 / (this.renderTimes.reduce((a, b) => a + b) / this.renderTimes.length));
      const avgRenderTime = Math.round(this.renderTimes.reduce((a, b) => a + b) / this.renderTimes.length);
      
      const fpsEl = document.getElementById('fps-counter');
      const timeEl = document.getElementById('render-time');
      if (fpsEl) fpsEl.textContent = `FPS: ${fps}`;
      if (timeEl) timeEl.textContent = `Render: ${avgRenderTime}ms`;
    }
    
    this.controls.update();
    this.animateRepositories(currentTime);
    this.updateParticles();
    
    if (this.updateMinimap) {
      this.updateMinimap();
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  animateRepositories(time) {
    this.repoSpheres.forEach((sphere, index) => {
      const userData = sphere.userData;
      
      if (!this.isMotionReduced) {
        const pulseIntensity = userData.originalEmissiveIntensity + Math.sin(time * 0.003 + userData.pulsePhase) * 0.05;
        if (this.hoveredRepo !== sphere) {
          sphere.material.emissiveIntensity = pulseIntensity;
        }
        
        const targetScale = userData.targetScale;
        const currentScale = sphere.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.1;
        sphere.scale.set(newScale, newScale, newScale);
        
        sphere.position.y = userData.originalPosition.y + Math.sin(time * 0.001 + index) * 0.5;
      }
      
      if (userData.isVisible !== sphere.visible) {
        sphere.visible = userData.isVisible;
      }
    });
  }

  updateParticles() {
    if (this.isMotionReduced) return;
    
    this.particleSystems.forEach(({ system, parent }) => {
      if (!parent.visible) return;
      
      const positions = system.geometry.attributes.position.array;
      const velocities = system.geometry.userData.velocities;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
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

  handleMouseClick(event) {
    if (event.target.closest('#ui-overlay')) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.repoSpheres);
    
    if (intersects.length > 0) {
      const clickedSphere = intersects[0].object;
      this.selectRepository(clickedSphere);
    } else {
      this.selectedRepo = null;
      if (this.callbacks.onDeselect) this.callbacks.onDeselect();
    }
  }

  handleMouseMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.repoSpheres);
    
    if (intersects.length > 0) {
      const sphere = intersects[0].object;
      if (this.hoveredRepo !== sphere) {
        this.hoverRepository(sphere);
        this.canvas.style.cursor = 'pointer';
      }
    } else {
      if (this.hoveredRepo) {
        this.unhoverRepository();
        this.canvas.style.cursor = 'default';
      }
    }
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  selectRepository(sphere) {
    this.selectedRepo = sphere;
    const repo = sphere.userData.repository;
    
    if (this.callbacks.onSelect) {
      this.callbacks.onSelect(repo, sphere);
    }
    
    this.flyToRepository(repo.name);
  }

  hoverRepository(sphere) {
    if (this.hoveredRepo && this.hoveredRepo !== sphere) {
      this.unhoverRepository();
    }
    
    this.hoveredRepo = sphere;
    if (!this.isMotionReduced) {
      sphere.userData.targetScale = 1.2;
      sphere.material.emissiveIntensity = 0.4;
    }
  }

  unhoverRepository() {
    if (this.hoveredRepo) {
      if (!this.isMotionReduced) {
        this.hoveredRepo.userData.targetScale = this.hoveredRepo.userData.isVisible ? 1 : 0.1;
        this.hoveredRepo.material.emissiveIntensity = this.hoveredRepo.userData.originalEmissiveIntensity;
      }
      this.hoveredRepo = null;
    }
  }

  flyToRepository(repoName) {
    const sphere = this.repoSpheres.find(s => s.userData.repository.name === repoName);
    if (!sphere) return;
    
    const targetPosition = sphere.position.clone();
    targetPosition.multiplyScalar(1.5);
    
    if (!this.isMotionReduced) {
      this.animateCameraTo(targetPosition);
    } else {
      this.camera.position.copy(targetPosition);
      this.controls.target.copy(sphere.position);
    }
  }

  animateCameraTo(targetPosition) {
    const startPosition = this.camera.position.clone();
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = this.easeInOutCubic(progress);
      
      this.camera.position.lerpVectors(startPosition, targetPosition, easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  resetCamera() {
    if (!this.isMotionReduced) {
      this.animateCameraTo(new THREE.Vector3(0, 0, 50));
    } else {
      this.camera.position.set(0, 0, 50);
      this.controls.target.set(0, 0, 0);
    }
    this.controls.reset();
  }

  setMotionReduced(enabled) {
    this.isMotionReduced = enabled;
    this.controls.autoRotate = !enabled;
  }

  highlightRepositories(matchedRepos) {
    this.repoSpheres.forEach(sphere => {
      const repo = sphere.userData.repository;
      const isMatch = matchedRepos.some(m => m.name === repo.name);
      
      sphere.userData.isVisible = isMatch;
      sphere.visible = isMatch;
      
      if (!this.isMotionReduced) {
        sphere.userData.targetScale = isMatch ? 1.1 : 0.3;
      }
    });
  }

  showAllRepositories() {
    this.repoSpheres.forEach(sphere => {
      sphere.userData.isVisible = true;
      sphere.visible = true;
      if (!this.isMotionReduced) {
        sphere.userData.targetScale = 1;
      }
    });
  }

  filterByCategory(category) {
    this.repoSpheres.forEach(sphere => {
      const repo = sphere.userData.repository;
      const isVisible = category === 'all' || repo.category === category;
      sphere.userData.isVisible = isVisible;
      sphere.visible = isVisible;
      
      if (!this.isMotionReduced) {
        sphere.userData.targetScale = isVisible ? 1 : 0.1;
      }
    });
  }
}

// ======================
// STATE & SETUP
// ======================
const appState = {
    repos: [],
    particles: [],
    selectedRepo: null,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    languages: new Set(),
    debugMode: false,
};

let scene, camera, renderer, controls;
let fps = 0, frameCount = 0, lastFrameTime = 0;

// ======================
// GITHUB API WITH FALLBACK
// ======================
async function fetchAllRepos() {
    const repos = [];
    let page = 1;
    let hasMore = true;
    let apiLimitHit = false;

    while (hasMore) {
        try {
            const response = await fetch(
                `https://api.github.com/users/welshDog/repos?page=${page}&per_page=100&sort=updated`
            );
            
            // Check rate limit
            if (response.status === 403) {
                console.warn('GitHub API rate limited. Using fallback...');
                apiLimitHit = true;
                hasMore = false;
                break;
            }
            
            const data = await response.json();

            if (data.length === 0) {
                hasMore = false;
            } else {
                repos.push(...data);
                page++;
                updateProgress((repos.length / 100) * 100);
                updateStatus(`Loaded ${repos.length} repositories...`);
            }
        } catch (error) {
            console.error('GitHub API error:', error);
            apiLimitHit = true;
            hasMore = false;
        }
    }

    // If API failed, use fallback
    if (apiLimitHit || repos.length === 0) {
        console.warn('API failed or returned 0 repos. Attempting fallback...');
        return await fetchFallbackRepos();
    }

    return repos;
}

// Fallback: Try to load cached repos.json from repo
async function fetchFallbackRepos() {
    try {
        const response = await fetch('./data/repos.json');
        if (response.ok) {
            const data = await response.json();
            console.log(`Using fallback: Loaded ${data.length} repos from cache`);
            updateStatus(`Using cached data (${data.length} repos)`);
            return data;
        }
    } catch (error) {
        console.warn('Fallback also failed:', error);
    }
    // Return empty array - UI will handle gracefully
    return [];
}

// ======================
// THREE.JS SETUP
// ======================
function initThreeJS() {
    const canvas = document.getElementById('galaxy-canvas');
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 1, 1000);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    camera.position.set(0, 50, 150);

    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxDistance = 500;
    controls.minDistance = 50;

    // Lighting
    setupLighting();

    // Starfield Background
    createStarfield();
}

function setupLighting() {
    // Ambient
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    // Directional
    const directional = new THREE.DirectionalLight(0xffffff, 0.6);
    directional.position.set(100, 100, 100);
    directional.castShadow = true;
    scene.add(directional);

    // Point lights for color
    const pointLight1 = new THREE.PointLight(0x00d4ff, 0.4, 300);
    pointLight1.position.set(100, 50, 100);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00d4, 0.3, 300);
    pointLight2.position.set(-100, -50, -100);
    scene.add(pointLight2);
}

function createStarfield() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        transparent: true,
        opacity: 0.6
    });

    const starsVertices = [];
    for (let i = 0; i < 1500; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(starsVertices, 3)
    );

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

// ======================
// PARTICLE CREATION
// ======================
function createRepoParticle(repo, index, total) {
    // Spherical distribution
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 80 + Math.random() * 40;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    // Language colors
    const colorMap = {
        'Python': 0x3776ab,
        'JavaScript': 0xf7df1e,
        'TypeScript': 0x3178c6,
        'HTML': 0xe34c26,
        'CSS': 0x563d7c,
        'Rust': 0xce422b,
        'Go': 0x00add8,
        'Java': 0x007396,
        'Shell': 0x89e051,
        'Ruby': 0xcc342d,
        'C': 0x555555,
        'C++': 0xf34b7d,
        'Swift': 0xffac45,
        'Kotlin': 0xf18e33,
    };
    const color = colorMap[repo.language] || 0x00d4ff;

    // Size based on stars + issues
    const size = Math.max(2, Math.min(8, 2 + (repo.stargazers_count + repo.open_issues_count) / 15));

    // Create mesh
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.4,
        metalness: 0.5,
        roughness: 0.3,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Store data
    mesh.userData = {
        repo: repo,
        originalPos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3
        ),
        phase: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
    };

    scene.add(mesh);
    appState.particles.push(mesh);
}

// ======================
// UI FUNCTIONS
// ======================
function showRepoInfo(repo) {
    const panel = document.getElementById('info-panel');
    document.getElementById('repo-name').textContent = repo.name;
    document.getElementById('repo-desc').textContent = repo.description || 'No description available';
    
    const tags = document.getElementById('repo-tags');
    tags.innerHTML = `
        <span class="tag">${repo.language || 'Unknown'}</span>
        <span class="tag">⭐ ${repo.stargazers_count}</span>
        <span class="tag">🐛 ${repo.open_issues_count}</span>
        <span class="tag">${repo.private ? '🔐 Private' : '🌐 Public'}</span>
    `;
    
    document.getElementById('repo-link').href = repo.html_url;
    panel.classList.add('show');
    appState.selectedRepo = repo;

    // Audio feedback
    if (audioEngine) audioEngine.selectParticle(1.1);
}

function filterByLanguage(language) {
    appState.particles.forEach(particle => {
        const repoLang = particle.userData.repo.language;
        if (language === 'all' || repoLang === language) {
            particle.visible = true;
        } else {
            particle.visible = false;
        }
    });

    // Audio feedback
    if (audioEngine) audioEngine.filterSweep(language);
}

function updateProgress(percent) {
    document.getElementById('progress-fill').style.width = percent + '%';
}

function updateStatus(message) {
    document.getElementById('loading-status').textContent = message;
}

function showDebugInfo(repos) {
    const debugEl = document.getElementById('debug-info');
    if (debugEl) {
        debugEl.textContent = `[DEBUG] Repos loaded: ${repos.length} | Particles: ${appState.particles.length}`;
        debugEl.style.display = 'block';
    }
}

// ======================
// INTERACTION
// ======================
function onCanvasClick(event) {
    appState.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    appState.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    appState.raycaster.setFromCamera(appState.mouse, camera);
    const intersects = appState.raycaster.intersectObjects(appState.particles);

    if (intersects.length > 0) {
        const selectedMesh = intersects[0].object;
        showRepoInfo(selectedMesh.userData.repo);
        highlightParticle(selectedMesh);
        
        if (audioEngine) audioEngine.click(1.2);
    }
}

function highlightParticle(selectedMesh) {
    appState.particles.forEach(particle => {
        particle.material.emissiveIntensity = particle === selectedMesh ? 0.8 : 0.4;
    });
}

function setupEventListeners() {
    // Canvas clicks
    renderer.domElement.addEventListener('click', onCanvasClick);

    // Close info panel
    document.getElementById('close-info').addEventListener('click', () => {
        document.getElementById('info-panel').classList.remove('show');
        if (audioEngine) audioEngine.glitch(0.3);
    });

    // Search
    document.getElementById('search').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        let visibleCount = 0;

        appState.particles.forEach(particle => {
            const repo = particle.userData.repo;
            const matches = 
                repo.name.toLowerCase().includes(query) ||
                (repo.description && repo.description.toLowerCase().includes(query));
            
            particle.visible = matches;
            if (matches) visibleCount++;
        });

        document.getElementById('repos').textContent = `Repos: ${visibleCount}`;

        if (query.length % 3 === 0 && query.length > 0 && audioEngine) {
            audioEngine.click(0.6);
        }
    });

    // Audio toggle
    document.getElementById('audio-toggle').addEventListener('change', (e) => {
        if (audioEngine) {
            audioEngine.enabled = e.target.checked;
            audioEngine.masterGain.gain.value = e.target.checked ? 0.3 : 0;
        }
    });

    // Volume
    document.getElementById('volume').addEventListener('input', (e) => {
        const vol = e.target.value;
        document.getElementById('volume-value').textContent = vol;
        if (audioEngine) {
            audioEngine.effectsGain.gain.value = (vol / 100) * 0.4;
        }
    });

    // Motion reduction
    document.getElementById('motion-reduce').addEventListener('change', (e) => {
        controls.autoRotate = !e.target.checked;
    });

    // Debug toggle (hidden by default)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'd' && e.ctrlKey) {
            appState.debugMode = !appState.debugMode;
            const debugEl = document.getElementById('debug-info');
            if (debugEl) {
                debugEl.style.display = appState.debugMode ? 'block' : 'none';
            }
        }
    });

    // Window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ======================
// ANIMATION LOOP
// ======================
function animate() {
    requestAnimationFrame(animate);

    // FPS counter
    const currentTime = performance.now();
    frameCount++;
    if (currentTime >= lastFrameTime + 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFrameTime = currentTime;
        document.getElementById('fps').textContent = `FPS: ${fps}`;
    }

    // Update particles
    appState.particles.forEach(particle => {
        const userData = particle.userData;
        
        // Floating motion
        userData.phase += 0.01;
        const offset = Math.sin(userData.phase) * 0.1;
        particle.position.copy(userData.originalPos);
        particle.position.addScaledVector(userData.velocity, offset);

        // Rotation
        particle.rotation.x += userData.rotSpeed;
        particle.rotation.y += userData.rotSpeed * 1.5;
    });

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);
}

// ======================
// INITIALIZATION
// ======================
async function init() {
    try {
        // Play startup sound
        if (audioEngine) {
            audioEngine.whoosh();
        }

        // Init Three.js
        initThreeJS();

        // Fetch repos
        const repos = await fetchAllRepos();
        appState.repos = repos;

        // Show debug info if enabled
        if (appState.debugMode) {
            showDebugInfo(repos);
        }

        // Extract languages
        repos.forEach(repo => {
            if (repo.language) appState.languages.add(repo.language);
        });

        // Create particles
        repos.forEach((repo, index) => {
            createRepoParticle(repo, index, repos.length);
        });

        // Create filter buttons
        const filterContainer = document.getElementById('filter-buttons');
        const allBtn = filterContainer.querySelector('[data-lang="all"]');
        
        allBtn.addEventListener('click', () => {
            filterByLanguage('all');
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            allBtn.classList.add('active');
        });

        Array.from(appState.languages).sort().forEach(lang => {
            const count = repos.filter(r => r.language === lang).length;
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.lang = lang;
            btn.textContent = `${lang} (${count})`;
            btn.addEventListener('click', () => {
                filterByLanguage(lang);
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            filterContainer.appendChild(btn);
        });

        // Setup event listeners
        setupEventListeners();

        // Hide loading
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('repos').textContent = `Repos: ${repos.length}`;

        // Play success sound
        if (audioEngine) {
            setTimeout(() => audioEngine.success(), 300);
        }

        // Start animation
        animate();

    } catch (error) {
        console.error('Initialization error:', error);
        updateStatus('❌ Error loading repositories');
        if (audioEngine) audioEngine.error();
    }
}

// Start when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('galaxy-canvas'), antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0a0a0a, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowShadowMap;

camera.position.z = 150;
camera.position.y = 50;

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.enablePan = true;
controls.enableZoom = true;

// App State
const appState = {
    repos: [],
    particles: [],
    selectedRepo: null,
    filteredRepos: [],
    languages: new Set(),
    bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    lines: [],
};

// Performance Monitoring
let lastFrameTime = 0;
let frameCount = 0;
let fps = 0;

// Lighting Setup
function setupLighting() {
    // Ambient light for overall visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Directional light for shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.far = 500;
    scene.add(directionalLight);

    // Point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0x00d4ff, 0.5, 200);
    pointLight1.position.set(100, 50, 100);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00d4, 0.3, 150);
    pointLight2.position.set(-100, -50, -100);
    scene.add(pointLight2);
}

// Create Particle for Each Repo
function createRepoParticle(repo, index, total) {
    // Position in 3D space (spherical distribution)
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;

    const radius = 80 + Math.random() * 40;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    // Determine color based on language
    const colorMap = {
        'Python': 0x3776ab,
        'JavaScript': 0xf7df1e,
        'TypeScript': 0x3178c6,
        'HTML': 0xe34c26,
        'CSS': 0x563d7c,
        'Rust': 0xce422b,
        'Go': 0x00add8,
        'Java': 0x007396,
        'C++': 0x00599c,
        'Shell': 0x89e051,
        'Dockerfile': 0x384d54,
    };
    const color = colorMap[repo.language] || 0x00d4ff;

    // Size based on stars
    const size = 2 + (repo.stargazers_count / 10);

    // Create sphere geometry
    const geometry = new THREE.IcosahedronGeometry(size, 4);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        metalness: 0.6,
        roughness: 0.4,
        wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Store repo data
    mesh.userData = {
        repo: repo,
        originalPosition: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5
        ),
        pulsePhase: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
    };

    scene.add(mesh);
    appState.particles.push(mesh);
}

// Create connection lines between related repos
function createConnectionLines() {
    // Connect Python repos together
    const pythonRepos = appState.particles.filter(p => p.userData.repo.language === 'Python');
    for (let i = 0; i < pythonRepos.length; i++) {
        const nextIdx = (i + 1) % pythonRepos.length;
        const points = [pythonRepos[i].position, pythonRepos[nextIdx].position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0x3776ab,
            transparent: true,
            opacity: 0.2,
            linewidth: 1,
        });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        appState.lines.push(line);
    }
}

// GitHub API Client
class GitHubAPI {
    static async fetchAllRepos(username) {
        const repos = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            try {
                const response = await fetch(
                    `https://api.github.com/users/${username}/repos?page=${page}&per_page=100&sort=updated&direction=desc`
                );
                const data = await response.json();

                if (data.length === 0) {
                    hasMore = false;
                } else {
                    repos.push(...data);
                    page++;
                    const progress = (repos.length / 68) * 100;
                    document.getElementById('loading-bar').style.width = progress + '%';
                    document.getElementById('loading-status').textContent = `Loaded ${repos.length} repositories...`;
                }
            } catch (error) {
                console.error('GitHub API error:', error);
                hasMore = false;
            }
        }

        return repos;
    }
}

// Show Repo Info
function showRepoInfo(repo) {
    // Play select particle sound
    if (audioEngine) audioEngine.selectParticle(1.1);

    const panel = document.getElementById('repo-info-panel');
    document.getElementById('repo-name').textContent = repo.name;
    document.getElementById('repo-language').textContent = `${repo.language || 'Unknown'}`;
    document.getElementById('repo-stars').textContent = `⭐ ${repo.stargazers_count}`;
    document.getElementById('repo-issues').textContent = `🐛 ${repo.open_issues_count}`;
    document.getElementById('repo-description').textContent = repo.description || 'No description available';
    document.getElementById('repo-updated').textContent = `Updated: ${new Date(repo.updated_at).toLocaleDateString()}`;
    document.getElementById('repo-status').textContent = repo.private ? '🔒 Private' : '🌐 Public';
    document.getElementById('repo-github-link').href = repo.html_url;

    // Check if bookmarked
    const isBookmarked = appState.bookmarks.some(b => b.id === repo.id);
    document.getElementById('bookmark-icon').textContent = isBookmarked ? '✅' : '🔖';

    panel.classList.remove('hidden');
    appState.selectedRepo = repo;
}

// Handle Mouse Clicks
function onMouseClick(event) {
    // Play click sound
    if (audioEngine) audioEngine.click(1.2);

    appState.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    appState.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    appState.raycaster.setFromCamera(appState.mouse, camera);
    const intersects = appState.raycaster.intersectObjects(appState.particles);

    if (intersects.length > 0) {
        const selectedMesh = intersects[0].object;
        showRepoInfo(selectedMesh.userData.repo);
        highlightParticle(selectedMesh);
    }
}

// Highlight Selected Particle
function highlightParticle(mesh) {
    appState.particles.forEach(p => {
        if (p.userData.repo.language) {
            const colorMap = {
                'Python': 0x3776ab,
                'JavaScript': 0xf7df1e,
                'TypeScript': 0x3178c6,
            };
            p.material.emissiveIntensity = p === mesh ? 1 : 0.3;
        }
    });
}

// Filter by Language
function filterByLanguage(language) {
    // Play filter sound
    if (audioEngine) audioEngine.filterSweep(language);

    appState.particles.forEach(particle => {
        if (language === 'all' || particle.userData.repo.language === language) {
            particle.visible = true;
        } else {
            particle.visible = false;
        }
    });
}

// Handle Bookmark
function toggleBookmark() {
    if (!appState.selectedRepo) return;

    const idx = appState.bookmarks.findIndex(b => b.id === appState.selectedRepo.id);
    if (idx > -1) {
        appState.bookmarks.splice(idx, 1);
        document.getElementById('bookmark-icon').textContent = '🔖';
        if (audioEngine) audioEngine.glitch(0.4);
    } else {
        appState.bookmarks.push(appState.selectedRepo);
        document.getElementById('bookmark-icon').textContent = '✅';
        if (audioEngine) audioEngine.success();
    }
    localStorage.setItem('bookmarks', JSON.stringify(appState.bookmarks));
    updateBookmarksList();
}

// Update Bookmarks List
function updateBookmarksList() {
    const list = document.getElementById('bookmarks-list');
    list.innerHTML = '';
    appState.bookmarks.forEach(repo => {
        const item = document.createElement('div');
        item.className = 'bookmark-item';
        item.innerHTML = `
            <strong>${repo.name}</strong>
            <small>${repo.language || 'Unknown'}</small>
            <a href="${repo.html_url}" target="_blank">View</a>
        `;
        list.appendChild(item);
    });
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Performance monitoring
    const currentTime = performance.now();
    frameCount++;
    if (currentTime >= lastFrameTime + 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFrameTime = currentTime;
        document.getElementById('fps-counter').textContent = `FPS: ${fps}`;
    }

    // Update particles
    const renderStart = performance.now();
    appState.particles.forEach((particle, index) => {
        const userData = particle.userData;

        // Gentle floating motion
        userData.pulsePhase += 0.01;
        const pulse = Math.sin(userData.pulsePhase) * 0.1;
        particle.position.copy(userData.originalPosition);
        particle.position.addScaledVector(userData.velocity, pulse);

        // Rotation
        particle.rotation.x += userData.rotationSpeed;
        particle.rotation.y += userData.rotationSpeed * 1.5;
    });

    // Update connection lines
    appState.lines.forEach(line => {
        line.geometry.verticesNeedUpdate = true;
    });

    // Render
    controls.update();
    renderer.render(scene, camera);

    const renderEnd = performance.now();
    document.getElementById('render-time').textContent = `Render: ${(renderEnd - renderStart).toFixed(1)}ms`;
}

// Initialize Application
async function initApp() {
    setupLighting();

    // Add background starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.5,
    });
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(starsVertices), 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Play startup whoosh
    if (audioEngine) {
        audioEngine.whoosh();
        setTimeout(() => {
            if (audioEngine) audioEngine.notification();
        }, 300);
    }

    try {
        // Fetch repositories
        const repos = await GitHubAPI.fetchAllRepos('welshDog');
        appState.repos = repos;

        // Extract languages
        repos.forEach(repo => {
            if (repo.language) appState.languages.add(repo.language);
        });

        // Create particles for each repo
        repos.forEach((repo, index) => {
            createRepoParticle(repo, index, repos.length);
        });

        // Create connection lines
        createConnectionLines();

        // Create language filter buttons
        const filterContainer = document.getElementById('languageFilters');
        const allBtn = document.querySelector('[data-language="all"]');
        allBtn.addEventListener('click', () => {
            filterByLanguage('all');
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            allBtn.classList.add('active');
        });

        Array.from(appState.languages).sort().forEach(lang => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.language = lang;
            btn.textContent = `${lang} (${repos.filter(r => r.language === lang).length})`;
            btn.addEventListener('click', () => {
                filterByLanguage(lang);
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            filterContainer.appendChild(btn);
        });

        // Hide loading
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('repo-count').textContent = `Repos: ${repos.length}`;

        // Play success sound
        if (audioEngine) audioEngine.success();

        // Setup event listeners
        document.getElementById('reset-view').addEventListener('click', () => {
            controls.reset();
            if (audioEngine) audioEngine.whoosh();
        });

        document.getElementById('close-info').addEventListener('click', () => {
            document.getElementById('repo-info-panel').classList.add('hidden');
            if (audioEngine) audioEngine.glitch(0.3);
        });

        document.getElementById('toggle-bookmarks').addEventListener('click', () => {
            document.getElementById('bookmarks-panel').classList.toggle('hidden');
            if (audioEngine) audioEngine.click(0.8);
        });

        document.getElementById('bookmark-btn').addEventListener('click', toggleBookmark);
        document.addEventListener('click', onMouseClick);

        // Zoom sound effects
        let lastZoom = 0;
        renderer.domElement.addEventListener('wheel', (e) => {
            const now = Date.now();
            if (now - lastZoom > 100) {
                const direction = e.deltaY > 0 ? 'out' : 'in';
                if (audioEngine) audioEngine.zoom(direction);
                lastZoom = now;
            }
        }, { passive: false });

        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            let visibleCount = 0;
            appState.particles.forEach(particle => {
                const repo = particle.userData.repo;
                const matches = repo.name.toLowerCase().includes(query) ||
                    (repo.description && repo.description.toLowerCase().includes(query));
                particle.visible = matches;
                if (matches) visibleCount++;
            });
            // Play subtle click for search
            if (query.length % 3 === 0 && query.length > 0 && audioEngine) {
                audioEngine.click(0.6);
            }
        });

        // Update bookmarks list
        updateBookmarksList();

        // Start animation
        animate();

    } catch (error) {
        console.error('Init error:', error);
        document.getElementById('loading-status').textContent = '❌ Error loading repositories';
        if (audioEngine) audioEngine.error();
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start app
initApp();

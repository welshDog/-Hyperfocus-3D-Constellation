const fs = require('fs');
const path = require('path');

const vendorDir = path.join(process.cwd(), 'vendor', 'three');
const modulePath = path.join(vendorDir, 'three.module.js');
const controlsDir = path.join(vendorDir, 'examples', 'jsm', 'controls');
const controlsPath = path.join(controlsDir, 'OrbitControls.js');

fs.mkdirSync(controlsDir, { recursive: true });

const sourceModule = path.join(process.cwd(), 'node_modules', 'three', 'build', 'three.module.js');
const sourceControls = path.join(process.cwd(), 'node_modules', 'three', 'examples', 'jsm', 'controls', 'OrbitControls.js');

fs.copyFileSync(sourceModule, modulePath);
fs.copyFileSync(sourceControls, controlsPath);

console.log('Cached Three.js assets in vendor/three');

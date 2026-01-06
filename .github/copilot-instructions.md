# GitHub Copilot Instructions

## Project Overview

Hyperfocus-3D-Constellation is the world's most advanced 3D repository visualization designed for neurodivergent minds. This is a pure HTML/CSS/JavaScript project with no build step required.

## Code Style & Conventions

### JavaScript
- **ES6+ syntax**: Use const/let (prefer const), arrow functions, template literals
- **No external dependencies**: Keep library count minimal (Three.js + OrbitControls only)
- **Semantic naming**: Use clear, descriptive variable and function names
- **Comments**: Include comments for complex 3D math, Web Audio API calculations, and non-obvious logic
- **Async/Await**: Use async/await for all async operations (GitHub API calls)
- **Error handling**: Always try/catch async code; log errors to console

### HTML
- **Semantic HTML**: Use `<nav>`, `<main>`, `<section>`, `<button>` for accessibility
- **ARIA attributes**: Add `aria-label`, `aria-pressed`, `role` where needed
- **No inline styles**: Keep CSS in `<style>` blocks, not inline
- **Data attributes**: Use `data-*` attributes for JavaScript hooks
- **Comments**: Document non-obvious HTML structure

### CSS
- **CSS Variables**: Use `--color-*`, `--size-*`, `--shadow-*` variables
- **Mobile-first**: Write mobile styles first, then media queries for larger screens
- **Flexbox/Grid**: Prefer modern layout methods
- **Dark theme**: Default to dark theme (#0a0a0a background)
- **No vendor prefixes**: Use standard CSS (prefixes handled by browser)

## Architecture Principles

### Separation of Concerns
- **audio.js**: Web Audio API synthesis only (no DOM manipulation)
- **app.js**: Three.js 3D scene, event handling, state management
- **index.html**: Markup and CSS only (logic in JS files)

### Three.js Best Practices
- Dispose of geometries/materials when removing objects
- Use `instancedGeometry` for large particle counts (future optimization)
- Keep scene graph clean (avoid deeply nested objects)
- Comment complex vector/quaternion math

### Web Audio API
- Use `audioContext.currentTime` for timing (not Date.now())
- Always create `gain` nodes for volume control
- Use filter nodes for tone shaping
- Comment frequency values (include musical notes where relevant)

### Accessibility
- **Keyboard navigation**: All interactive elements must be keyboard-accessible
- **ARIA labels**: All buttons and interactive elements must have aria-labels
- **Color contrast**: Minimum 4.5:1 for normal text
- **Motion**: Respect `prefers-reduced-motion` media query
- **Focus management**: Visible focus indicators on all interactive elements

## Neurodivergent-First Considerations

### For ADHD
- Provide clear visual feedback (sounds, animations, color changes)
- No time limits or pop-ups that disappear
- Allow hyperfocus by removing distractions

### For Dyslexia
- Use sans-serif fonts (already: system fonts)
- Consider `font-variant-numeric: tabular-nums` for consistency
- High color contrast (already implemented)

### For Autism/Sensory
- Avoid flashing (nothing >3Hz)
- Offer "Soft Mode" (less saturation, softer colors)
- Respect `prefers-reduced-motion` setting

## Testing Standards

### Unit Tests (Jest)
- Test audio.js functions: whoosh(), click(), glitch(), etc.
- Mock Web Audio API where necessary
- Coverage target: >70% lines

### E2E Tests (Playwright)
- Test keyboard navigation (arrow keys, Tab, Enter)
- Test mouse interactions (click, drag, scroll)
- Test accessibility features (motion reduction toggle)
- Test search and filter functionality

## Performance Standards

- **FPS**: 60 on mid-range devices (MacBook Air M2, equivalent)
- **Load time**: <3 seconds on 4G
- **Memory**: <150MB initial load
- **Lighthouse score**: 90+ target
- **Particles rendered**: 68 repos with smooth animation

## File Structure

```
.
├── index.html              # Main HTML (includes CSS)
├── app.js                  # Three.js app + interaction logic
├── audio.js                # Web Audio API synthesis
├── package.json            # NPM scripts and dependencies
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
├── LICENSE                # MIT license
├── CONTRIBUTING.md        # Contributing guidelines
├── CODE_OF_CONDUCT.md     # Community standards
├── CHANGELOG.md           # Version history
├── SECURITY.md            # Security policy
├── API.md                 # API documentation
├── .github/
│   ├── ISSUE_TEMPLATE/    # Issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── workflows/         # GitHub Actions
│   └── copilot-instructions.md  # This file
├── docs/
│   ├── accessibility.md   # WCAG 2.1 AA compliance
│   ├── architecture.md    # Technical architecture
│   └── performance.md     # Benchmark data
├── data/
│   ├── repositories.json  # Repo cache (optional)
│   └── categories.json    # Language categories
├── tests/
│   ├── audio.test.js      # Audio unit tests
│   ├── app.test.js        # App unit tests
│   └── e2e/               # Playwright tests
└── reports/
    ├── lighthouse.json    # Performance reports
    └── accessibility.html # A11y audit results
```

## Common Tasks

### Adding a new audio effect
1. Create method in `AudioEngine` class
2. Add JSDoc comments with frequency ranges
3. Test with: `audioEngine.newEffect()`
4. Add to test suite

### Adding a new 3D visualization feature
1. Create Three.js objects/materials in `app.js`
2. Add event listener in `setupEventListeners()`
3. Update accessibility (keyboard + ARIA)
4. Add E2E test
5. Update `docs/architecture.md`

### Fixing an accessibility issue
1. Check WCAG 2.1 AA criteria in `docs/accessibility.md`
2. Test with keyboard navigation
3. Test with screen reader (NVDA/JAWS)
4. Add E2E test to prevent regression

## Tools & Environment

- **Node.js**: 18.x or 20.x
- **Package manager**: npm
- **Testing**: Jest + Playwright
- **Linting**: ESLint (airbnb-base config)
- **Formatting**: Prettier
- **CI/CD**: GitHub Actions

## When Using Copilot

- ✅ Ask for specific functions ("create a particle system for N objects")
- ✅ Ask for Web Audio effects
- ✅ Ask for accessibility improvements
- ✅ Ask for tests and documentation
- ❌ Don't ask for external library suggestions (we're library-minimal)
- ❌ Don't ask for build tool setup (static HTML only)
- ❌ Don't add TypeScript (keep it pure JS with JSDoc)

## References

- **Three.js**: https://threejs.org/docs/
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **ESLint Airbnb**: https://github.com/airbnb/javascript
- **Playwright**: https://playwright.dev/docs/intro

## Questions?

Refer to:
1. `README.md` for project overview
2. `docs/architecture.md` for technical details
3. Existing code comments in `app.js` and `audio.js`
4. Test files in `tests/` for usage examples

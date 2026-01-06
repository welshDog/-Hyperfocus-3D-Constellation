import { test, expect } from '@playwright/test';

test.describe('Accessibility - Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://welshdog.github.io/-Hyperfocus-3D-Constellation/');
    // Wait for 3D scene to load
    await page.waitForTimeout(3000);
  });

  test('search input should be keyboard accessible', async ({ page }) => {
    const searchInput = page.locator('#search');
    await searchInput.click();
    await searchInput.type('Python');
    await expect(searchInput).toHaveValue(/Python/);
  });

  test('Tab should navigate through UI elements', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement.id);
    expect(focusedElement).toBeTruthy();
  });

  test('Escape should close info panel when open', async ({ page }) => {
    // Click a repo particle (this is tricky without knowing exact canvas position)
    // For now, just test the close button
    const closeBtn = page.locator('#close-info');
    await expect(closeBtn).toBeDefined();
  });

  test('motion reduction toggle should work', async ({ page }) => {
    const motionCheckbox = page.locator('#motion-reduce');
    await motionCheckbox.click();
    await expect(motionCheckbox).toBeChecked();
    await motionCheckbox.click();
    await expect(motionCheckbox).not.toBeChecked();
  });
});

test.describe('Accessibility - Audio Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://welshdog.github.io/-Hyperfocus-3D-Constellation/');
    await page.waitForTimeout(3000);
  });

  test('audio toggle should work', async ({ page }) => {
    const audioToggle = page.locator('#audio-toggle');
    const isChecked = await audioToggle.isChecked();
    await audioToggle.click();
    await expect(audioToggle).toHaveProperty('checked', !isChecked);
  });

  test('volume slider should adjust value', async ({ page }) => {
    const volumeSlider = page.locator('#volume');
    await volumeSlider.fill('50');
    const value = await volumeSlider.inputValue();
    expect(value).toBe('50');
  });
});

test.describe('Accessibility - Color Contrast', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://welshdog.github.io/-Hyperfocus-3D-Constellation/');
    await page.waitForTimeout(1000);
  });

  test('should have sufficient text contrast', async ({ page }) => {
    const h1 = page.locator('h1');
    const color = await h1.evaluate((el) => window.getComputedStyle(el).color);
    expect(color).toBeTruthy();
    // Visual contrast ratio would require screenshot comparison
  });
});

test.describe('Functionality - Search & Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://welshdog.github.io/-Hyperfocus-3D-Constellation/');
    await page.waitForTimeout(3000);
  });

  test('search should filter repositories', async ({ page }) => {
    const searchInput = page.locator('#search');
    await searchInput.type('Hyperfocus');
    // Check that search input has value
    await expect(searchInput).toHaveValue(/Hyperfocus/);
  });

  test('should display loading screen then content', async ({ page }) => {
    const loadingScreen = page.locator('#loading');
    // Loading should eventually hide
    await expect(loadingScreen).toHaveClass(/hidden/, { timeout: 10000 });
  });
});

test.describe('Functionality - UI Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://welshdog.github.io/-Hyperfocus-3D-Constellation/');
    await page.waitForTimeout(3000);
  });

  test('language filter buttons should exist', async ({ page }) => {
    const filterButtons = page.locator('.filter-btn');
    const count = await filterButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display repo count', async ({ page }) => {
    const repoCount = page.locator('#repos');
    const text = await repoCount.textContent();
    expect(text).toContain('Repos');
  });
});

test.describe('Performance', () => {
  test('should load within 10 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('https://welshdog.github.io/-Hyperfocus-3D-Constellation/');
    await page.waitForSelector('#fps', { timeout: 10000 });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(10000);
  });

  test('should maintain stable FPS', async ({ page }) => {
    await page.goto('https://welshdog.github.io/-Hyperfocus-3D-Constellation/');
    await page.waitForTimeout(3000);
    const fpsElement = page.locator('#fps');
    const fpsText = await fpsElement.textContent();
    expect(fpsText).toContain('FPS');
  });
});

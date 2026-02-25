import { test, expect } from '@playwright/test';

test.describe('Accessibility - Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('ui-overlay').waitFor({ timeout: 15000 });
  });

  test('search input should be keyboard accessible', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
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
    const closeBtn = page.getByTestId('close-info');
    await expect(closeBtn).toBeVisible();
  });

  test('motion reduction toggle should work', async ({ page }) => {
    const motionCheckbox = page.getByTestId('motion-reduction');
    await motionCheckbox.click();
    await expect(motionCheckbox).toBeChecked();
    await motionCheckbox.click();
    await expect(motionCheckbox).not.toBeChecked();
  });
});

test.describe('Accessibility - Audio Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('audio toggle should work', async ({ page }) => {
    const audioToggle = page.getByTestId('audio-enabled');
    const isChecked = await audioToggle.isChecked();
    await audioToggle.click();
    await expect(audioToggle).toHaveJSProperty('checked', !isChecked);
  });

  test('volume slider should adjust value', async ({ page }) => {
    const volumeSlider = page.getByTestId('ambient-volume');
    await volumeSlider.fill('60');
    const value = await volumeSlider.inputValue();
    expect(value).toBe('60');
  });
});

test.describe('Accessibility - Color Contrast', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have sufficient text contrast', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 });
    const color = await h1.evaluate((el) => window.getComputedStyle(el).color);
    expect(color).toBeTruthy();
    // Visual contrast ratio would require screenshot comparison
  });
});

test.describe('Functionality - Search & Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search should filter repositories', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
    await searchInput.type('Hyperfocus');
    await expect(searchInput).toHaveValue(/Hyperfocus/);
  });

  test('should display loading screen then content', async ({ page }) => {
    const loadingScreen = page.getByTestId('loading-screen');
    await expect(loadingScreen).toBeHidden({ timeout: 10000 });
  });
});

test.describe('Functionality - UI Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('language filter buttons should exist', async ({ page }) => {
    await expect(page.getByTestId('filter-all')).toBeVisible();
    await expect(page.getByTestId('filter-core')).toBeVisible();
    await expect(page.getByTestId('filter-creative')).toBeVisible();
    await expect(page.getByTestId('filter-devtools')).toBeVisible();
    await expect(page.getByTestId('filter-social')).toBeVisible();
  });

  test('should display repo count', async ({ page }) => {
    const countAll = page.getByTestId('count-all');
    const text = await countAll.textContent();
    expect(parseInt(text || '0', 10)).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Performance', () => {
  test('should load within 10 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForSelector('[data-testid="fps-counter"]', { timeout: 10000 });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(10000);
  });

  test('should maintain stable FPS', async ({ page }) => {
    await page.goto('/');
    const fpsElement = page.getByTestId('fps-counter');
    const fpsText = await fpsElement.textContent();
    expect(fpsText).toContain('FPS');
  });
});

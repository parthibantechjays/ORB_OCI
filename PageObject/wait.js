// waitForPageLoad.js
const { expect } = require('@playwright/test');

async function waitForPageLoad(page) {
  // Wait for the page load status element to have the text 'Loaded'
  await page.waitForFunction(() => {
    const element = document.querySelector('#spnPageLoadStatus');
    return element && element.textContent === 'Loaded';
  }, { timeout: 600000 });

  // Assert the text content of the element
  const statusText = await page.locator('#spnPageLoadStatus').textContent();
  expect(statusText).toBe('Loaded');
  console.log("Page loaded successfully");
}

module.exports = { waitForPageLoad };

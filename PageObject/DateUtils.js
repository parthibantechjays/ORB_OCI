// DateUtils.js

async function selectFromDateWithTextbox(page) {
    // Calculate the date two weeks before
    const twoWeeksBefore = new Date();
    twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14);
  
    // Format the date
    const formattedTwoWeeksBefore = twoWeeksBefore.toLocaleString('default', { month: 'long' }) + ' ' + twoWeeksBefore.getDate() + ',';
  
    // Select "From Date"
    await page.getByRole('textbox', { name: 'From Date' }).click();
    const currentMonth = new Date().getMonth();
    const startMonth = twoWeeksBefore.getMonth();
    if (startMonth > currentMonth) {
      await page.locator('.flatpickr-next-month').first().click();
    }
    await page.getByLabel(formattedTwoWeeksBefore).first().click();
  }
  
  async function selectFromDateWithFilter(page) {
    // Calculate the date two weeks before
    const twoWeeksBefore = new Date();
    twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14);
  
    // Format the date
    const formattedTwoWeeksBefore = twoWeeksBefore.toLocaleString('default', { month: 'long' }) + ' ' + twoWeeksBefore.getDate() + ',';
  
    // Select "From Date"
    await page.locator('div').filter({ hasText: /^AssetsCustomTo2LiveSearchResetSave New Search$/ }).getByPlaceholder('From Date').click();
    const currentMonth = new Date().getMonth();
    const startMonth = twoWeeksBefore.getMonth();
    if (startMonth > currentMonth) {
      await page.getByRole('img').nth(2).click();
    }
    await page.getByLabel(formattedTwoWeeksBefore).first().click();
  }
  
  module.exports = { selectFromDateWithTextbox, selectFromDateWithFilter };
  
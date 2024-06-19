class SearchActions {
    constructor(page) {
      this.page = page;
    }
  
    async SearchclickAssetDashboard() {
      await this.page.getByRole('button', { name: 'Search' }).nth(1).click();
      await this.page.getByRole('button', { name: 'Yes' }).click();
    }

    async SearchclickGeofenceWorkspace() {
        await this.page.getByRole('button', { name: 'Search', exact: true }).click();
    }
    async SearchclickLocationTrackingReport() {
        await this.page.getByRole('button', { name: 'Search', exact: true }).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
    }

    async SearchclickReeferStatusReport() {
        await this.page.getByRole('button', { name: 'Search', exact: true }).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
    }
}
export default SearchActions ;
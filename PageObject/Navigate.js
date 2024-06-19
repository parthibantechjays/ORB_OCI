// DashboardActions.js
class DashboardActions {
  constructor(page) {
    this.page = page;
  }

  async navigateToAssetDashboard() {
    await this.page.getByText('Asset MonitoringAsset').click();
    await this.page.getByRole('link', { name: 'Asset Dashboard' }).click();
    await this.page.getByRole('tooltip', { name: 'Screen Resolution The card' }).getByRole('button').click();
    await this.page.getByRole('button', { name: 'Got it' }).click();
  }

  async navigateToGeofenceWorkspace() {
    await this.page.getByText('Asset MonitoringAsset').click();
    await this.page.getByRole('link', { name: 'Geofence Workspace' }).click();
    await this.page.getByRole('button', { name: 'Got it' }).click();
  } 
  
  async navigateToLocationTrackingReport() {
    await this.page.getByText('Asset MonitoringAsset').click();
    await this.page.getByRole('link', { name: 'Location Tracking Grid' }).click();
    await this.page.getByRole('button', { name: 'Got it' }).click();
  }

  async navigateToReeferStatusReport() {
    await this.page.getByText('Reefer ManagementReefer').click();
    await this.page.getByRole('link', { name: 'Reefer Status Report' }).click();
    await this.page.getByRole('button', { name: 'Got it' }).click();
  }

  async navigateToFleetDashboard() {
    await this.page.getByText('ReportsDetention ReportDwell').click();
    await this.page.getByRole('link', { name: 'Fleet Dashboard' }).click();
  }
  
}

export default DashboardActions;

import { test, expect } from '@playwright/test';
import { login } from '../PageObject/login';
import DashboardActions from '../PageObject/Navigate';
import SearchActions from '../PageObject/Search';
import { waitForPageLoad } from '../PageObject/wait';
import { selectFromDateWithTextbox } from '../PageObject/DateUtils';
import PerformanceMetricsCollector from '../Common/PerformanceMetricsCollector';

test('OCI_GeofenceWorkspace', async ({ page }) => {
    console.log("OCI_GeofenceWorkspace");

    // Set the test timeout to 200 seconds
    test.setTimeout(200000);
    
    // Login to the application and record the start time
    const start = await login(page);

    // Navigate to Geofence Workspace
    await new DashboardActions(page).navigateToGeofenceWorkspace();

    // Select "From Date" as two weeks prior to the current date for a two-week report.
    await selectFromDateWithTextbox(page);

    // Perform the search action on the Geofence Workspace
    await new SearchActions(page).SearchclickGeofenceWorkspace();

    // Wait until the page is fully loaded
    await waitForPageLoad(page);
  
    // Collect and write performance metrics to InfluxDB
    const performanceMetricsCollector = new PerformanceMetricsCollector();
    await performanceMetricsCollector.collectAndWriteMetrics(page, start, 'Geofence Workspace');

    // Close the page after the test is complete
    await page.close();
});

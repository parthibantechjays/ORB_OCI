import { test } from '@playwright/test';
import { login } from '../PageObject/login';
import { waitForPageLoad } from '../PageObject/wait';
import DashboardActions from '../PageObject/Navigate';
import SearchActions from '../PageObject/Search';
import PerformanceMetricsCollector from '../Common/PerformanceMetricsCollector';
import { selectFromDateWithTextbox } from '../PageObject/DateUtils';

test('OCI_LocationTrackingReport', async ({ page }) => {
    console.log("OCI_LocationTrackingReport");
    
    // Set the test timeout to 10 minutes
    test.setTimeout(600000);
   
    // Login to the application and record the start time
    const start = await login(page);

    // Navigate to Location Tracking Report
    await new DashboardActions(page).navigateToLocationTrackingReport();

    // Select "From Date" as two weeks prior to the current date for a two-week report.
    await selectFromDateWithTextbox(page);
    
    // Perform the search action on the Location Tracking Report
    await new SearchActions(page).SearchclickLocationTrackingReport();
    
    // Wait until the page is fully loaded
    await waitForPageLoad(page);

    // Collect and write performance metrics to InfluxDB
    const performanceMetricsCollector = new PerformanceMetricsCollector();
    await performanceMetricsCollector.collectAndWriteMetrics(page, start, 'Location Tracking Report');

    // Close the page after the test is complete
    await page.close();
});

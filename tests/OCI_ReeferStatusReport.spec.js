import { test, expect } from '@playwright/test';
import { login } from '../PageObject/login';
import { waitForPageLoad } from '../PageObject/wait';
import DashboardActions from '../PageObject/Navigate';
import SearchActions from '../PageObject/Search';
import { selectFromDateWithTextbox } from '../PageObject/DateUtils';
import PerformanceMetricsCollector from '../Common/PerformanceMetricsCollector';

test('OCI_ReeferStatusReport', async ({ page }) => {
    console.log("OCI_ReeferStatusReport");
   
    // Set the test timeout to 200 seconds
    test.setTimeout(600000);
    
    // Login to the application and record the start time
    const start = await login(page);
    
    // Navigate to Reefer Status Report
    await new DashboardActions(page).navigateToReeferStatusReport();
    
    // Select "From Date" as two weeks prior to the current date for a two-week report.
    await selectFromDateWithTextbox(page);
    
    // Perform the search action on the Reefer Status Report
    await new SearchActions(page).SearchclickReeferStatusReport();
    
    // Wait until the page is fully loaded
    await waitForPageLoad(page);
    
    // Collect and write performance metrics to InfluxDB
    const performanceMetricsCollector = new PerformanceMetricsCollector();
    await performanceMetricsCollector.collectAndWriteMetrics(page, start, 'Reefer Status Report');
    
    // Close the page after the test is complete
    await page.close();
});

const { InfluxDB, Point } = require('@influxdata/influxdb-client');
class PerformanceMetricsCollector {
  constructor() {
    this.influxConfig = {
      url: 'http://localhost:8086',
      token: 'Xkz0HgAastfyuqa8F285wWw7Z0Q13as3bFgpG88UI5PopUdrF3NPFH2s0nBVNgFscjYB-QxnD0vxNkCi3e0mBw==',
      org: 'Techjays',
      bucket: 'demo'
    };
    this.influxDB = new InfluxDB({
      url: this.influxConfig.url,
      token: this.influxConfig.token,
    });
    this.writeApi = this.influxDB.getWriteApi(this.influxConfig.org, this.influxConfig.bucket, 'ns');
  }
  async collectAndWriteMetrics(page, start, testName) {
    const end = performance.now();
    const durationInMillis = end - start;
    const durationInSeconds = durationInMillis / 1000; // Convert to seconds
    console.log(`Total script execution time: ${durationInSeconds.toFixed(2)} seconds`);
    // Collect performance metrics using the Performance API within the same context
    const metrics = await page.evaluate((durationInSeconds) => {
      performance.mark('start');
      // Simulate some delay to ensure we have a measurable performance metric
      return new Promise(resolve => setTimeout(() => {
        performance.mark('end');
        performance.measure('pageLoad', 'start', 'end');
        const navigationEntries = performance.getEntriesByType('navigation')[0];
        const measureEntries = performance.getEntriesByName('pageLoad')[0];
        resolve({
          navigationStart: navigationEntries.startTime,
          loadEventEnd: navigationEntries.loadEventEnd,
          domContentLoadedEventEnd: navigationEntries.domContentLoadedEventEnd,
          duration: navigationEntries.duration,
          totalDuration: measureEntries.duration,
          scriptExecutionTime: durationInSeconds // Include script execution time in seconds
        });
      }, 1000)); // 1 second delay to ensure we can measure the performance mark
    }, durationInSeconds); // Pass the script execution time in seconds to the evaluate function
    console.log('Metrics collected:', metrics);
    // Create a new point and add all metrics including the script execution time in seconds
    const point = new Point('page_load')
      .tag('page', testName)
      .floatField('loadEventEnd', metrics.loadEventEnd)
      .floatField('domContentLoadedEventEnd', metrics.domContentLoadedEventEnd)
      .floatField('duration', metrics.duration)
      .floatField('totalDuration', metrics.totalDuration)
      .floatField('scriptExecutionTime', metrics.scriptExecutionTime); // Use the script execution time in seconds from metrics
    // Write the metrics to InfluxDB
    this.writeApi.writePoint(point);
    await this.writeApi.close();
    console.log('Performance metrics written to InfluxDB');
  }
}
module.exports = PerformanceMetricsCollector;
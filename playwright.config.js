// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({ //this variable is holding all the information

  //what test to run when you trigger your configuration file
  testDir: './tests',
  //timeout the time that the page takes to load all the elements
  //timeout applicable for all elements
  timeout: 40*1000,
  //timeout for assertions expect
   expect :{
    timeout: 5000,
   },
  reporter : 'html',
  //browser to use
  use: {
    //chrome
    browserName : 'chromium',
    //safari
    //browserName : 'webkit',
    headless : false
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
  },

  /* Configure projects for major browsers */

});
module.exports = config


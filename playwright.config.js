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

  // Folder where the tests are located
  testDir: './tests',
  //timeout the time that the page takes to load all the elements
   // Maximum time for each test
  timeout: 40*1000,
  //timeout for assertions expect
   expect :{
    timeout: 5000,
   },

  // Retry failed tests once
  retries: 1,

  //html report
  reporter : 'html',
  //browser to use

  use: {
    headless: false,
  },
  projects: [
    {
        name: 'chromium',
        use: {
            browserName: 'chromium'
        },
    },
    {
        name: 'firefox',
        use: {
            browserName: 'firefox'
        },
    },
],
});
module.exports = config


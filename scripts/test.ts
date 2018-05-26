process.on('unhandledRejection', err => {
    throw err;
});

import chalk from 'chalk';
import { spawnSync } from 'child_process';
import fs from 'fs-extra';

import paths from './paths';
import { checkChildStatus } from './utils';

const args = process.argv.slice(2);

const testServer = args.includes('server');
const testClient = args.includes('client');

// If no selection specified run tests for both
const testAll = (!testServer && !testClient) || (testServer && testClient);

const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';

// Watch mode shouldn't be used when testing both
const noWatch = testAll || args.includes('--no-watch');

// Necessary to prevent react-scripts test from running in watch mode
process.env.CI = noWatch ? 'true' : undefined;

/* Start test process */

console.log(
    `Running tests for ${chalk.cyan(testServer || testAll ? 'server' : '')}${
        testAll ? ' and ' : ''
    }${chalk.cyan(testClient || testAll ? 'client' : '')}.\n`,
);

if (testServer || testAll) {
    const jest = require.resolve('.bin/jest');
    // const jest = require.resolve('jest');
    console.log(jest);
    const result = spawnSync(jest, noWatch ? [] : ['--watch'], { stdio });

    checkChildStatus(result.status, 'jest');
}

if (testClient || testAll) {
    // const testScript = require.resolve(paths.reactScripts + '/test');
    // const result = spawnSync('node', [testScript], {
    //     cwd: paths.appClient,
    //     stdio,
    // });

    const useYarn = fs.existsSync(paths.yarnLockFile);
    const packageManager = useYarn ? 'yarn' : 'npm';
    const result = spawnSync(`${packageManager} run test`, [], {
        cwd: paths.appClient,
        shell: true,
        stdio,
    });

    checkChildStatus(result.status, 'react-scripts test');
}

console.log('Finished running tests.\n');

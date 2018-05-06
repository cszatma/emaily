process.on('unhandledRejection', err => {
    throw err;
});

import chalk from 'chalk';
import { spawnSync } from 'child_process';
import fs from 'fs-extra';

import paths from './paths';
import { checkChildStatus } from './utils';

const args = process.argv.slice(2);

const buildServer = args.includes('server');
const buildClient = args.includes('client');

// If no selection is specified build both
const buildAll = buildServer === buildClient;

const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';

/* Start build process */

console.log(chalk.cyan('Build started.'));
console.log(
    `Building ${chalk.cyan(buildServer || buildAll ? 'server' : '')}${
        buildAll ? ' and ' : ''
    }${chalk.cyan(buildClient || buildAll ? 'client' : '')}.\n`,
);

// Empty the build directory
fs.emptyDirSync(paths.appBuild);

if (buildServer || buildAll) {
    console.log('Running tsc...');

    const TSC = require.resolve('typescript/bin/tsc');
    const result = spawnSync(TSC, ['-p', paths.appTsBuildConfig], {
        stdio,
    });

    checkChildStatus(result.status, 'tsc');

    console.log(chalk.green('Successfully built the server!\n'));
}

if (buildClient || buildAll) {
    console.log('Running react-scripts build...');

    const buildScript = require.resolve(paths.reactScripts + '/build');

    const result = spawnSync('node', [buildScript], {
        cwd: paths.appClient,
        stdio,
    });

    checkChildStatus(result.status, 'react-scripts-ts build');

    console.log(chalk.green('Successfully built the client!\n'));

    // Move the client to the build directory
    console.log(`Moving the built client to ${chalk.cyan(paths.appBuild)}\n`);

    if (args.includes('--keep-client')) {
        fs.mkdirpSync(paths.appBuildClient);
        fs.copySync(paths.appClientBuild, paths.appBuildClient);
    } else {
        fs.moveSync(paths.appClientBuild, paths.appBuildClient);
    }
}

console.log(chalk.green('Build complete!'));
console.log(`Application as available at ${chalk.cyan(paths.appBuild)}\n`);

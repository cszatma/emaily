/* tslint:disable:object-literal-sort-keys */

process.on('unhandledRejection', err => {
    throw err;
});

import chalk from 'chalk';
import { spawnSync } from 'child_process';

import paths from './paths';
import { checkChildStatus } from './utils';

const args = process.argv.slice(2);

const startServer = args.includes('server');
const startClient = args.includes('client');

// If no selection is specified start both
const startAll = startServer === startClient;

const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';
const errorHandler = (error: any) =>
    console.log(chalk.red('An error occurred. ' + error));

/* Being start process */
console.log(
    `Starting ${chalk.cyan(startServer || startAll ? 'server' : '')}${
        startAll ? ' and ' : ''
    }${chalk.cyan(startClient || startAll ? 'client' : '')}.\n`,
);

if (startAll) {
    const concurrently = require.resolve('concurrently');
    const serverProgram = getProgram('server');
    const clientProgram = getProgram('client');

    const concurrentlyArgs = [
        `"${serverProgram.command} ${serverProgram.args.join(' ')}"`,
        `"cd ${paths.appClient} && ${clientProgram.command} ${
            clientProgram.args
        }"`,
        '--names',
        'Server,Client',
        '-c',
        'red,blue',
    ];

    const result = spawnSync(concurrently, concurrentlyArgs, { stdio });

    checkChildStatus(result.status, 'concurrently');
    console.log(chalk.green('Finished running the server and the client.\n'));
} else if (startServer) {
    const program = getProgram('server');
    const result = spawnSync(program.command, program.args, {
        stdio,
    });

    checkChildStatus(result.status, program.command);
    console.log(chalk.green('Finished running the server.\n'));
} else if (startClient) {
    const program = getProgram('client');
    const result = spawnSync(program.command, program.args, {
        cwd: paths.appClient,
        stdio,
    });

    checkChildStatus(result.status, 'react-scripts-ts start');
    console.log(chalk.green('Finished running the client.\n'));
}

interface Program {
    command: string;
    args: string[];
}

function getProgram(name: string): Program {
    switch (name) {
        case 'server':
            const NODEMON = require.resolve('nodemon/bin/nodemon');
            return {
                command: NODEMON,
                args: [paths.appIndexTs, '--exec', 'ts-node'],
            };
        case 'client':
            const startScript = require.resolve(paths.reactScripts + '/start');
            return { command: 'node', args: [startScript] };
        default:
            throw new Error(`Cannot get program for ${name}.`);
    }
}

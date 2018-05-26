/* tslint:disable:object-literal-sort-keys */

process.on('unhandledRejection', err => {
    throw err;
});

import chalk from 'chalk';
import { spawnSync } from 'child_process';
import path from 'path';

import paths from './paths';
import { checkChildStatus } from './utils';

const args = process.argv.slice(2);

// Setup useful variables
const includesServer = args.includes('server');
const includesClient = args.includes('client');

// If no selection is specified start both
const startAll = includesServer === includesClient;
const startServer = startAll || includesServer;
const startClient = startAll || includesClient;

const programs = {
    server: 'server',
    client: 'client',
    concurrently: 'concurrently',
};

const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';

/* Being start process */
console.log(
    `Starting ${chalk.cyan(startServer ? 'server' : '')}${
        startAll ? ' and ' : ''
    }${chalk.cyan(startClient ? 'client' : '')}.\n`,
);

if (startServer) {
    const program = getProgram(programs.concurrently);
    const result = spawnSync(program.command, program.args, { stdio });

    checkChildStatus(result.status, 'concurrently');
    console.log(
        chalk.green(
            `Finished running the server${
                startClient ? 'and the client' : ''
            }.\n`,
        ),
    );
} else if (includesClient) {
    const program = getProgram(programs.client);
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

// Returns the program name and arguments
function getProgram(name: string): Program {
    switch (name) {
        case programs.server:
            return {
                command: require.resolve('nodemon/bin/nodemon'),
                args: [paths.appIndexTs, '--exec', 'ts-node'],
            };
        case programs.client:
            return {
                command: 'node',
                args: [require.resolve(paths.reactScripts + '/start')],
            };
        case programs.concurrently:
            const server = getProgram(programs.server);
            const client = startClient && getProgram(programs.client);

            return {
                command: require.resolve('concurrently'),
                args: [
                    `"${server.command} ${server.args.join(' ')}"`,
                    ...(client
                        ? [
                              `"cd ${paths.appClient} && ${client.command} ${
                                  client.args
                              }"`,
                          ]
                        : []),
                    path.resolve(__dirname, 'sendgrid_webhook.sh'),
                    '--names',
                    `Server,${client ? 'Client' : ''},LocalTunnel`,
                    '-c',
                    `red,${client ? 'blue' : ''},yellow`,
                ],
            };
        default:
            throw new Error(`Cannot get program for ${name}.`);
    }
}

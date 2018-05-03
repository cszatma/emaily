#!/usr/bin/env node

'use strict';

const { spawnSync } = require('child_process');

const TS_NODE = require.resolve('ts-node/dist/bin');

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
    x => x === 'build' || x === 'start' || x === 'test',
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

switch (script) {
    case 'build':
    case 'start': {
        const result = spawnSync(
            TS_NODE,
            nodeArgs
                .concat(require.resolve(`./${script}.ts`))
                .concat(args.slice(scriptIndex + 1)),
            { stdio: 'inherit' },
        );

        if (result.signal) {
            if (result.signal === 'SIGKILL') {
                console.log(
                    'The build failed because the process exited too early. ' +
                        'This probably means the system ran out of memory or someone called ' +
                        '`kill -9` on the process.',
                );
            } else if (result.signal === 'SIGTERM') {
                console.log(
                    'The build failed because the process exited too early. ' +
                        'Someone might have called `kill` or `killall`, or the system could ' +
                        'be shutting down.',
                );
            }

            return process.exit(1);
        }

        return process.exit(result.status);
    }
    default:
        return console.log('Unknown script "' + script + '".');
}

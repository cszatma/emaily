// @flow

import chalk from 'chalk';

/**
 * Logs messages to the console in development mode.
 * Works the same as console.log except that messages are only outputed if
 * process.env.NODE is not equal to production.
 * @param message The message to log.
 * @param optionalParams Any additional options to be passed.
 */
const log: LogFunction = (message: string, ...optionalParams: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(
            message,
            optionalParams && optionalParams.length > 0 ? optionalParams : '',
        );
    }
};

type Color =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white'
    | 'gray';

const colors: Color[] = [
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'gray',
];

colors.forEach((color: string) => {
    log[color] = (message: string, ...optionalParams: any[]) =>
        // $FlowExpectedError
        log(chalk[color](message, optionalParams));
});

type LogFunction = (message: string, ...optionalParams: any[]) => void;

type DevUtils = {
    log: LogFunction & { [Color]: LogFunction },
};

const devUtils: DevUtils = {
    log,
};

export default devUtils;
export type { Color, LogFunction, DevUtils };

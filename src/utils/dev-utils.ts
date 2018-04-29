import chalk from 'chalk';

/**
 * Logs messages to the console in development mode.
 * Works the same as console.log except that messages are only outputed if
 * process.env.NODE is not equal to production.
 * @param message The message to log.
 * @param optionalParams Any additional options to be passed.
 */
function logFunction(message: string, ...optionalParams: any[]) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(
            message,
            optionalParams && optionalParams.length > 0 ? optionalParams : '',
        );
    }
}

const colors = [
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

type LogFunction = ((message: string, ...optionalParams: any[]) => void) & {
    black: LogFunction;
    red: LogFunction;
    green: LogFunction;
    yellow: LogFunction;
    blue: LogFunction;
    magenta: LogFunction;
    cyan: LogFunction;
    white: LogFunction;
    gray: LogFunction;
};

interface DevUtils {
    log: LogFunction;
}

const log = logFunction as LogFunction;

const devUtils: DevUtils = {
    log,
};

export default devUtils;
export { LogFunction, DevUtils };

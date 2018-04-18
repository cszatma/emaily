// @flow

/**
 * Logs messages to the console in development mode.
 * Works the same as console.log except that messages are only outputed if
 * process.env.NODE is not equal to production.
 * @param message The message to log.
 * @param options Any additional options to be passed.
 */
function log(message: string, ...options: any[]) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(message, options && options.length > 0 ? options : '');
    }
}

export default {
    log,
};

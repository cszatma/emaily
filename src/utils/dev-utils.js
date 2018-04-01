// @flow

function log(message: string, ...options?: any[]) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(message, options && options.length > 0 ? options : '');
    }
}

export default {
    log,
};

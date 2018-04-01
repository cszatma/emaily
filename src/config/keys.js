// @flow

let envKeys;

if (process.env.NODE_ENV === 'production') {
    envKeys = require('./prod').default;
} else {
    envKeys = require('./dev').default;
}

export default envKeys;

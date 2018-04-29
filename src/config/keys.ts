export interface Keys {
    googleClientID: string;
    googleClientSecret: string;
    mongoURI: string;
    cookieKey: string;
    stripePublishableKey: string;
    stripeSecretKey: string;
    sendGridKey: string;
    redirectDomain: string;
}

let envKeys: Keys;

if (process.env.NODE_ENV === 'production') {
    envKeys = require('./prod').default;
} else {
    envKeys = require('./dev').default;
}

export default envKeys;

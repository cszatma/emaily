module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:flowtype/recommended"
    ],
    "rules": {
        "indent": [
            "off",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
        "flowtype/delimiter-dangle": [
            "error",
            "always-multiline"
        ],
        "camelcase": ["error"]
    },
    "plugins": [
        "flowtype"
    ]
};

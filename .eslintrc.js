module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "class-property"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error", // 檢查 Hook 的規則
        "react-hooks/exhaustive-deps": "warn", // 檢查 effect 的依賴
        "react/jsx-filename-extension": [0]
    }
};
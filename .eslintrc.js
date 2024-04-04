module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:storybook/recommended'],
    parserOptions: {
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
        ],
        'react/react-in-jsx-scope': 'off'
    },
    overrides: [
        {
            files: ['src/**/*'],
            parserOptions: {
                parser: '@babel/eslint-parser',
                sourceType: 'module',
                requireConfigFile: false
            },
            env: {
                browser: true
            }
        }
    ],
    globals: {
        $: true,
        require: true,
        process: true,
        module: true
    }
};

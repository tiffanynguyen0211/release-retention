module.exports = {
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true, // Defines things like process.env when generating through node
    },
    parser: '@typescript-eslint/parser', // Uses typescript-eslint transforms.
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    root: true, // For configuration cascading.
    settings: {
        react: {
            version: 'detect', // Detect react version
        },
        'import/resolver': {
            node: {
                paths: ['.'],
                extensions: ['.js', '.jsx', '.tsx', '.ts'],
            },
        },
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/recommended', // https://www.npmjs.com/package/eslint-plugin-import
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:jest/recommended',
        // recommned by prettier to work with https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
        // make sure this is always the last element in the array.
        'plugin:prettier/recommended',
    ],
    plugins: ['simple-import-sort', 'extra-rules', 'react-hooks'],
    rules: {
        'extra-rules/no-commented-out-code': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-unused-vars': 'off', // recommended for eslint with TS: https://stackoverflow.com/questions/57802057/eslint-configuring-no-unused-vars-for-typescript
        '@typescript-eslint/no-var-requires': 'off',
        'no-use-before-define': 'off', // note you must disable the base rule as it can report incorrect errors
        '@typescript-eslint/no-use-before-define': ['error'],
        'simple-import-sort/imports': 'error',
        'newline-before-return': 'error',
        'simple-import-sort/exports': 'error',
        'react/react-in-jsx-scope': 'off',
        'no-underscore-dangle': 'off',
        'react/prop-types': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton'],
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            { peerDependencies: true },
        ],
        'import/no-cycle': [2, { maxDepth: 1 }],
    },
    overrides: [],
};

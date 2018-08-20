module.exports = wallaby => ({
    files: ['src/**/*.js', '!src/**/*.test.js'],

    tests: ['src/**/*.test.js'],

    env: {
        type: 'node',
        runner: 'node'
    },

    testFramework: 'jest',
    compilers: {
        '**/*.js': wallaby.compilers.babel()
    }
});

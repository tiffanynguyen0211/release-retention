// based on suggest nextjs jest config https://github.com/vercel/next.js/blob/canary/examples/with-jest/jest.config.js
module.exports = {
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$':
            '<rootDir>/node_modules/tsdx/node_modules/ts-jest',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/.jest/jest-setup.ts'],
    moduleNameMapper: {
        '^.+\\.(jpg|jpeg|png|gif|webp|avif)$':
            '<rootDir>/.jest/__mocks__/fileMock.js',
        '.jest/jest-setup': '<rootDir>/.jest/jest-setup.ts',
        '^.+\\.(css|scss)$': '<rootDir>/.jest/__mocks__/styleMock.js',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    ],
    collectCoverage: true,
    coverageReporters: ['json', 'html'],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[jt]s?(x)'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    coveragePathIgnorePatterns: ['./src/index.tsx'],
};

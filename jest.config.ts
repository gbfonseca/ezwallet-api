export default {
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*protocols.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/migrations/**',
    '!<rootDir>/src/**/entities/**',


  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};

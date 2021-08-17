export default {
  roots: [
    '<rootDir>/src/',
  ],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },

};

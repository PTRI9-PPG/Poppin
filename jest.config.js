module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setUpTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // set any css file or image files to the mock file, which is just an empty object. Won't care about these when testing, set them to empty object
    '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/client/src/mocks/mock.js',
    '.(css|less|scss)$': '<rootDir>/client/src/mocks/mock.js',
  },
};

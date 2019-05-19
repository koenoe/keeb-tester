module.exports = {
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js?$': 'babel-jest',
  },
  setupFiles: [],
  modulePaths: ['src'],
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
  ],
};

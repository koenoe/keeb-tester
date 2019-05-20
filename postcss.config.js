const cssnanoConfig = {
  autoprefixer: false, // Comes with cssnext already
  discardUnused: true,
  reduceIdents: false,
  zindex: false,
};

module.exports = () => ({
  plugins: {
    'postcss-import': {
      addModulesDirectories: ['.'],
    },
    'postcss-preset-env': {},
    'postcss-flexbugs-fixes': {},
    cssnano: cssnanoConfig,
  },
});

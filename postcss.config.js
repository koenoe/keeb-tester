const cssnanoConfig = {
  autoprefixer: false, // Comes with cssnext already
  // zindex: false, // cssnano couldn't handle x-index correctly
  // reduceIdents: false, // cssnano interfered and made bugs related to keyframe naming
};

module.exports = () => ({
  plugins: {
    'postcss-import': {
      addModulesDirectories: ['.'],
    },
    'postcss-cssnext': {},
    'postcss-flexbugs-fixes': {},
    cssnano: cssnanoConfig,
  },
});

const package =  require('./package.json');

const BABEL_ENV = process.env.BABEL_ENV;
console.log(process.env.BABEL_ENV);
const isESM = BABEL_ENV === 'es';

module.exports = {
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        modules: isESM ? false : 'commonjs',
        "targets": {
          "esmodules": isESM,
          "browsers": package.browserslist,
        }
      }
    ]
  ],
  "plugins": [
    '@babel/plugin-proposal-class-properties',
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": isESM
      }
    ]
  ]
};

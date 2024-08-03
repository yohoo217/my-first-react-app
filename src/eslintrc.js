module.exports = {
    root: true,
    extends: ['react-app', 'react-app/jest'],
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ['@babel/preset-react']
      }
    }
  };
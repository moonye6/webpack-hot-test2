/**
 * app启动文件，兼容ES6
 * Date: 2016.10.31
 * Author: moonye
 */
/* eslint-disable import/no-extraneous-dependencies */
require('babel-core/register')({
  presets: [
    'es2015',
    'stage-0'
  ]
});
/* eslint-disable import/no-extraneous-dependencies */
require('babel-polyfill');

require('./server');

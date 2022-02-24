const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js('resources/js/app.js', 'public/js')
  .react()
  .sass('resources/sass/app.scss', 'public/css')
  .postCss('resources/css/app.css', 'public/css')
  .sourceMaps(false, 'source-map')
  .webpackConfig(require('./webpack.config'))
  .browserSync({
    proxy: 'app.test',
  });

if (mix.inProduction()) {
  mix.version();
}

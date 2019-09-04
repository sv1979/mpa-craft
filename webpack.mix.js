let mix = require('laravel-mix');

mix
    .js('src/js/app.js', 'web/assets/dist/app.js')
    .sass('src/sass/app.scss', 'web/assets/dist/app.css')
    .sourceMaps()
    .setPublicPath('web');
    
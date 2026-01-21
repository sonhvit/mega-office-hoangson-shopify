// Webpack configuration

const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

// Construct entries to process: css, sass & js files
const entriesObject = glob.sync('./src/scss/entry/**.scss').reduce(
  (acc, p) => {
    const name = /.\/scss\/entry\/(.*).scss/gm.exec(p)[1]
    acc[`${name}.autostyle`] = path.resolve(__dirname, `src/scss/entry/${name}.scss`)
    return acc
  },
  glob.sync('./src/js/entry/**.js').reduce((acc, p) => {
    const name = /.\/js\/entry\/(.*).js/gm.exec(p)[1]
    acc[`${name}.autojs`] = path.resolve(__dirname, `src/js/entry/${name}.js`)
    return acc
  }, {})
)

// eslint-disable-next-line no-console
console.log('Webpack - entryObj to be processed', entriesObject)

module.exports = {
  // Enable different configuration modes based on Environment -> NODE_ENV
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // Inline source-maps for development only.
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  entry: entriesObject,
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        // CSS/SCSS/SASS
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                silenceDeprecations: ['import'],
                outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded'
              }
            }
          }
        ]
      },
      {
        // JavaScript files
        test: /\.js$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/env'] }
          },
          'source-map-loader'
        ]
      },
      {
        // JSON files
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].js',
    publicPath: ''
  }
}

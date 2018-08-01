const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res) => {
    const html = `
    <!DOCTYPE html>
     <html>
       <head>
         <meta charset="utf-8">
         <title>Minimal Hot Reload</title>
       </head>
     <body>
       <div id="react-root" />
       <script src="/dist/bundle.js"></script>
     </body>
    </html>`
    res.send(html)
})

app.listen(8080, (err) => {
    if (err) {
        return console.error(err) // eslint-disable-line no-console
    }
    console.log('Listening at http://localhost:8080') // eslint-disable-line no-console
})
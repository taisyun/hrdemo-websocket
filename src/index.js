import makeStore from './server/store'
import startServer from './server/server'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import http from 'http'
import httpProxy from 'http-proxy'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.config.js'
import morgan from 'morgan'

export const store = makeStore()


const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT
const host = process.env.HOSTNAME ?  process.env.HOSTNAME : '0.0.0.0'
const app = express()
const httpServer = http.Server(app)
const proxy = httpProxy.createProxyServer({});

startServer(store,httpServer)

app.use(morgan('combined'))

if (!isDeveloping) {
  app.use(express.static(__dirname + '/dist'))
}

if (isDeveloping) {
  const compiler = webpack(config)

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }))

  app.use(webpackHotMiddleware(compiler))
}

var hrdemo = express.Router();

hrdemo.get('*', function (req, res) {
  proxy.web(req, res, {
    target: 'http://localhost:8091/hrdemo',
    secure: false
  });
});

app.use('/hrdemo', hrdemo);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

httpServer.listen(port, host, (err) => {
  if (err) {
    throw(err)
  }
})

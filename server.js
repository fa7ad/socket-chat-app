const http = require('http')
const path = require('path')
const cors = require('cors')
const socketio = require('socket.io')
const morgan = require('morgan')
const Express = require('express')

const app = new Express()

app.use(morgan('short'))
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  ;(function () {
    const webpack = require('webpack')
    const webpackConf = require('./webpack.config')
    const devMiddleware = require('webpack-dev-middleware')

    const compiler = webpack(webpackConf)

    app.use(
      devMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConf.output.publicPath
      })
    )
  })()
}

app.use(Express.static(path.resolve(__dirname, 'public')))

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', function () {
  console.log(this)
})

server.listen(5000, function () {
  console.log('Server running on http://localhost:%s/', server.address().port)
})

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

const socketUsers = []
const msgHistory = []

io.on('connection', function (socket) {
  socket.on('new message', message => {
    const msg = {
      name: socket.name,
      text: message.text,
      time: message.time
    }
    msgHistory.push(msg)
    this.emit('new message', msg)
  })

  socket.on('add user', name => {
    if (socketUsers.indexOf(name) !== -1) return

    Object.assign(socket, { name })
    socketUsers.push(name)

    this.emit('user joined', socketUsers)
    socket.emit('old message', msgHistory.slice(-5))
  })

  socket.on('disconnect', () => {
    const userIdx = socketUsers.indexOf(socket.name)
    if (userIdx !== -1) socketUsers.splice(userIdx, 1)
    this.emit('user left', socketUsers)
  })
})

server.listen(5000, function () {
  console.log('Server running on http://localhost:%s/', server.address().port)
})

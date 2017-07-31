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

io.on('connection', function (socket) {
  console.log('new connection')
  let addedUser = false

  socket.on('new message', function (message) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: message.text,
      time: message.time
    })
  })

  socket.on('add user', function (username) {
    if (addedUser) return

    Object.assign(socket, {username})
    socketUsers.push(username)
    addedUser = true

    socket.broadcast.emit('user joined', {
      username: socket.username,
      users: socketUsers
    })
  })

  socket.on('disconnect', function () {
    console.log('ded')
    if (addedUser) {
      const userIdx = socketUsers.indexOf(socket.username)
      if (userIdx !== -1) socketUsers.splice(userIdx, 1)

      socket.broadcast.emit('user left', {
        username: socket.username,
        users: socketUsers
      })
    }
  })
})

server.listen(5000, function () {
  console.log('Server running on http://localhost:%s/', server.address().port)
})

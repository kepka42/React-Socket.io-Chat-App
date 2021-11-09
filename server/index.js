const DBConnection = require('./db/pg');

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server, {
      cors: {
        origin: '*'
      }
    }),
    cors = require('cors')

const log = console.log
const dbConnection = new DBConnection()
const registerMessageHandlers = require('./handlers/messageHandlers')
const registerUserHandlers = require('./handlers/userHandlers')

const onConnection = (socket) => {
  log('User connected')

  const { roomId } = socket.handshake.query
  socket.roomId = roomId

  socket.join(roomId)

  registerMessageHandlers(io, socket)
  registerUserHandlers(io, socket)

  socket.on('disconnect', () => {
    log('User disconnected')
    socket.leave(roomId)
  })
}

io.on('connection', onConnection)

// REST API
app.use(cors())

app.get('/rooms', (req, res) => {
  const rooms = dbConnection.getRooms()
  rooms.then(rows => {
    res.send(rows)
  }).catch(() => {
    res.error()
  })
})

const PORT = process.env.PORT || 8081
server.listen(PORT, () => {
  console.log(`Server ready. Port: ${PORT}`)
})
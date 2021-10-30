const http = require('http')
const ioServer = require('socket.io')
const express = require('express')
const DbConnection = require('./db/pg');


const server = http.createServer()
const io = ioServer(server, {
  cors: {
    origin: '*'
  }
})
const dbConnection = new DbConnection()

const log = console.log

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

const PORT_WS = process.env.PORT_WS || 5000
server.listen(PORT_WS, () => {
  console.log(`WS Server ready. Port: ${PORT_WS}`)
})

// REST API

const cors = require('cors')
const expressApp = express()
expressApp.use(cors())

expressApp.get('/rooms', (req, res) => {
  const rooms = dbConnection.getRooms()
  res.send(rooms)
})

const PORT_API = process.env.PORT_API || 5001
expressApp.listen(PORT_API, () => {
  log(`API Server ready. Port ${PORT_API}`)
})

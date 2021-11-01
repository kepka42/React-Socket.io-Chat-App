const { nanoid } = require('nanoid')
const moment = require('moment')

const DbConnection = require('../db/pg')

const dbConnection = new DbConnection()

module.exports = (io, socket) => {
  const getMessages = () => {
    const roomId = socket.roomId
    const messages = dbConnection.getMessages(roomId)

    messages.then((res) => {
      console.log(res)
      io.in(roomId).emit('messages', res)
    })
  }

  const addMessage = (message) => {
    dbConnection.saveMessage(socket.roomId, {
      messageId: nanoid(8),
      createdAt: moment().unix(),
      ...message
    }).then(() => {
      getMessages()
    })
  }

  socket.on('message:get', getMessages)
  socket.on('message:add', addMessage)
}

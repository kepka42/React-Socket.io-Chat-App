let users = {}

module.exports = (io, socket) => {
  const getUsers = () => {
    if (!(socket.roomId in users)) {
      return
    }

    const usersInRoom = Object.values(users[socket.roomId])
    io.in(socket.roomId).emit('users', usersInRoom)
  }

  const addUser = ({ username, userId }) => {
    if (!(socket.roomId in users)) {
      users[socket.roomId] = []
    }

    if (!users[socket.roomId][userId]) {
      users[socket.roomId][userId] = { username, online: true }
    } else {
      users[socket.roomId][userId].online = true
    }
    getUsers()
  }

  const removeUser = (userId) => {
    if (!(socket.roomId in users)) {
      return
    }

    if (!users[socket.roomId][userId]) {
      return
    }

    users[socket.roomId][userId].online = false
    getUsers()
  }

  socket.on('user:get', getUsers)
  socket.on('user:add', addUser)
  socket.on('user:leave', removeUser)
}

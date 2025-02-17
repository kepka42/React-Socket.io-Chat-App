import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
// hooks
import { useLocalStorage, useBeforeUnload, getUsername } from 'hooks'
import { SERVER_URL } from 'config';

export const useChat = (roomId) => {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const [userId] = useLocalStorage('userId', nanoid(8))
  const username = getUsername()

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId }
    })

    socketRef.current.emit('user:add', { username, userId })

    socketRef.current.on('users', (users) => {
      setUsers(users)
    })

    socketRef.current.emit('message:get')

    socketRef.current.on('messages', (messages) => {
      const newMessages = messages.map((msg) =>
        msg.userId === userId ? { ...msg, currentUser: true } : msg
      )
      setMessages(newMessages)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomId, userId, username])

  const sendMessage = ({ messageText, senderName }) => {
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderName
    })
  }

  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId)
  })

  return { users, messages, sendMessage }
}

import { useParams } from 'react-router-dom'
// hooks
import { getUsername, useChat } from 'hooks'
// components
import { MessageForm } from './MessageForm'
import { MessageList } from './MessageList'
import { UserList } from './UserList'
// styles
import { Container } from 'react-bootstrap'

export function ChatRoom() {
  const { roomId } = useParams()
  const username = getUsername()
  const { users, messages, sendMessage } = useChat(roomId)

  return (
    <Container>
      <h2 className='text-center'>Room: {roomId === 'job' ? 'Job' : 'Free'}</h2>
      <UserList users={users} />
      <MessageList messages={messages} />
      <MessageForm username={username} sendMessage={sendMessage} />
    </Container>
  )
}

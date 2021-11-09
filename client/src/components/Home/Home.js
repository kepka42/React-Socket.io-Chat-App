import React from 'react'
import { Link } from 'react-router-dom'
// styles
import { Form, Button } from 'react-bootstrap'
import {getRooms, setUsername, getUsername} from "../../hooks";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setUsername = setUsername

    this.state = {
      username: getUsername(),
      roomId: '',
      rooms: [],
    };
    this.linkRef = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeRoom = this.handleChangeRoom.bind(this)
  }

  componentDidMount() {
    getRooms().then(data => {
      this.setState({
        rooms: data,
        roomId: data[0].id,
      })
    })
  }

  handleChangeName(e) {
    this.setState({
      username: e.target.value,
    })
    this.setUsername(e.target.value)
  }

  handleChangeRoom(e) {
    this.setState({
      roomId: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.linkRef.current.click()
  }

  render() {
    return (
      <Form
        className='mt-5'
        style={{ maxWidth: '320px', margin: '0 auto' }}
        onSubmit={this.handleSubmit}
      >
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control value={this.state.username} onChange={this.handleChangeName} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Room:</Form.Label>
          <Form.Control as='select' value={this.state.roomId} onChange={this.handleChangeRoom}>
            { this.state.rooms.map((room, i) => {
              return (
                <option key={i} value={room.id}>{room.name}</option>
              )
            })}
          </Form.Control>
        </Form.Group>
        {this.state.username.trim() && (
          <Button variant='success' as={Link} to={`/${this.state.roomId}`} ref={this.linkRef}>
            Chat
          </Button>
        )}
      </Form>
    );
  }
}


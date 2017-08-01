import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import './ChatBox.css'
import People from './People'
import History from './History'

class ChatBox extends Component {
  state = {
    message: '',
    rerender: null
  }

  render () {
    const { data } = this.props
    return (
      <div className='ChatBox'>
        <People names={data.names} />
        <History messages={data.messages} />
        <div className='MessageInput'>
          <textarea
            onChange={e => this.setState({ message: e.target.value })}
            cols='30'
            rows='5'
            value={this.state.message}
          />
          <button onClick={this.sendMessage}>
            Send
          </button>
        </div>
      </div>
    )
  }

  sendMessage = e => {
    if (this.state.message.length > 1) {
      this.props.io.emit('new message', {
        name: this.props.data.name,
        time: Date.now(),
        text: this.state.message
      })
      this.setState({ message: '' })
    }
  }

  componentDidMount () {
    const { data, io } = this.props
    io.on('user joined', names => {
      data.names = names
    })
    io.on('user left', names => {
      data.names = names
    })
    io.on('new message', message => {
      data.messages.push(message)
    })
    io.on('old message', messages => Object.assign(data, {messages}))
  }
}

export default inject('data', 'io')(observer(ChatBox))

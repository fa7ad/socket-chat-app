import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import './ChatBox.css'

class ChatBox extends Component {
  state = {
    message: ''
  }

  render () {
    const { data } = this.props
    return (
      <div className='ChatBox'>
        <div className='People'>
          {data.name.length > 1
            ? <div className='Person'>
              <img
                src='//lorempixel.com/50/50/people'
                alt={data.name}
                className='avatar'
                />
              <b>{data.name}</b>
            </div>
            : ''}
        </div>
        <div className='History'>
          {data.messages.map((el, idx) => (
            <div className='MessageShow' key={idx}>
              <div className='Name'>{el.name}</div>
              <div className='Time'>
                {new Date(el.time).toLocaleTimeString()}
              </div>
              <div className='Text'>{el.message}</div>
            </div>
          ))}
        </div>
        <div className='MessageInput'>
          <textarea
            onChange={e => this.setState({ message: e.target.value })}
            cols='30'
            rows='5'
            value={this.state.message}
          />
          <button
            onClick={e => {
              this.state.message.length > 1 &&
                data.messages.push({
                  name: data.name,
                  time: Date.now(),
                  message: this.state.message
                }) &&
                this.setState({ message: '' })
            }}
          >
            Send
          </button>
        </div>
      </div>
    )
  }
}

export default inject('data')(observer(ChatBox))

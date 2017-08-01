import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import './Modal.css'

class Modal extends Component {
  state = {
    name: ''
  }

  render () {
    return (
      <div className='Modal'>
        <form
          className='NameBox'
          onSubmit={e => {
            e.preventDefault()
            this.sendName()
          }}
        >
          <h3>Your Name:</h3>
          <input
            type='text'
            onChange={e => this.setState({ name: e.target.value })}
          />
          <button onClick={this.sendName}>Done</button>
        </form>
      </div>
    )
  }

  sendName = e => {
    const { data, ui, io } = this.props
    if (this.state.name.length > 1) {
      ui.showName = false
      data.name = this.state.name
      io.emit('add user', this.state.name)
    }
  }
}

export default inject('io', 'ui', 'data')(observer(Modal))

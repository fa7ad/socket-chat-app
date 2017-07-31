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
    if (this.state.name.length > 1) {
      this.props.data.name = this.state.name
      this.props.ui.showName = false
    }
  }
}

export default inject('ui', 'data')(observer(Modal))

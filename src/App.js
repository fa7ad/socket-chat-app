import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import './App.css'
import Modal from './Modal'
import ChatBox from './ChatBox'

class App extends Component {
  render () {
    const { ui } = this.props
    return (
      <div className={`App${ui.showName ? ' name' : ''}`}>
        <Modal />
        <ChatBox />
      </div>
    )
  }
}

export default inject('ui')(observer(App))

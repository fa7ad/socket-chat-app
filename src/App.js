import React from 'react'
import { inject, observer } from 'mobx-react'

import './App.css'
import Modal from './Modal'
import ChatBox from './ChatBox'

const App = props => (
  <div className={`App${props.ui.showName ? ' name' : ''}`}>
    <Modal />
    <ChatBox />
  </div>
)

export default inject('ui')(observer(App))

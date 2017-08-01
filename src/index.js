import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import io from 'socket.io-client'

import './index.css'
import App from './App'

import UIStore from './UIStore'
import DataStore from './DataStore'

ReactDOM.render(
  <Provider io={io.connect()} ui={UIStore} data={DataStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)

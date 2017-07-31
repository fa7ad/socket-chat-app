import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import './index.css'
import App from './App'

import UIStore from './UIStore'
import DataStore from './DataStore'

const render = Component =>
  ReactDOM.render(
    <Provider ui={UIStore} data={DataStore}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )

render(App)

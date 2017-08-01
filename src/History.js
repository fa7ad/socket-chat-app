import React from 'react'
import { observer } from 'mobx-react'

const History = props => (
  <div className='History'>
    {props.messages.map((el, idx) => (
      <div className='MessageShow' key={idx}>
        <div className='Name'>{el.name}</div>
        <div className='Time'>
          {new Date(el.time).toLocaleTimeString()}
        </div>
        <div className='Text'>{el.text}</div>
      </div>
    ))}
  </div>
)

export default observer(History)

import React from 'react'

import _ from 'lodash'
import head from './head.svg'

const People = props => (
  <div className='People'>
    {props.names.map((el, idx) => (
      <div className='Person' key={idx}>
        <img
          src={head}
          alt={el}
          className='avatar'
          style={{
            filter: `sepia() hue-rotate(${_.random(0, 360)}deg) saturate(10)`
          }}
        />
        <b>{el}</b>
      </div>
    ))}
  </div>
)

export default People

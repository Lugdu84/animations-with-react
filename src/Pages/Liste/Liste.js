import React from 'react'
import "./Liste.css"
import {useTrail, animated} from "react-spring"
import Card from '../../Components/Card/Card'
import {v4 as uiidv4} from "uuid"

export default function Liste() {

  const trail = useTrail(9, {
    from: {
      opacity: 0,
      x: 20
    },
    to: {
      opacity: 1,
      x: 0
    }
  })

  console.log(trail)
  return (
    <div className='list-container'>
      {trail.map((cardStyle, index) => {
        return <animated.div
          key={uiidv4()}
          style={cardStyle}
        >
          <Card />
        </animated.div>
      })}
    </div>
  )
}
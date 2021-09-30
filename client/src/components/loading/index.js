import React from 'react'
import PropTypes from 'prop-types'
import {Container} from './styled'

export default function Loading({isLoading}){
    if(!isLoading) return <></>
    return (
        <Container>
            <div className='bkd'/>
            <div className="dot-flashing"></div>
        </Container>
    )
}
Loading.defaultProps={
  isLoading:false
}
Loading.propTypes={
  isLoading: PropTypes.bool
}

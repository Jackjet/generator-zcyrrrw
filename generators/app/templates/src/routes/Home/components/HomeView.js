import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import BaseComponent from 'components/BaseComponent'

const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src='/static/Duck.jpg' />
  </div>
)

export default BaseComponent(HomeView)
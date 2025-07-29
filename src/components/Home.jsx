import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className="layout hero">
        <h1>Infinity.Run</h1>
        <Link to="/Game">Let's Play!</Link>
      </div>
    </>
  )
}

export default Home
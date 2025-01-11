import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className="home container">
        <div className="para">
          <h1>Infinity.Run</h1>
          <Link to="/Game">Let's Play!</Link>
        </div>
      </div>
    </>
  )
}

export default Home
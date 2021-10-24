import React from 'react'
import './Home.css'

const Home = (props) => {
  return (
    <div className="Home">
      <h1>Welcome to LifeNote!</h1>
      <section className="main-content">
        <img alt="welcome!" src="https://picsum.photos/200?page=home" />
        <p>
          Introduction for LifeNote.
        </p>
      </section>
    </div>
  )
}

export default Home

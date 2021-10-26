import React, {useState} from 'react'
//import { StylesProvider } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import "./HomeButton.css"

const handleClick = () => {
  return (
    alert("Should go back to Home page!")
  )
}

const HomeButton = () => {
  return (
    <div className="HomeButton">
      <Button
        variant="contained"
        onClick={handleClick}
        href="/"
        sx={{
          backgroundColor: 'lightskyblue',
          width: '1600px',
        }}>
        Home
      </Button>
    </div>
  )
}

export default HomeButton;
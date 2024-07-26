import React from 'react'
import avatar from '../assets/avatar.png'
import { FaCheck } from "react-icons/fa";

export default function LandingPage () {
  return (
    <div style={{display: "flex"}}>
        <div style={{paddingLeft: "100px", paddingTop: "100px", width: '50%'}}>
            <h1 style={{
            fontSize: '4em',
            background: 'linear-gradient(45deg, #7f5af0, #805ad5, #ff6b6b, #f06595, #ff9f43)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0'
            }}>
              Algo - Land
            </h1>
            <p style={{ color: '#444', fontSize: '1.2em', margin: '30px 0' }}>
              Your one stop shop for Land Registration and Verification
            </p>
            <a>
              <button style={{height: "50px", width: "150px", backgroundColor: "#7878ec", borderRadius: "8px", color: "white", fontWeight: "bold"}}>Register Land</button>
            </a>
            <a >
              <button style={{height: "50px", width: "150px", backgroundColor: "#7878ec", borderRadius: "8px", color: "white", fontWeight: "bold", marginLeft: "20px"}}>Verify Land</button>
            </a>
        </div>
        <div style={{padding: "50px", width: '50%'}} >
           <img
              style={{height: "450px", width: "450px" }}
              src={avatar} alt='avatar'/>
        </div>

    </div>
  )
}

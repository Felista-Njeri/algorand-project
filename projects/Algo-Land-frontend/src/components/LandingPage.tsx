import React from 'react'
import avatar from '../assets/avatar.png'
import { FaCheck } from "react-icons/fa";

export default function LandingPage () {
  return (
    <div style={{display: "flex", borderBottom: "solid 1px"}}>
        <div style={{paddingLeft: "100px", paddingTop: "150px"}}>
            <h1 style={{fontSize: "2.5rem"}}>Welcome to Algo-Land</h1>
            <h2>Your one-stop shop for Land Registration and Land Verification <FaCheck /></h2>
            <a>
              <button style={{height: "50px", width: "150px", backgroundColor: "black", borderRadius: "8px", color: "white", fontWeight: "bold"}}>Register Land</button>
            </a>
            <a >
              <button style={{height: "50px", width: "150px", backgroundColor: "black", borderRadius: "8px", color: "white", fontWeight: "bold", marginLeft: "20px"}}>Verify Land</button>
            </a>
        </div>
        <div style={{padding: "100px"}} >
           <img style={{height: "400px", width: "400px"}} src={avatar} alt='avatar'/>
        </div>

    </div>
  )
}

import React from 'react'

export default function Navigation () {
  return (
    <div style={{display: "flex", justifyContent: "space-between", borderBottom: "solid 1px"}}>
        <h2 style={{marginLeft: "50px"}}>Algo-Land</h2>
        <ul>
            <a style={{paddingRight: "25px"}}>Log in</a>
            <a style={{paddingRight: "25px"}}>Sign up</a>
            <a>
              <button  style={{height: "50px", width: "150px", backgroundColor: "black", borderRadius: "8px", color: "white", fontWeight: "bold", marginRight: "50px"}}>Connect Wallet</button>
            </a>
        </ul>
    </div>
  )
}

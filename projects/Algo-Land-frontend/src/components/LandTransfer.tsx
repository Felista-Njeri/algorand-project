import React from 'react'

export default function LandTransfer () {
  return(
    <div style={{display: "flex", height: "70vh", borderBottom: "solid 1px"}}>
        <div style={{padding: "100px"}}>
            <h1>Land Transfer</h1>
            <h2>Transfer your Land to ensure its records are stored <br />on the blockchain</h2>
        </div>
        <div style={{paddingTop: "100px"}}>
            <h2>Transfer Land</h2>
            <form action="">
                <label>Identification Number: </label>
                <input
                    type="text"
                    name=""
                    style={{height: "30px", width: "200px"}}
                />
                <br /><br />
                <label>Land Number: </label>
                <input
                    type="text"
                    name=""
                    style={{height: "30px", width: "200px"}}
                />
                <br /><br />
                <label>Title Deed Number: </label>
                <input
                    type="text"
                    name=""
                    style={{height: "30px", width: "200px"}}
                />
            </form>
        </div>
    </div>
  )
}

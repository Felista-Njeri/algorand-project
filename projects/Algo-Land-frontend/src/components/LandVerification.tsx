import React from 'react'

export default function LandVerification () {
  return (
    <div style={{display: "flex", height: "70vh", borderBottom: "solid 1px"}}>
      <div style={{padding: "100px", width: "50%"}}>
        <h1>Land Verification</h1>
        <h2>Verify your Land to ensure it belongs to the legitimate owner </h2>
      </div>
     <div style={{paddingTop: "100px",width: "50%"}}>
        <h2>Verify Land</h2>
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

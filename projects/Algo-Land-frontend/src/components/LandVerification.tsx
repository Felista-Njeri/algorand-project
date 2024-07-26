import React from 'react'

export default function LandVerification () {
  return (
    <div style={{display: "flex", height: "70vh", borderBottom: "solid 1px"}}>
      <div style={{padding: "100px", width: "50%"}}>
             <h1 style={{
                background: 'linear-gradient(45deg, #ff6b6b, #f06595, #5f27cd, #10ac84, #ff9f43)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
               }}>Land Verification
            </h1>
        <p style={{ color: '#444', fontSize: '1.2em', margin: '30px 0' }}>
              Verify your land to ensure it blongs to its legitimate owner
        </p>
      </div>
     <div style={{paddingTop: "100px",width: "50%"}}>
        <h2>Verify Land</h2>
        <form action="">
            <label>Identification Number: </label><br />
            <input
                type="text"
                name=""
                style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
            />
            <br /><br />
            <label>Land Number: </label><br />
            <input
                type="text"
                name=""
                style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
            />
            <br /><br />
            <label>Title Deed Number: </label><br />
            <input
                type="text"
                name=""
                style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
            /> <br /><br />
            <button
                type="submit"
                style={{ height: '45px', width: '150px', backgroundColor: "#7878ec", color: "white", borderRadius: "8px", fontWeight: "bold" }}>
                Submit
            </button>
        </form>
      </div>
</div>
  )
}

import React from 'react'
import { useState } from 'react'
import * as algokit from '@algorandfoundation/algokit-utils'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'


export default function LandRegistration () {
  return (
    <div style={{display: "flex", paddingTop: "50px"}}>
        <div style={{ width: "50%", paddingLeft: "100px", paddingRight: '0px'}}>
            <h1 style={{
                background: 'linear-gradient(45deg, #ff6b6b, #f06595, #5f27cd, #10ac84, #ff9f43)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>Land Registration
            </h1>
            <p style={{ color: '#444', fontSize: '1.2em', margin: '30px 0' }}>
              Register Your Land To ensure its records are stored on the Blockchain
            </p>
        </div>
        <div style={{ width: "50%"}}>
            <form onSubmit={submitForm} action="" style={{ paddingLeft: '50px' }}>
            <h2>Register Land</h2>
                <label>Identification Number: </label><br />
                <input
                    type="text"
                    id="userID"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
                />
                <br /><br />
                <label>Land Number: </label><br />
                <input
                    type="text"
                    id="landID"
                    value={landID}
                    onChange={(e) => setLandID(e.target.value)}
                    style={{ width: "500px",  borderRadius: "5px", padding: '10px', marginTop: '3px'}}
                />
                <br /><br />
                <label>Title Deed Number: </label><br />
                <input
                    type="text"
                    id="titleDeedID"
                    value={titleDeedID}
                    onChange={(e) => setTitleDeedID(e.target.value)}
                    style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
                /> <br /> <br />
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

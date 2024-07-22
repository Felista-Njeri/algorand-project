import React from 'react'
import { useState } from 'react'
import * as algokit from '@algorandfoundation/algokit-utils'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'
import algosdk from 'algosdk';
import { ClientManager } from '@algorandfoundation/algokit-utils/types/client-manager';

export default function LandRegistration () {
  const [userID, setUserID] = useState<string>('');
  const [landID, setLandID] = useState<string>('');
  const [titleDeedID, setTitleDeedID] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    try {

      // Algorand client setup
      const algodToken = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; // Replace with your API key
      const algodServer = 'https://localhost';
      const algodPort = '5173';
      const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

      // Transaction parameters
      const params = await algodClient.getTransactionParams().do();

      // Application call transaction (assuming the contract is already deployed)
      const appID = 123456; // Replace with your app ID
      const senderAddress = 'your-address'; // Replace with your address
      const privateKey = new Uint8Array([]); // Replace with your private key as Uint8Array

      const appArgs = [
        new Uint8Array(Buffer.from('registerLand')),
        algosdk.encodeUint64(Number(userID)),
        algosdk.encodeUint64(Number(landID)),
        algosdk.encodeUint64(Number(titleDeedID))
      ];

      const txn = algosdk.makeApplicationNoOpTxn(senderAddress, params, appID, appArgs);

      // Sign the transaction
      const signedTxn = txn.signTxn(privateKey);

      // Send the transaction
      const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
      console.log('Transaction sent with ID:', txId);

      setMessage('Registration Successful');
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setMessage('Registration Failed');
    }
  };

  return (
    <div style={{display: "flex", height: "70vh", borderBottom: "solid 1px"}}>
        <div style={{padding: "100px", width: "50%"}}>
            <h1>Land Registration</h1>
            <h2>Register your Land to ensure its records are stored <br />on the blockchain</h2>
        </div>
        <div style={{paddingTop: "100px", width: "50%"}}>
            <h2>Register Land</h2>

            <form onSubmit={submitForm} action="">
                <label>Identification Number: </label>
                <input
                    type="text"
                    id="userID"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    style={{height: "30px", width: "200px"}}
                />
                <br /><br />
                <label>Land Number: </label>
                <input
                    type="text"
                    id="landID"
                    value={landID}
                    onChange={(e) => setLandID(e.target.value)}
                    style={{height: "30px", width: "200px"}}
                />
                <br /><br />
                <label>Title Deed Number: </label>
                <input
                    type="text"
                    id="titleDeedID"
                    value={titleDeedID}
                    onChange={(e) => setTitleDeedID(e.target.value)}
                    style={{height: "30px", width: "200px"}}
                /> <br /> <br />
                <button
                    type="submit"
                    style={{ height: '30px', width: '100px' }}>
                    Submit
                </button>
            </form>
        </div>
    </div>
  )
}

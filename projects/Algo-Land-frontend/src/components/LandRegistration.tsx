import React from 'react'
import { useState } from 'react'
import * as algokit from '@algorandfoundation/algokit-utils'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'
import algosdk from 'algosdk';
import { ClientManager } from '@algorandfoundation/algokit-utils/types/client-manager';
import { ApplicationClient } from '@algorandfoundation/algokit-utils/types/app-client'


export default function LandRegistration () {
  const [userID, setUserID] = useState<string>('');
  const [landID, setLandID] = useState<string>('');
  const [titleDeedID, setTitleDeedID] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

 //   try {


//       const getSender = algokit.getSenderAddress(sender);
//       console.log(getSender);
//       algokit.mnemonicAccountFromEnvironment(account, algod, kmd?)
//       algokit.mnemonicAccount(mnemonicSecret)
//       new AlgoAmount({microAlgos: 10_000})
//       algokit.getAppClient(appDetails, algod)
//       new ApplicationClient(appDetails, algod)
//       getGlobalState()
//       algokit.getAppGlobalState(appId, algod)
//       algokit.getAppLocalState(appId, algod, account)
//       algokit.getConfigFromEnvOrDefaults()
//       algokit.getAlgodConfigFromEnvironment()
//       algokit.getIndexerConfigFromEnvironment()
//       algokit.getAlgoNodeConfig(network, config)
//       algokit.getAlgoClient(config)
//       algokit.getAlgoKmdClient(config)
//       algokit.getAlgoIndexerClient(config)
//       const response = await client.fund('receiver_address', 1000)
//       // Using constructor argument
// const client = algokit.getTestNetDispenserApiClient({ authToken: 'your_auth_token' })

// // Using environment variable
// process.env['ALGOKIT_DISPENSER_ACCESS_TOKEN'] = 'your_auth_token'
// const client = algokit.getTestNetDispenserApiClient()
//       algokit.lookupTransactionById(transactionId, indexer)
//       algokit.lookupAccountCreatedApplicationByAddress(indexer, address, getAll?, paginationLimit?)
//       algokit.getTransactionParams(params, algod)
//       algokit.controlFees(transaction, feeControl)
//       algokit.signTransaction(transaction, signer)
      // Algorand client setup
    //   const algodToken = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; // Replace with your API key
    //   const algodServer = 'https://localhost';
    //   const algodPort = '4001';
    //   const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

    //   // Transaction parameters
    //   const params = await algodClient.getTransactionParams().do();

    //   // Application call transaction (assuming the contract is already deployed)
    //   const appID = 123456; // Replace with your app ID
    //   const senderAddress = 'your-address'; // Replace with your address
    //   const privateKey = new Uint8Array([]); // Replace with your private key as Uint8Array

    //   const appArgs = [
    //     new Uint8Array(Buffer.from('registerLand')),
    //     algosdk.encodeUint64(Number(userID)),
    //     algosdk.encodeUint64(Number(landID)),
    //     algosdk.encodeUint64(Number(titleDeedID))
    //   ];

    //   const txn = algosdk.makeApplicationNoOpTxn(senderAddress, params, appID, appArgs);

    //   // Sign the transaction
    //   const signedTxn = txn.signTxn(privateKey);

    //   // Send the transaction
    //   const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    //   console.log('Transaction sent with ID:', txId);

    //   setMessage('Registration Successful');
    // } catch (error) {
    //   console.error('Error submitting transaction:', error);
    //   setMessage('Registration Failed');
    // }
  };

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

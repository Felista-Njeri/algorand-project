import { Provider, useWallet } from '@txnlab/use-wallet'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import { ABIReturn, OnSchemaBreak, OnUpdate } from '@algorandfoundation/algokit-utils/types/app'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'
import * as algokit from '@algorandfoundation/algokit-utils'
import { ChangeEvent, useState } from 'react'
import { useSnackbar } from 'notistack'
import { LandClient } from '../contracts/Land'
import { ClientManager } from '@algorandfoundation/algokit-utils/types/client-manager'

export default function LandRegistration () {

 // App State
 const [loading, setLoading] = useState<boolean>(false)

 const [form, setForm] = useState({
   idNumber: "",
   landNumber: "",
   titleDeed: ""
 })

 type verificationType = {
   idNumber: string,
   landNumberVerification: string,
   titleDeedVerification: string,
   blockChainResponse: (string & ABIReturn) | undefined
 }

 const [verification, setVerification] = useState<verificationType>({
   idNumber: "",
   landNumberVerification: "",
   titleDeedVerification: "",
   blockChainResponse: undefined
 })

 const [popup, setPopup] = useState<boolean>(false)
 // Components
 const { enqueueSnackbar } = useSnackbar()

 // Algorand BoilerPlate
 const { signer, activeAddress } = useWallet()

 //Generate AlgodClient
 const algodConfig = getAlgodConfigFromViteEnvironment()
 const algodClient = algokit.getAlgoClient({
   server: algodConfig.server,
   port: algodConfig.port,
   token: algodConfig.token,
 })

 //Generate Indexer
 const indexerConfig = getIndexerConfigFromViteEnvironment()
 const indexer = algokit.getAlgoIndexerClient({
   server: indexerConfig.server,
   port: indexerConfig.port,
   token: indexerConfig.token,
 })


 // Form handling
 function handleChange(event: ChangeEvent<HTMLInputElement>) {
   const { value, name } = event.target

   setForm(prevForm => ({
     ...prevForm,
     [name]: value
   }))
 }

 function handleVerificationChange(event: ChangeEvent<HTMLInputElement>) {
   const { value, name } = event.target

   setVerification(prevForm => ({
     ...prevForm,
     [name]: value
   }))
 }

 function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
   event.preventDefault()
 }

 async function tooglePopup() {
   // let data = await response?.return
   const data: (string & ABIReturn) | undefined = undefined

   setVerification(prevVerify => ({
     ...prevVerify,
     blockChainResponse: data
   }))

   setPopup(!popup)
   if (popup) {
     setTimeout(() => {
       setPopup(!popup)
     }, 3500)
   }
 }

  const sendRegisterLandAppCall = async () => {
    setLoading(true)

    // Please note, in typical production scenarios,
    // you wouldn't want to use deploy directly from your frontend.
    // Instead, you would deploy your contract on your backend and reference it by id.
    // Given the simplicity of the starter contract, we are deploying it on the frontend
    // for demonstration purposes.
    const appClient = new LandClient(
      {
        sender: { signer, addr: activeAddress } as TransactionSignerAccount,
        resolveBy: 'id',
        id: 713168510,
      },
      algodClient,
    )
    // await appClient.create.createApplication({}).catch((e: Error) => {
    //   enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
    //   setLoading(false)
    //   return
    // })713168510


    // // Adding parameters to created client
    // const deployParams = {
    //   onSchemaBreak: OnSchemaBreak.AppendApp,
    //   onUpdate: OnUpdate.AppendApp,
    // }

    // const appDeployment = await appClient.deploy(deployParams).catch((e: Error) => {
    //   enqueueSnackbar(`App found ${e.message}`, { variant: 'error' })
    //   setLoading(false)
    //   return
    // })


    // console.log("App Deployment", appDeployment.appId)

    // Actual execution
    // register Land


    // Validation

    if (form.idNumber == "") {
      enqueueSnackbar(`ID Number is empty. Please fill.`, { variant: 'error' })
      setLoading(false)
      return
    }

    if (form.landNumber == "") {
      enqueueSnackbar(`Land Number is empty. Please fill.`, { variant: 'error' })
      setLoading(false)
      return
    }

    if (form.titleDeed == "") {
      enqueueSnackbar(`Title Deed is empty. Please fill.`, { variant: 'error' })
      setLoading(false)
      return
    }

    // Get the existing land and titles
    const getLandResponse = await appClient.getLand({}).catch((e: Error) => {
      enqueueSnackbar(`Error getting land details${e.message}`, { variant: 'error' })
      setLoading(false)
      return
    })

    let landAndTitleDeedsList: any;
    // let landAndTitleDeedsMap = new Map()

    if ((getLandResponse?.return != undefined) || (getLandResponse?.return != '')) {
      // if empty nothing to be done
      // if len is 0 pass
      landAndTitleDeedsList = getLandResponse?.return?.split(";")

      landAndTitleDeedsList?.pop() // To remove the empty string

      console.log(landAndTitleDeedsList)

      // Checking for duplications
      for (let i = 0; i < landAndTitleDeedsList?.length; i++) {
        const landTitlePair = landAndTitleDeedsList[i].split(":")
        const landReferenceNumber = landTitlePair[1]
        const titleDeedNumber = landTitlePair[2]

        if (landReferenceNumber == form.landNumber) {
          enqueueSnackbar(`Land Number ${landReferenceNumber} already exists`, { variant: 'error' })
          setLoading(false)
          return
        }

        if (titleDeedNumber == form.titleDeed) {
          enqueueSnackbar(`Title Deed ${titleDeedNumber} already exists`, { variant: 'error' })
          setLoading(false)
          return
        }
      }
    }
    const landReferenceAndTitleDeed = `${form.idNumber}:${form.landNumber}:${form.titleDeed};`

    await appClient.registerLand({ landReferenceAndTitleDeed: landReferenceAndTitleDeed })
      .then(() => {
        enqueueSnackbar(`Land Registered Successfully`, { variant: 'success' })
        setLoading(false)
        return
      })
      .catch((e: Error) => {
        enqueueSnackbar(`Error registering land: ${e.message}`, { variant: 'error' })
        setLoading(false)
        return
      })

    // setResult(response?.return)

    // enqueueSnackbar(`Response from the contract: ${response?.return}`, { variant: 'success' })

    setLoading(false)

  }

  const sendVerifyLandAppCall = async () => {
    setLoading(true)

    // Please note, in typical production scenarios,
    // you wouldn't want to use deploy directly from your frontend.
    // Instead, you would deploy your contract on your backend and reference it by id.
    // Given the simplicity of the starter contract, we are deploying it on the frontend
    // for demonstration purposes.
    const appClient = new LandClient(
      {
        sender: { signer, addr: activeAddress } as TransactionSignerAccount,
        resolveBy: 'id',
        id: 713168510,
      },
      algodClient,
    )
    // await appClient.create.createApplication({}).catch((e: Error) => {
    //   enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
    //   setLoading(false)
    //   return
    // })

    // appClient.create

    // Adding parameters tgo created client
    // const deployParams = {
    //   onSchemaBreak: OnSchemaBreak.AppendApp,
    //   onUpdate: OnUpdate.AppendApp,
    // }

    // const appDeployment = await appClient.deploy(deployParams).catch((e: Error) => {
    //   enqueueSnackbar(`App found ${e.message}`, { variant: 'error' })
    //   setLoading(false)
    //   return
    // })

    // await appClient.create.createApplication({}).catch((e: Error) => {
    //   enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
    //   setLoading(false)
    //   return
    // })

    // appClient.create

    // Adding parameters tgo created client
    // const deployParams = {
    //   onSchemaBreak: OnSchemaBreak.AppendApp,
    //   onUpdate: OnUpdate.AppendApp,
    // }
    // const appDeployment = await appClient.deploy(deployParams).catch((e: Error) => {
    //   enqueueSnackbar(`App found ${e.message}`, { variant: 'success' })
    //   setLoading(false)
    //   return
    // })

    const response = await appClient.getLand({}).catch((e: Error) => {
      enqueueSnackbar(`Error getting land details: ${e.message}`, { variant: 'error' })
      setLoading(false)
      return
    })

    // Validation
    if (verification.idNumber == "") {
      enqueueSnackbar(`ID Number is empty. Please fill.`, { variant: 'error' })
      setLoading(false)
      return
    }

    if (verification.landNumberVerification == "") {
      enqueueSnackbar(`Land Number is empty. Please fill.`, { variant: 'error' })
      setLoading(false)
      return
    }

    if (verification.titleDeedVerification == "") {
      enqueueSnackbar(`Title Deed Number is empty. Please fill.`, { variant: 'error' })
      setLoading(false)
      return
    }

    let landAndTitleDeedsList: any;
    let landAndTitleDeedsMap = new Map()

    if ((response?.return != undefined) || (response?.return != '')) {
      // if empty nothing to be done
      // if len is 0 pass
      landAndTitleDeedsList = response?.return?.split(";")

      landAndTitleDeedsList?.pop() // To remove the empty string

      console.log(landAndTitleDeedsList)

      let isValid = false
      for (let i = 0; i < landAndTitleDeedsList?.length; i++) {
        const landTitlePair = landAndTitleDeedsList[i].split(":")
        const idNumber = landTitlePair[0]
        const landReferenceNumber = landTitlePair[1]
        const titleDeedNumber = landTitlePair[2]

        if (
          (idNumber == verification.idNumber) &&
          (landReferenceNumber == verification.landNumberVerification) &&
          (titleDeedNumber == verification.titleDeedVerification)
        ) {
          enqueueSnackbar(`Valid Land Details`, { variant: 'success' })
          setLoading(false)
          return
        }
        // landAndTitleDeedsMap.set(landTitlePair[1], landTitlePair[2])
      }

      enqueueSnackbar(`Invalid Land Details`, { variant: 'error' })
      setLoading(false)
      return

      // if(landAndTitleDeedsMap.has(verification.landNumberVerification)) {
      //   const trueTitleDeed = landAndTitleDeedsMap.get(verification.landNumberVerification)
      //   if(trueTitleDeed == verification.titleDeedVerification) {
      //     enqueueSnackbar(`Valid`, { variant: 'success' })
      //     setLoading(false)
      //     return
      //   } else {
      //     enqueueSnackbar(`Invalid`, { variant: 'error' })
      //     setLoading(false)
      //     return
      //   }
      // } else {
      //   enqueueSnackbar(`Invalid`, { variant: 'error' })
      //   setLoading(false)
      //   return
      // }

      //   console.log(landAndTitleDeedsMap)
      // enqueueSnackbar(`Existing land details: ${response?.return}`, {variant: "success"})
    }


    setLoading(false)
    // console.log("App Deployment", appDeployment.appId)

    // Actual execution
    // register Land
    // const response = await appClient.verifyLandDetails({ landReferenceNumber: verification.landNumberVerification }).catch((e: Error) => {
    //   enqueueSnackbar(`Error registering land: ${e.message}`, { variant: 'error' })
    //   setLoading(false)
    //   return
    // })

    // setResult(response?.return)
  }


  return (
    <>
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
            <form onSubmit={handleSubmit} action="" style={{ paddingLeft: '50px' }}>
            <h2>Register Land</h2>
                <label>National Identification Number: </label><br />
                <input
                    name="idNumber"
                    value={form.idNumber}
                    onChange={handleChange}
                    style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
                />
                <br /><br />
                <label>Land Number: </label><br />
                <input
                    name="landNumber"
                    value={form.landNumber}
                    onChange={handleChange}
                    style={{ width: "500px",  borderRadius: "5px", padding: '10px', marginTop: '3px'}}
                />
                <br /><br />
                <label>Title Deed Number: </label><br />
                <input
                    name="titleDeed"
                    value={form.titleDeed}
                    onChange={handleChange}
                    style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
                /> <br /> <br />
                <button
                    type="button"
                    onClick={sendRegisterLandAppCall}
                    style={{ height: '45px', width: '150px', backgroundColor: "#7878ec", color: "white", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                    Submit
                </button>
            </form>
        </div>
    </div>

     <div style={{display: "flex", height: "70vh", borderBottom: "solid 1px"}}>
     <div style={{padding: "100px", width: "50%"}}>
            <h1 style={{
               background: 'linear-gradient(45deg, #ff6b6b, #f06595, #5f27cd, #10ac84, #ff9f43)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent'
              }}>Land Verification
           </h1>
       <p style={{ color: '#444', fontSize: '1.2em', margin: '30px 0' }}>
             Verify your land to ensure it belongs to its legitimate owner
       </p>
     </div>
    <div style={{paddingTop: "100px",width: "50%"}}>
       <h2>Verify Land</h2>
       <form action="" onSubmit={handleSubmit} >
           <label>National Identification Number: </label><br />
           <input
               name="idNumber"
               value={verification.idNumber}
               onChange={handleVerificationChange}
               style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
           />
           <br /><br />
           <label>Land Number: </label><br />
           <input
               name="landNumberVerification"
               value={verification.landNumberVerification}
               onChange={handleVerificationChange}
               style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
           />
           <br /><br />
           <label>Title Deed Number: </label><br />
           <input
               name="titleDeedVerification"
               value={verification.titleDeedVerification}
               onChange={handleVerificationChange}
               style={{ width: "500px", borderRadius: "5px", padding: '10px', marginTop: '3px'}}
           /> <br /><br />
           <button
               type="submit"
               onClick={sendVerifyLandAppCall}
               style={{ height: '45px', width: '150px', backgroundColor: "#7878ec", borderRadius: "8px", color: 'white', fontWeight: "bold", cursor: 'pointer' }}>
               Submit
           </button>
           {popup && (
                verification.titleDeedVerification == verification.blockChainResponse ? <h1>Details are valid</h1> : <h1>False Details</h1>
              )}
       </form>
     </div>
   </div>
   </>
  )
}

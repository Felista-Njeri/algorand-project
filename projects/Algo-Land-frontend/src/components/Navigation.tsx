import React from 'react'
import { useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'
import ConnectWallet from './ConnectWallet'

export default function Navigation () {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)


  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  return (
    <div style={{ padding: '30px 0', display: 'flex', justifyContent: 'center' }}>
      <nav style={{  display: 'flex', gap: '20px', border: 'solid, 1px, gray', padding: '10px', borderRadius: '5px' }}>
        <button style={{ backgroundColor: '#7878ec', borderRadius: '10px', padding: '10px 20px', border: 'none', color: 'white', fontWeight: 'bold' }}>
           About
        </button>
        <button style={{ backgroundColor: 'white', padding: '10px 20px', border: 'none', fontWeight: 'bold' }}>Log In</button>
        <button style={{ backgroundColor: 'white', padding: '10px 20px', border: 'none', fontWeight: 'bold' }}>Sign Up</button>
        <button style={{ backgroundColor: 'black', borderRadius: '10px', padding: '10px 20px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }} onClick={toggleWalletModal}>
          Connect Wallet
        </button>
      </nav>
      <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
    </div>
  );
}

import React, { useContext, useState } from 'react'
import { AppState } from '../App';

const Header = () => {

  const {ethereum} = window;

  const App = useContext(AppState);
  const [showChains, setShowChains] = useState(false);

  const changeToGoerli = async() => {
    await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: "0x5"}]});
    setShowChains(false);
  }
  
  const changeToSepolia = async() => {
    await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: "0xaa36a7"}]});
    setShowChains(false);
  }

  return (
    <div className='w-full h-1/4 pt-4 flex justify-between items-start'>
      {/*LOGO*/}
      <img className='h-12 ml-2' src="paypal.png" alt="" />

      <div className='flex justify-between items-start'>
        {/*WALLET*/}
        <div className='text-xl  mr-2 font-sans border-opacity-60 border-2 -blue-900 font-medium bg-black cursor-pointer px-4 py-2 text-white rounded-lg flex justify-center items-center'>
          {App.address.slice(0, 8)}...{App.address.slice(38)}

          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="ml-2 bi bi-wallet2" viewBox="0 0 16 16">
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
          </svg>
        </div>

        {/* Chains Section */}
        <div onClick={() => {setShowChains(true)}} className='text-xl py-2 px-4 font-sans border-opacity-60 border-2 border-blue-900  font-medium cursor-pointer bg-black text-white rounded-lg flex justify-between items-center '>
          {(() => {
            if (App.chain === "Goerli") {
              return <img className='h-6 mr-2 ' src='goerli.png' />
            }
            else if (App.chain === "Sepolia") {
              return <img className='h-6 mr-2 ' src='sepolia.jpeg' />

            }
          })()}

          {App.chain}
        </div>

        {/*All Chains */}
        <div  className={`${showChains ? '' : 'hidden'} absolute right-0 z-50`}>
          {/*Goerli*/}
          <div onClick={changeToGoerli} className='text-xl py-2 px-4 font-sans border-opacity-60 border-2 border-blue-900  font-medium cursor-pointer bg-black text-white rounded-lg flex justify-between items-center hover:bg-gray-700'>
            <img className='h-6 mr-2 ' src='goerli.png' />
            Goerli
          </div>

          {/*Sepolia*/}
          <div onClick={changeToSepolia} className='text-xl py-2 px-4 font-sans border-opacity-60 border-2 border-blue-900  font-medium cursor-pointer bg-black text-white rounded-lg flex justify-between items-center hover:bg-gray-700'>
            <img className='h-6 mr-2 ' src='sepolia.jpeg' />
            Sepolia
          </div>

          {/*Close the Chain Section*/}
          <div onClick={()=>{setShowChains(false)}} className='text-xl py-1 px-4 font-sans border-opacity-60 border-2 border-blue-900  font-medium cursor-pointer bg-red-600 text-white rounded-lg flex justify-center items-center hover:bg-red-900'>
            Close
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="ml-2 bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Header;

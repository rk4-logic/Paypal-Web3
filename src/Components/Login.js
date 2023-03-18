import React, { useContext } from 'react'
import { useState } from 'react';
import { AppState } from '../App';

const Login = () => {

    const App = useContext(AppState);

    const { ethereum } = window;
    const [error, setError] = useState("");

    const LoginWallet = async () => {
        try {
            await ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{ eth_accounts: {} }]
            });
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            App.setAddress(accounts[0]);

            const chainId = await ethereum.request({ method: "eth_chainId" });

            App.getBal();

            if (chainId === "0x5") {
                App.setChain("Goerli");
                App.setLogin(true);
                App.setCurrency("Goerli Ether");
                App.setSymbol("GoerliETH");
                App.setPaypalContractAddress('0xBd9EdA6C519d202B22dce4223015Dce09D261f89');
                App.setExplorer('https://goerli.etherscan.io/');
            }
            else if (chainId === "0xaa36a7") {
                App.setChain("Sepolia");
                App.setLogin(true);
                App.setCurrency("Sepolia Ether");
                App.setSymbol("SepoliaETH");
                App.setPaypalContractAddress('0xE125D30faDd25AaA27b9f5f8aCe42D9CD66301E3');
                App.setExplorer('https://sepolia.etherscan.io/');
            }
            else {
                setError("Only Sepolia and Goerli are accessible");
                App.setLogin(false);
                App.setAddress("");
            }
        } catch (error) {
            setError(`"${error.message}"`);
        }
    }

    return (
        <div className='min-w-full h-4/5 flex justify-center flex-col items-center'>
            <img className='h-20' src="paypal.png" alt='' />
            <div className='w-1/3 h-50 mt-4 bg-black bg-opacity-30 p-2 rounded-lg shadow-lg border-opacity-40 border-4 border-black flex flex-col justify-center items-center'>
                <h1 className='text-white text-2xl font-medium text-center'>Login</h1>
                {ethereum !== undefined ?
                    <div className='flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-red-700 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2 ' onClick={LoginWallet} >
                        Connect to Metamask
                        <img className='h-10' src="metamask.png" alt="" />
                    </div>
                    :
                    <div className='flex flex-col justify-center items-center'>
                        {/* Install Metamask*/}

                        <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target={'_blank'} >
                            <div className='flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-red-700 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2 '>
                                Install Metamask
                                <img className='h-10' src="metamask.png" alt="" />
                            </div>
                        </a>
                        <p className=' mt-2 text-lg' style={{ color: 'darkorange' }} >
                            Login requires Metamask Extension
                        </p>
                    </div>

                }
                <p className=' text-lg mt-2' style={{ color: 'darkorange' }} >{error}</p>
            </div>
        </div >
    )
}

export default Login;


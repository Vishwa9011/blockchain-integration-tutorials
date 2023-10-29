import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner, useProvider } from 'wagmi';
import Network from "./blockchain/network/network.json"
import ContracABI from "./blockchain/abis/test.json"
import { ethers } from 'ethers';
import { useState } from 'react'

function Home() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const PROVIDER = signer || provider;
  const CONTRACT_ADDRESS = Network.contract;

  const [myAddress, setMyAddress] = useState('')
  const [count, setCount] = useState(0)
  const [countIncreaseBy, setCountIncreaseBy] = useState(0)


  const contract = new ethers.Contract(CONTRACT_ADDRESS, ContracABI, PROVIDER);
  console.log('contract: ', contract);


  async function getAddress() {
    try {
      const response = await contract.getAddress();
      console.log('response: ', response);
      setMyAddress(response);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const increaseCount = async () => {
    try {
      const response = await contract.increaseCount();
      const receipt = await response.wait()
      await getCount()
      console.log('receipt: ', receipt);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const decreaseCount = async () => {
    try {
      const response = await contract.decreaseCount();
      const receipt = await response.wait()
      await getCount()
      console.log('receipt: ', receipt);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const increaseCountBy = async () => {
    try {
      const response = await contract.increaseCountBy(countIncreaseBy);
      const receipt = await response.wait();
      await getCount()
      console.log('receipt: ', receipt);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const getCount = async () => {
    try {
      const response = await contract.getCount();
      console.log('response: ', Number(response));
      setCount(Number(response));
    } catch (error) {
      console.log('error: ', error);
    }
  }



  return (
    <>
      <ConnectButton />
      <br />

      <p>My Address : {myAddress}</p>
      <button onClick={getAddress}>Get Address</button>

      <br />
      <br />

      <p>Count : {count}</p>
      <button onClick={getCount}>Get Count</button>

      <button onClick={increaseCount}>Increase Count</button>
      <button onClick={decreaseCount}>Decrease Count</button>

      <br />

      <input type="number" onChange={e => setCountIncreaseBy(+e.target.value)} />
      <button onClick={increaseCountBy}>Increase Count by {countIncreaseBy}</button>

    </>
  )
}

export default Home
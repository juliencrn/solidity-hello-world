import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';

import HelloWorldContract from './contracts/HelloWorld.json'
import getWeb3 from './getWeb3';

const CONTRACT_ADDRESS = '0x357ed543F8c46cc0C08E8aEc8Ae4ae2ADF50Fd79'

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getContractMessage() {
      const web3 = await getWeb3();
      const contract = new web3.eth.Contract(HelloWorldContract.abi, CONTRACT_ADDRESS);
      const message = await contract.methods.sayHello().call();

      if (typeof message === "string" && message) {
        setMessage(message);
      }

      console.log({ web3, contract, message });
    }

    getContractMessage()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message
            ? `"${message}" from our Smart Contract 🎉`
            : "..."}

        </p>
      </header>
    </div>
  );
}

export default App;

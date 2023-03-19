import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import abi from "src/utils/abi.json";
import Web3 from "web3";
import { useState } from "react";
import React from "react";

const Home: NextPage = () => {
  const [voucher, setVoucher] = useState();
  const web3 = new Web3("http://localhost:8545");
  const wiiqarecontract = new web3.eth.Contract(
    abi.abi,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  const mintVoucher = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const res = await wiiqarecontract.methods
        .mintVoucher([
          200,
          "USD",
          "ownerDemo",
          "hospitalDemo",
          "pacientDemo",
          "notClaimed",
        ])
        .send({ from: accounts[0] });
      console.log(res);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };

  const getVoucher = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const res = await wiiqarecontract.methods
        .vouchers(1)
        .call({ from: accounts[0] });
      setVoucher(res);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };

  if (voucher) {
    return (
      <div>
        <button onClick={mintVoucher}>Mint voucher</button>
        <button onClick={getVoucher}>Get voucher voucher</button>
        <div>
          <ul>
            <li>{voucher.value}</li>
            <li>{voucher.currencySymbol}</li>
            <li>{voucher.status}</li>
            <li>{voucher.ownerID}</li>
            <li>{voucher.providerID}</li>
            <li>{voucher.beneficiaryID}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={mintVoucher}>Mint voucher</button>
        <button onClick={getVoucher}>Get voucher voucher</button>
      </div>
    );
  }
};

export default Home;

import type { NextPage } from "next";
import abi from "src/utils/abi.json";
import Web3 from "web3";
import { useState } from "react";
import { BigNumber } from "ethers";

const Home: NextPage = () => {
  const privateKey =
    "e5ade216df5a68ff325602f25a0ecc0b182334998690e528f3397ee7ac8b7c1c"; // should be in .env
  const [voucher, setVoucher] = useState();
  const mumbaiRPC =
    "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78"; // should be in .env
  const web3 = new Web3(mumbaiRPC);
  const wiiqarecontract = new web3.eth.Contract(
    abi.abi,
    "0xd55Fc611D64f10885f243dbAcA1757349FcE2Bc7" // should be in .env
  );
  const web3Account = web3.eth.accounts.privateKeyToAccount(privateKey);

  const mintVoucher = async () => {
    try {
      const rr = web3.eth.accounts.wallet.add(privateKey);
      const res = await wiiqarecontract.methods
        .mintVoucher([
          20,
          "USD",
          "demoWii",
          "hospitalWii",
          "pacientDemo",
          "notClaimed",
        ])
        .send({
          from: web3Account.address,
          gasPrice: "30000000000",
          gas: "3996000",
        });
      console.log(res);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };

  const getVoucher = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const res = await wiiqarecontract.methods
        .vouchers(182)
        .call({ from: web3Account.address });
      setVoucher(res);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };

  const alterVoucher = async () => {
    try {
      const signResponse = web3.eth.accounts.wallet.add(privateKey);
      const res = await wiiqarecontract.methods
        .alterVoucher(10, [
          1000,
          "RON",
          "demoWiiAlter",
          "hospitalWii",
          "pacientDemo",
          "notClaimed",
        ])
        .send({
          from: web3Account.address,
          gasPrice: "30000000000",
          gas: "3996000",
        });
      console.log(res);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };

  const splitVoucher = async () => {
    try {
      const signResponse = web3.eth.accounts.wallet.add(privateKey);
      const res = await wiiqarecontract.methods
        .splitVoucher(
          175,
          [
            50,
            "RON",
            "demoWiiAlter1",
            "hospitalWii1",
            "pacientDemo1",
            "notClaimed",
          ],
          [
            60,
            "RON",
            "demoWiiAlter2",
            "hospitalWii2",
            "pacientDemo2",
            "notClaimed",
          ]
        )
        .send({
          from: web3Account.address,
          gasPrice: "30000000000",
          gas: "3996000",
        });
      console.log(res);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };

  if (voucher) {
    return (
      <div>
        <button onClick={mintVoucher}>Mint voucher</button>
        <button onClick={getVoucher}>Get voucher voucher</button>
        <button onClick={splitVoucher}>Split voucher</button>
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
        <button onClick={alterVoucher}>Alter voucher</button>
        <button onClick={splitVoucher}>Split voucher</button>
      </div>
    );
  }
};

export default Home;

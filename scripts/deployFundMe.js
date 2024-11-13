//import ethers.js
//creat main fuction
//execute main fuction

const { ethers } = require("hardhat");

async function main() {
  //creat factor
  const fundMe = await ethers.getContractFactory("FundMe");
  //deploy contract
  const deployedFundMe = await fundMe.deploy(10);
  //wait for deployment
  console.log("Deploying contract...");
  await deployedFundMe.waitForDeployment();
  console.log("Contract deployed to:  ", deployedFundMe.target);
  //print address

  //合约验证
  // if (
  //   hre.network.config.chainId === 11155111 &&
  //   process.env.ETHERSCAN_API_KEY
  // ) {
  //   //verify contract
  //   console.log(`Contract deployed to:  ${deployedFundMe.target}`);
  //   await deployedFundMe.deployTransaction().wait(6);
  //   console.log("waiting for 6 block confirmations...");
  //   await verifyFundMe(deployedFundMe.address, [10]);
  // } else {
  //   console.log("Verification skipped!");
  // }

  //initialize accounts
  const [firstAccount, secondAccount] = await ethers.getSigners();
  
  //fun contract with first account
  const fundTx = await deployedFundMe.fund({value: ethers.utils.parseEther("0.01")});
  await fundTx.wait();

  //check balance of contract
  const contractBalance = await deployedFundMe.provider.getBalance(deployedFundMe.target);
  console.log(`Contract balance: ${ethers.utils.formatEther(contractBalance)}`);
  //found contract with second account
  const fundTxSecondAccount = await deployedFundMe.fund({value: ethers.utils.parseEther("0.01")});
  await fundTxSecondAccount.wait();
  //check balance of contract
  const contractBalanceSecond = await deployedFundMe.provider.getBalance(deployedFundMe.target);
  console.log(`Contract balance: ${ethers.utils.formatEther(contractBalanceSecond)}`);
  //check mapping fundersToAmount
 const firstAccountBalance = await deployedFundMe.fundersToAmount(firstAccount.address);
  console.log(`First account balance: ${ethers.utils.formatEther(firstAccountBalance)}`);
  const secondAccountBalance = await deployedFundMe.fundersToAmount(secondAccount.address);
  console.log(`Second account balance: ${ethers.utils.formatEther(secondAccountBalance)}`);
}

async function verifyFundMe(deployedFundMeAddress, args) {
  await hre.run("verify:verify", {
    address: deployedFundMeAddress,
    constructorArguments: args,
  });
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

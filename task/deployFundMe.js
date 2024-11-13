const { task } = require("hardhat/config");


task("deployFundMe", "Deploys the FundMe contract").setAction(
  async (taskArgs, hre) => {
    //creat factor
    const fundMe = await ethers.getContractFactory("FundMe");
    //deploy contract
    const deployedFundMe = await fundMe.deploy(10);
    //wait for deployment
    console.log("Deploying contract...");
    await deployedFundMe.waitForDeployment();
    console.log(`Contract deployed to:  ${deployedFundMe.target}`);
  }
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
);

async function verifyFundMe(deployedFundMeAddress, args) {
    await hre.run("verify:verify", {
      address: deployedFundMeAddress,
      constructorArguments: args,
    });
  }

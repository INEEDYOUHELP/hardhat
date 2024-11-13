const { task } = require("hardhat/config");

task("interactFundMe", "Interact with the FundMe contract")
  .addParam("contractAddress", "The address of the FundMe contract")
  .setAction(async (taskArgs, hre) => {
    const fundMeFactory = await hre.ethers.getContractFactory("FundMe");
    const fundMe = await fundMeFactory.attach(taskArgs.contractAddress);
    //initialize accounts
    const [firstAccount, secondAccount] = await ethers.getSigners();

    //fun contract with first account
    const fundTx = await fundMe.fund({
      value: ethers.utils.parseEther("0.01"),
    });
    await fundTx.wait();

    //check balance of contract
    const contractBalance = await deployedFundMe.provider.getBalance(
      deployedFundMe.target
    );
    console.log(
      `Contract balance: ${ethers.utils.formatEther(contractBalance)}`
    );
    //found contract with second account
    const fundTxSecondAccount = await deployedFundMe.fund({
      value: ethers.utils.parseEther("0.01"),
    });
    await fundTxSecondAccount.wait();
    //check balance of contract
    const contractBalanceSecond = await deployedFundMe.provider.getBalance(
      deployedFundMe.target
    );
    console.log(
      `Contract balance: ${ethers.utils.formatEther(contractBalanceSecond)}`
    );
    //check mapping fundersToAmount
    const firstAccountBalance = await deployedFundMe.fundersToAmount(
      firstAccount.address
    );
    console.log(
      `First account balance: ${ethers.utils.formatEther(firstAccountBalance)}`
    );
    const secondAccountBalance = await deployedFundMe.fundersToAmount(
      secondAccount.address
    );
    console.log(
      `Second account balance: ${ethers.utils.formatEther(
        secondAccountBalance
      )}`
    );
  });

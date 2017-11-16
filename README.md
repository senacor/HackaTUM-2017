# hackaTUM-2017-pay-how-you-drive

## Setup

You need at least the following tools:

1. Ethereum client and/or testrpc (for local tests testrpc is enough)
2. nodeJs
3. truffle framework

This porject just contains contracts managed by truffle. It is based on the truffle framework's "metacoin" box. 
For building a real DApp you might also want to attach a user interface. For further DApp examples you can take a look at other [truffle boxes](http://truffleframework.com/boxes/).

The project uses the standard truffle commands:

1. **truffle compile**: compile the contracts
2. **truffle migrate**: deploy new version of the contracts to your client (testrpc, geth, ...)
3. **truffle test**: run test cases

### IDEs for smart contract development

The Solidity online documentation still states, that browser solidity (Remix) is the tool to go. Yes, broser solidity (Remix) is nice for compiling, deploying and getting the ABI, but we don't recommend to use it. 
It is nice for a first time smart contract coder to get an overview and understand how smart contracts work, but it is often buggy and annoying. 

We recommend to use the truffle framework for compilation, deployment and test and code in IntelliJ's Webstorm or IDEA. You can also go Sublime or Atom if you prefer a more lightweight environment.

### Environment Setup Details

For setup details you can have a look at our [smart contract workshop setup script](https://github.com/senacor/SmartContract-WorkshopSetup/blob/master/alternative-setup/scripts/bootstrap.sh).

## Contract Skeleton

The contract skeleton can be found in ```contracts/PayHowYouDriveInsurance.sol```. It depicts a very simple insurance. The use-case is not advanced at all - you should not just use it in your product, but extend it or even rewrite it completely.

We will take a look on the code and the tools together. Feel free to ask questions at any time.


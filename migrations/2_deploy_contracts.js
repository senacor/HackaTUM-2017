var PayHowYouDriveInsurance = artifacts.require("./PayHowYouDriveInsurance.sol");

module.exports = function(deployer, network, accounts) {
    //deployer.deploy(aLibrary);
    //deployer.link(aLibrary, PayHowYouDriveInsurance);

    var policyMax = 100000000000000000;
    var insurance = accounts[0];
    var customer = accounts[1];
    var car = accounts[2];

    deployer.deploy(PayHowYouDriveInsurance, policyMax, customer, car);
};

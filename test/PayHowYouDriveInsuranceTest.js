var PayHowYouDriveInsurance = artifacts.require("./PayHowYouDriveInsurance.sol");

contract('PayHowYouDriveInsurance', function(accounts) {

    var insurance = accounts[0];
    var customer = accounts[1];
    var car = accounts[2];

    var policyMax = 100000000000000000;

    var payHowYouDriveInscontract = null;

    var INSURANCE_STATE_CREATED = 0;
    var INSURANCE_STATE_ACTIVE = 1;
    var INSURANCE_STATE_INACTIVE = 2;
    var INSURANCE_STATE_WITHDRAWN = 3;

    beforeEach(function(done){
        PayHowYouDriveInsurance.new(policyMax, customer, car, {from: insurance}).then(function(instance) {
            payHowYouDriveInscontract = instance;
        }).then(done);
    });

    describe("init", function() {
        it("should init contract", function () {
            assert.notEqual(payHowYouDriveInscontract, null);
            getContractState()
            	.then(state => {
            		assert.equal(state.customer, customer, "customer was not initialized correctly");
            		assert.equal(state.insurance, insurance, "insurance was not initialized correctly");
            		assert.equal(state.monthlyPolicyMax, policyMax, "max policy was not initialized correctly");
            		assert.equal(state.insuranceState, INSURANCE_STATE_CREATED, "state was not initialized correctly")
            	})
        });

    });


    describe("buy insurance as customer", function() {

        it("should buy insurance when customer sends enough money", function() {
            return payHowYouDriveInscontract.buy({from: customer, value: policyMax})
	            .then(getContractState)
	            .then(state => {
	                assert.equal(state.moneyInsurance, policyMax - policyMax / 10, "insurance money not correct after buy");
	                assert.equal(state.moneyCustomer, policyMax / 10, "customer money not correct after buy");
	                assert.equal(state.badDrivingStep, policyMax / 100, "bad driving step not correct after buy");
	                assert.equal(state.insuranceState, INSURANCE_STATE_ACTIVE, "not insured after buy");
	            });
        });

    });

    describe("record bad driving as car", function() {

        it("should increase insurance money and decrease customer money when bad driving is recorded", function() {
        	return payHowYouDriveInscontract.buy({from: customer, value: policyMax})
        		.then(() => payHowYouDriveInscontract.recordBadDriving({from: car}))
        		.then(getContractState)
        		.then(state => {
        			assert.equal(state.moneyInsurance, 
        				policyMax - policyMax / 10 + (policyMax / 100), 
        				"insurance got more money after bad driving skill was recorded");

        			assert.equal(state.moneyCustomer, policyMax / 10 - (policyMax / 100),
                        "customer got less money after bad driving skill was recorded");
        		});
        });

    });

    describe("withdraw money after buy and bad driving record", function() {

        it("should increase insurance money and decreas customer money when bad driving is recorded", function() {
        	return payHowYouDriveInscontract.buy({from: customer, value: policyMax})
        		.then(() => payHowYouDriveInscontract.recordBadDriving({from: car}))
        		.then(() => payHowYouDriveInscontract.withdrawInsuranceMoney({from: insurance}))
        		.then(getContractState)
        		.then(state => {
        			assert.equal(state.moneyInsurance, 0, "insurance could not withdraw money");
        			assert.equal(state.insuranceState, INSURANCE_STATE_WITHDRAWN, "insurance state not withdrawn");
        		})
        		.then(() => payHowYouDriveInscontract.withdrawCustomerMoney({from: customer}))
        		.then(getContractState)
        		.then(state => {
        			assert.equal(state.moneyCustomer, 0, "customer could not withdraw money");
        			assert.equal(state.balance, 0, "contract still holds money although it should not");
        			assert.equal(state.insuranceState, INSURANCE_STATE_INACTIVE, "insurance state not inactive");
        		});
        });

    });

    function getContractState() {
    	let attributes = [
    		"monthlyPolicyMax",
    		"moneyInsurance",
    		"moneyCustomer",
    		"badDrivingStep",
    		"insuranceState",
    		"getBalance",
    		"customer",
    		"insurance"
    	];

    	return Promise
    		.all(attributes.map(attr => payHowYouDriveInscontract[attr].call()))
    		.then(vals => {
    			return {
 					monthlyPolicyMax: vals[0].toNumber(),
 					moneyInsurance: vals[1].toNumber(),
 					moneyCustomer: vals[2].toNumber(),
 					badDrivingStep: vals[3].toNumber(),
 					insuranceState: vals[4].toNumber(),
 					balance: vals[5].toNumber(),
 					customer: vals[6],
 					insurance: vals[7]
    			};
    		});
    }

});



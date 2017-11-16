pragma solidity ^0.4.4;

import './mortal.sol';

contract PayHowYouDriveInsurance is mortal {

	address public customer;
	address public insurance;
    address public car;

	uint public monthlyPolicyMax;

    uint public moneyCustomer; // customer stores money in contract, the variable part of the insurance
    uint public moneyInsurance; // insurance gets amount of customer money, the fixed part of the insurance
    uint public badDrivingStep; // 1/10 of the variable part

    enum InsuranceState { CREATED, ACTIVE, INACTIVE, WITHDRAWN }

    InsuranceState public insuranceState;


	function PayHowYouDriveInsurance(uint _monthlyPolicyMax, address _customer, address _car) {
		monthlyPolicyMax = _monthlyPolicyMax;
        customer = _customer;
        car = _car;

        insurance = msg.sender;

        insuranceState = InsuranceState.CREATED;
	}


    modifier sufficientPolicyMoney(uint _money) {
        require(_money == monthlyPolicyMax);
        _;
    }

    modifier customerOnly(address _customer) {
        require(customer == _customer);
        _;
    }

    modifier insuranceOnly(address _insurance) {
        require(insurance == _insurance);
        _;
    }

    modifier carOnly(address _car) {
        require(car == _car);
        _;
    }


	function buy() public payable
        sufficientPolicyMoney(msg.value)
        customerOnly(msg.sender) {

        require(insuranceState == InsuranceState.CREATED);

        moneyInsurance = monthlyPolicyMax - monthlyPolicyMax / 10;
        moneyCustomer = monthlyPolicyMax - moneyInsurance;

        badDrivingStep = moneyCustomer / 10;

        insuranceState = InsuranceState.ACTIVE;
	}

    function recordBadDriving() public carOnly(msg.sender) {
        require(insuranceState == InsuranceState.ACTIVE);

        moneyCustomer = moneyCustomer - badDrivingStep;
        moneyInsurance = moneyInsurance + badDrivingStep;
    }

    function withdrawInsuranceMoney() public insuranceOnly(msg.sender) {
        insurance.transfer(moneyInsurance);
        insuranceState = InsuranceState.WITHDRAWN;
        moneyInsurance = 0;
    }

    function withdrawCustomerMoney() public customerOnly(msg.sender) {
        customer.transfer(moneyCustomer);
        insuranceState = InsuranceState.INACTIVE;
        moneyCustomer = 0;
    }

    function getBalance() public constant returns(uint) {
        return this.balance;
    }

}

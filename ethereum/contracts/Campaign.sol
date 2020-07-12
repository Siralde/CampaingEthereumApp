pragma solidity ^0.4.0;

contract CampaignFactory {

    Campaign[] public deployedCampaigns;

    function createCampaign(uint minimun) public {
        Campaign newCampaign = new Campaign(minimun, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimunContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(
            msg.sender == manager,
            "The sender has to be the manager"
            );
        _;
    }

    constructor(uint minimun, address creator) public {
        manager = creator;
        minimunContribution = minimun;
        approversCount = 0;
    }

    function contribute() public payable {
        require(
            msg.value > minimunContribution,
            "The ammount has to be a least the minimunContribution"
            );
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {

        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(
            approvers[msg.sender],
            "The sender has to be an approver"
            );
        require(
            !request.approvals[msg.sender],
            "The sender already aprove this request before"
            ); // Nos dice si ya la persona a votado, en ese caso devolveria TRUE y ara que no vuelva a votar se le pone el !

        request.approvals[msg.sender] = true;
        request.approvalCount++;

    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(
            request.approvalCount > (approversCount / 2),
            "To finalize the request you need approversCount/2"
            );
        require(!request.complete, "The request has finalized");
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimunContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint)
    {
        return requests.length;
    }
}
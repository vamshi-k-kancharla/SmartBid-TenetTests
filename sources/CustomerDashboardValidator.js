
var CustomerDashboardValidatorModule = ( function() {

    // Customer Dashboard record retrieval tests

    async function executeCustomerDashboardRecordTest()
    {
        
        let customerDashboardRecordUrlParamsString = "CustomerAuctionsAndBids?SellerCustomerId=" + 
            GlobalsForClientModule.currentCustomerDashboardId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( customerDashboardRecordUrlParamsString, 
        successfulCustomerDashboardRecord, failureCustomerDashboardRecord );
        
    }

    function successfulCustomerDashboardRecord(responseTextFromServer) 
    {

        console.log("Successfully retrieved the customer Bids & Auctions from Server => " + responseTextFromServer);

        let currentCustomerDashboardAuctionRecords = JSON.parse(responseTextFromServer).CustomerAuctions;
        let currentCustomerDashboardBidRecords = JSON.parse(responseTextFromServer).CustomerBids;

        console.log("currentCustomerDashboardAuctionRecords.length => " + currentCustomerDashboardAuctionRecords.length);
        console.log("currentCustomerDashboardBidRecords.length => " + currentCustomerDashboardBidRecords.length);


        if( !ClientInputValidatorModule.validateRecordRetrievalObjectInArray( currentCustomerDashboardAuctionRecords , 
            GlobalsForClientModule.customerDashboardAssetsObjects[2] ) ||
            !ClientInputValidatorModule.validateRecordRetrievalObjectInArray( currentCustomerDashboardAuctionRecords , 
            GlobalsForClientModule.customerDashboardAssetsObjects[3] ) ||
            !ClientInputValidatorModule.validateRecordRetrievalObjectInArray( currentCustomerDashboardBidRecords , 
            GlobalsForClientModule.customerDashboardAssetsObjects[0] ) ||
            !ClientInputValidatorModule.validateRecordRetrievalObjectInArray( currentCustomerDashboardBidRecords , 
            GlobalsForClientModule.customerDashboardAssetsObjects[1] )
        )
        {

            console.log("Retrieved Bid Records & Customer Auctions are incorrect");
            document.getElementById(GlobalsForClientModule.currentCustomerDashboardRetrieveRecordsContainer).innerHTML = "Retrieve Customer Auctions & Bid Records Test Failed";
            document.getElementById(GlobalsForClientModule.currentCustomerDashboardRetrieveRecordsContainer).style.color = "Red";
                
        }

        else
        {

            console.log("Retrieved Bid & Auction Record values matched that of expected");
            document.getElementById(GlobalsForClientModule.currentCustomerDashboardRetrieveRecordsContainer).innerHTML = "Retrieve Customer Auctions & Bid Records Test Passed";
            document.getElementById(GlobalsForClientModule.currentCustomerDashboardRetrieveRecordsContainer).style.color = "Blue";

        }

        GlobalsForClientModule.customerDashboardBidsAssetArray[0] = currentCustomerDashboardBidRecords[0].AssetId;
        GlobalsForClientModule.customerDashboardBidsAssetArray[1] = currentCustomerDashboardBidRecords[1].AssetId;

        GlobalsForClientModule.currentBidRecordIndexForDeletion = 0;

        executeBidRecordDeletionsTest();

    }

    function failureCustomerDashboardRecord(responseTextFromServer) 
    {

        console.log("Couldn't Retrieve Bid Records & Customer Auctions");
        document.getElementById(GlobalsForClientModule.currentCustomerDashboardRetrieveRecordsContainer).innerHTML = "Retrieve Customer Auctions & Bid Records Test Failed";
        document.getElementById(GlobalsForClientModule.currentCustomerDashboardRetrieveRecordsContainer).style.color = "Red";
                
        GlobalsForClientModule.customerDashboardBidsAssetArray[0] = 0;
        GlobalsForClientModule.customerDashboardBidsAssetArray[1] = 0;


        executeBidRecordDeletionsTest();

    }

    // Delete Bids Test

    async function executeBidRecordDeletionsTest()
    {
        
        let currentBidRecordAssetId = GlobalsForClientModule.customerDashboardBidsAssetArray[GlobalsForClientModule.currentBidRecordIndexForDeletion];

        let bidRecordRemovalUrlParamsString = "DeleteBids?AssetId=" + currentBidRecordAssetId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( bidRecordRemovalUrlParamsString, 
            successfulBidRecordRemoval, failureBidRecordRemoval );
        
    }

    function successfulBidRecordRemoval(responseTextFromServer) 
    {

        console.log("Successfully Removed the bid Record Data => " + responseTextFromServer);

        console.log("successfulBidRecordRemoval : currentCustomerDashboardBidRecordRemovalContainerPrefix " + 
            GlobalsForClientModule.currentCustomerDashboardBidRecordRemovalContainerPrefix);
        console.log("successfulBidRecordRemoval : currentBidRecordIndexForDeletion " + 
            GlobalsForClientModule.currentBidRecordIndexForDeletion);

        document.getElementById(GlobalsForClientModule.currentCustomerDashboardBidRecordRemovalContainerPrefix + 
            GlobalsForClientModule.currentBidRecordIndexForDeletion).innerHTML = "Bid Record Removal Test Passed";
        document.getElementById(GlobalsForClientModule.currentCustomerDashboardBidRecordRemovalContainerPrefix + 
            GlobalsForClientModule.currentBidRecordIndexForDeletion).style.color = "Blue";

        executeBidRecordRemovalConfirmationTest();
    }

    function failureBidRecordRemoval(responseTextFromServer) 
    {

        console.log("Failed to Remove the bid Record Data => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.currentCustomerDashboardBidRecordRemovalContainerPrefix + 
            GlobalsForClientModule.currentBidRecordIndexForDeletion).innerHTML = "Bid Record Removal Test Failed";
        document.getElementById(GlobalsForClientModule.currentCustomerDashboardBidRecordRemovalContainerPrefix + 
            GlobalsForClientModule.currentBidRecordIndexForDeletion).style.color = "Red";

        executeBidRecordRemovalConfirmationTest();
    }

    // Bid Record Removal Confirmation Test

    async function executeBidRecordRemovalConfirmationTest()
    {
        
        let currentBidRecordAssetId = GlobalsForClientModule.customerDashboardBidsAssetArray[GlobalsForClientModule.currentBidRecordIndexForDeletion];

        let bidRecordRetrievalUrlParamsString = "RetrieveBids?AssetId=" + currentBidRecordAssetId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( bidRecordRetrievalUrlParamsString, 
        successfulBidRecordRemovalConfirmation, failureBidRecordRemovalConfirmation );
        
    }

    function successfulBidRecordRemovalConfirmation(responseTextFromServer) 
    {

        console.log("Successfully Retrieved the Bid Record Data => " + responseTextFromServer);

        if( JSON.parse(responseTextFromServer).length != 0 )
        {

            console.log("Couldn't confirm the deletion of Bid Records");

            document.getElementById(GlobalsForClientModule.currentCustomerDashboardBidRecordRemovalConfirmationContainerPrefix + 
                GlobalsForClientModule.currentBidRecordIndexForDeletion).innerHTML = "Bid Record Removal confirmation Test Failed";
            document.getElementById(GlobalsForClientModule.currentCustomerDashboardBidRecordRemovalConfirmationContainerPrefix + 
                GlobalsForClientModule.currentBidRecordIndexForDeletion).style.color = "Red";

        }

        else
        {

            console.log("Was able to confirm the deletion of Bid Records");

            document.getElementById(GlobalsForClientModule.currentCustomerDashboardBidRecordRemovalConfirmationContainerPrefix + 
                GlobalsForClientModule.currentBidRecordIndexForDeletion).innerHTML = "Bid Record Removal confirmation Test Passed";
            document.getElementById(GlobalsForClientModule.currentCustomerDashboardBidRecordRemovalConfirmationContainerPrefix + 
                GlobalsForClientModule.currentBidRecordIndexForDeletion).style.color = "Blue";


        }

        exitTheMultiBidRecordRemovalTest();

    }

    function failureBidRecordRemovalConfirmation(responseTextFromServer) 
    {

        console.log("Failed to confirm the removal of Bid Record Data => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.currentBidRecordRemovalConfirmationTestContainer).innerHTML = "Bid Record Removal Confirmation Test Failed";
        document.getElementById(GlobalsForClientModule.currentBidRecordRemovalConfirmationTestContainer).style.color = "Red";

        exitTheMultiBidRecordRemovalTest();

    }

    async function exitTheMultiBidRecordRemovalTest()
    {

        GlobalsForClientModule.currentBidRecordIndexForDeletion++;

        if( GlobalsForClientModule.currentBidRecordIndexForDeletion < GlobalsForClientModule.customerDashboardBidsAssetArray.length )
        {
            await executeBidRecordDeletionsTest();
        }
        else
        {
            await GlobalsForClientModule.executeBidRecordRemovalsCompletionTest();
        }

    }

    return {

        executeCustomerDashboardRecordTest : executeCustomerDashboardRecordTest,

    }

})();

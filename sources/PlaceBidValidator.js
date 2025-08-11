
var PlaceBidValidatorModule = ( function() {

    // Place Bid Test

    async function executePlaceBidRecordTest()
    {
        
        let placeBidRecordUrlParamsString = "AddBid?AssetId=" + GlobalsForClientModule.currentAssetRecordId + 
        "&CustomerId=" + GlobalsForClientModule.currentAssetBidderCustomerId + "&BidPrice=" + 
        GlobalsForClientModule.currentAssetBiddingPrice + "&BiddingType=" + 
        GlobalsForClientModule.currentAssetBiddingType;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( placeBidRecordUrlParamsString, 
        successfulPlaceBidRecord, failurePlaceBidRecord );
        
    }

    function successfulPlaceBidRecord(responseTextFromServer) 
    {

        console.log("Successfully placed the Bid => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.placeBidTestContainer).innerHTML = "Place Bid Record Test Passed";
        document.getElementById(GlobalsForClientModule.placeBidTestContainer).style.color = "Blue";

        executeBidRecordRetrievalTest();
    }

    function failurePlaceBidRecord(responseTextFromServer) 
    {

        console.log("Failed to place the bid => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.placeBidTestContainer).innerHTML = "Place Bid Record Test Failed";
        document.getElementById(GlobalsForClientModule.placeBidTestContainer).style.color = "Red";

        executeBidRecordRetrievalTest();
    }

    // Retrieve Bid Test

    async function executeBidRecordRetrievalTest()
    {
        
        let retrieveBidRecordUrlParamsString = "RetrieveBids?AssetId=" + GlobalsForClientModule.currentAssetRecordId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( retrieveBidRecordUrlParamsString, 
        successfulRetrieveBidRecord, failureRetrieveBidRecord );
        
    }

    function successfulRetrieveBidRecord(responseTextFromServer) 
    {

        console.log("Successfully retrieved the Bid => " + responseTextFromServer);

        let currentBidCompareRecord = ( JSON.parse(responseTextFromServer).length == 1 ) ? JSON.parse(responseTextFromServer)[0] :
            JSON.parse(responseTextFromServer)[1];

        if( !ClientInputValidatorModule.validateRecordRetrievalObject( currentBidCompareRecord , 
            GlobalsForClientModule.currentRetrieveAssetObject ) )
        {

            console.log("Retrieved Bid Record values are incorrect");
            document.getElementById(GlobalsForClientModule.retrieveBidTestContainer).innerHTML = "Retrieve Bid Record Test Failed";
            document.getElementById(GlobalsForClientModule.retrieveBidTestContainer).style.color = "Red";
                
        }

        else
        {

            console.log("Retrieved Bid Record values matched that of expected");
            document.getElementById(GlobalsForClientModule.retrieveBidTestContainer).innerHTML = "Retrieve Bid Record Test Passed";
            document.getElementById(GlobalsForClientModule.retrieveBidTestContainer).style.color = "Blue";

        }

        executeBidAssetRecordRetrievalTest();

    }

    function failureRetrieveBidRecord(responseTextFromServer) 
    {

        console.log("Failed to retrieve the bid => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.retrieveBidTestContainer).innerHTML = "Retrieve Bid Record Test Failed";
        document.getElementById(GlobalsForClientModule.retrieveBidTestContainer).style.color = "Red";

        executeBidAssetRecordRetrievalTest();

    }

    // Retrieve Asset & Compare Bid Test

    async function executeBidAssetRecordRetrievalTest()
    {
        
        let retrieveBidAssetRecordUrlParamsString = "RetrieveAuctions?Status=Open&SellerCustomerId=" + 
            GlobalsForClientModule.currentAssetSellerCustomerId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( retrieveBidAssetRecordUrlParamsString, 
        successfulRetrieveBidAssetRecord, failureRetrieveBidAssetRecord );
        
    }

    function successfulRetrieveBidAssetRecord(responseTextFromServer) 
    {

        console.log("Successfully retrieved the Bid Asset Record => " + responseTextFromServer);

        let currentBidAssetRecord = ( JSON.parse(responseTextFromServer).length == 1 ) ? JSON.parse(responseTextFromServer)[0] :
            ( (GlobalsForClientModule.currentBidRecordIndexForValidation == 0 ) ? JSON.parse(responseTextFromServer)[0] : 
            JSON.parse(responseTextFromServer)[1] );
        let currentValidateBidRecord = GlobalsForClientModule.currentValidateBidObject;

        if( currentBidAssetRecord.AssetId != currentValidateBidRecord.AssetId || 
            currentBidAssetRecord.BidderCustomerId != currentValidateBidRecord.CustomerId || 
            currentBidAssetRecord.CurrentBidPrice != currentValidateBidRecord.BidPrice )
        {

            console.log("Bid is not successfully updated in the Asset Record");

            console.log( currentBidAssetRecord.AssetId +  "!=" + currentValidateBidRecord.AssetId + "||" + 
                currentBidAssetRecord.BidderCustomerId +  "!=" + currentValidateBidRecord.CustomerId + "||" + 
                currentBidAssetRecord.CurrentBidPrice  +  "!=" + currentValidateBidRecord.BidPrice );

            document.getElementById(GlobalsForClientModule.retrieveBidAssetTestContainer).innerHTML = "Compare Bid Asset Record Test Failed";
            document.getElementById(GlobalsForClientModule.retrieveBidAssetTestContainer).style.color = "Red";
                
        }

        else
        {

            console.log("Bid is successfully updated in the Asset Record");

            document.getElementById(GlobalsForClientModule.retrieveBidAssetTestContainer).innerHTML = "Compared Bid Asset Record Test Passed";
            document.getElementById(GlobalsForClientModule.retrieveBidAssetTestContainer).style.color = "Blue";

        }

        GlobalsForClientModule.executePlaceBidRecordCompletionTest();

    }

    function failureRetrieveBidAssetRecord(responseTextFromServer) 
    {

        console.log("Failed to retrieve the Bid Asset Record => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.retrieveBidAssetTestContainer).innerHTML = "Compare Bid Asset Record Test Failed";
        document.getElementById(GlobalsForClientModule.retrieveBidAssetTestContainer).style.color = "Red";

        GlobalsForClientModule.executePlaceBidRecordCompletionTest();

    }

    // Bids Record Removal Test

    async function executeBidsRecordRemovalTest()
    {
        
        let bidRecordRemovalUrlParamsString = "DeleteBids?AssetId=" + GlobalsForClientModule.currentAssetRecordId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( bidRecordRemovalUrlParamsString, 
        successfulBidRecordRemoval, failureBidRecordRemoval );
        
    }

    function successfulBidRecordRemoval(responseTextFromServer) 
    {

        console.log("Successfully Removed the bid Record Data => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.currentBidRecordRemovalTestContainer).innerHTML = "Bid Record Removal Test Passed";
        document.getElementById(GlobalsForClientModule.currentBidRecordRemovalTestContainer).style.color = "Blue";

        executeBidRecordRemovalConfirmationTest();
    }

    function failureBidRecordRemoval(responseTextFromServer) 
    {

        console.log("Failed to Remove the bid Record Data => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.currentBidRecordRemovalTestContainer).innerHTML = "Bid Record Removal Test Failed";
        document.getElementById(GlobalsForClientModule.currentBidRecordRemovalTestContainer).style.color = "Red";

        executeBidRecordRemovalConfirmationTest();
    }


    // Bid Record Removal Confirmation Test

    async function executeBidRecordRemovalConfirmationTest()
    {
        
        let bidRecordRetrievalUrlParamsString = "RetrieveBids?AssetId=" + GlobalsForClientModule.currentAssetRecordId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( bidRecordRetrievalUrlParamsString, 
        successfulBidRecordRemovalConfirmation, failureBidRecordRemovalConfirmation );
        
    }

    function successfulBidRecordRemovalConfirmation(responseTextFromServer) 
    {

        console.log("Successfully Retrieved the Bid Record Data => " + responseTextFromServer);

        if( JSON.parse(responseTextFromServer).length != 0 )
        {

            console.log("Couldn't confirm the deletion of Bid Records");
            document.getElementById(GlobalsForClientModule.currentBidRecordRemovalConfirmationTestContainer).innerHTML = "Bid Record Removal Confirmation Test Failed";
            document.getElementById(GlobalsForClientModule.currentBidRecordRemovalConfirmationTestContainer).style.color = "Red";
                
        }

        else
        {

            console.log("Was able to confirm the deletion of Bid Records");
            document.getElementById(GlobalsForClientModule.currentBidRecordRemovalConfirmationTestContainer).innerHTML = "Bid Record Removal Confirmation Test Passed";
            document.getElementById(GlobalsForClientModule.currentBidRecordRemovalConfirmationTestContainer).style.color = "Blue";

        }

        GlobalsForClientModule.executeDeleteBidRecordCompletionTest(GlobalsForClientModule.currentAssetRecordId);

    }

    function failureBidRecordRemovalConfirmation(responseTextFromServer) 
    {

        console.log("Failed to confirm the removal of Bid Record Data => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.currentBidRecordRemovalConfirmationTestContainer).innerHTML = "Bid Record Removal Confirmation Test Failed";
        document.getElementById(GlobalsForClientModule.currentBidRecordRemovalConfirmationTestContainer).style.color = "Red";

        GlobalsForClientModule.executeDeleteBidRecordCompletionTest(GlobalsForClientModule.currentAssetRecordId);

    }

    return {

        executePlaceBidRecordTest : executePlaceBidRecordTest,
        
        executeBidsRecordRemovalTest : executeBidsRecordRemovalTest,

    }

})();

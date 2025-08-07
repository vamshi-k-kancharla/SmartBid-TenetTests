
var PlaceBidValidatorModule = ( function() {

    // Place Bid Test

    async function executePlaceBidRecordTest()
    {
        
        let placeBidRecordUrlParamsString = "AddBid?AssetId=" + GlobalsForClientModule.currentAssetRecordId + 
        "&CustomerId=" + GlobalsForClientModule.currentAssetBidderCustomerId + "&BidPrice=" + 
        GlobalsForClientModule.currentAssetBiddingPrice + "&BiddingType=" + 
        GlobalsForClientModule.currentAssetBiddingType;;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( placeBidRecordUrlParamsString, 
        successfulPlaceBidRecord, failurePlaceBidRecord );
        
    }

    function successfulPlaceBidRecord(responseTextFromServer) 
    {

        console.log("Successfully placed the Bid => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.placeBidTestContainer).innerHTML = "Place Bid Record Test Passed";
        document.getElementById(GlobalsForClientModule.placeBidTestContainer).style.color = "Blue";

        //executeCustomerRecordRemovalConfirmationTest();
    }

    function failurePlaceBidRecord(responseTextFromServer) 
    {

        console.log("Failed to place the bid => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.placeBidTestContainer).innerHTML = "Place Bid Record Test Failed";
        document.getElementById(GlobalsForClientModule.placeBidTestContainer).style.color = "Red";

        //executeCustomerRecordRemovalConfirmationTest();
    }

    return {

        executePlaceBidRecordTest : executePlaceBidRecordTest,
        
    }

})();

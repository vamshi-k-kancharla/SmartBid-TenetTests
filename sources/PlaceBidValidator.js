
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

        if( !ClientInputValidatorModule.validateRecordRetrievalObject( JSON.parse(responseTextFromServer)[0] , 
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

        // executeBidRecordRetrievalTest();

    }

    function failureRetrieveBidRecord(responseTextFromServer) 
    {

        console.log("Failed to retrieve the bid => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.retrieveBidTestContainer).innerHTML = "Retrieve Bid Record Test Failed";
        document.getElementById(GlobalsForClientModule.retrieveBidTestContainer).style.color = "Red";

        // executeBidRecordRetrievalTest();

    }


    return {

        executePlaceBidRecordTest : executePlaceBidRecordTest,
        
    }

})();

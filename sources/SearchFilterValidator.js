
var SearchFilterValidatorModule = ( function() {

    // Search Filter Tests

    async function executeSearchFilterAssetRecordRetrievalTest()
    {
        
        let assetRecordRetrievalUrlParamsString = "RetrieveAuctions?Status=Open";

        for( let currentKey in GlobalsForClientModule.searchFilterTests_CurrentFilterObject )
        {
            assetRecordRetrievalUrlParamsString += "&" + currentKey + "=" + 
                GlobalsForClientModule.searchFilterTests_CurrentFilterObject[currentKey];
        }

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( assetRecordRetrievalUrlParamsString, 
        successfulAssetRecordRetrieval, failureAssetRecordRetrieval );
        
    }

    async function successfulAssetRecordRetrieval(responseTextFromServer) 
    {

        console.log("Successfully Retrieved the Asset Record Data => " + responseTextFromServer);

        let currentFilterAssetObject = GlobalsForClientModule.searchFilterTests_CurrentAssetObject;

        if( ( Object.keys(currentFilterAssetObject).length == 0 && JSON.parse(responseTextFromServer).length == 0 ) 

            || ( Object.keys(currentFilterAssetObject).length != 0 && ClientInputValidatorModule.validateRecordRetrievalObject( 
                JSON.parse(responseTextFromServer)[0] , currentFilterAssetObject ) )
            ) 
        {

            console.log("Retrieved Asset Record values matched that of expected");
            document.getElementById(GlobalsForClientModule.currentSearchFilterAssetRetrievalTestContainer).innerHTML = "Search Filter Asset Record Retrieval Test Passed";
            document.getElementById(GlobalsForClientModule.currentSearchFilterAssetRetrievalTestContainer).style.color = "Blue";

        }

        else
        {

            console.log("Retrieved Asset Record values are incorrect");
            document.getElementById(GlobalsForClientModule.currentSearchFilterAssetRetrievalTestContainer).innerHTML = "Search Filter Asset Record Retrieval Test Failed";
            document.getElementById(GlobalsForClientModule.currentSearchFilterAssetRetrievalTestContainer).style.color = "Red";
                
        }

        await GlobalsForClientModule.currentCallBackFunctionForSearchFilterAssetRetrievalTest();

    }

    async function failureAssetRecordRetrieval(responseTextFromServer) 
    {

        console.log("Failed to Retrieve the Asset Record Data => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.currentSearchFilterAssetRetrievalTestContainer).innerHTML = "Search Filter Asset Record Retrieval Test Failed";
        document.getElementById(GlobalsForClientModule.currentSearchFilterAssetRetrievalTestContainer).style.color = "Red";

        await GlobalsForClientModule.currentCallBackFunctionForSearchFilterAssetRetrievalTest();
    }

    return {

        executeSearchFilterAssetRecordRetrievalTest : executeSearchFilterAssetRecordRetrievalTest,

    }

})();

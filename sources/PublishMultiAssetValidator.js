
var PublishMultiAssetValidatorModule = ( function() {

    // Publish MultiAsset Functional Test

    async function executePublishMultiAssetFunctionalTest()
    {
        
        let multiAssetDetailsObject = {};
        let currentMultiAssetObject = GlobalsForClientModule.currentObjectPublishMultiAssetTest[GlobalsForClientModule.currentMultiAssetTestIndex];

        for( let currentMultiAssetRecordKey in currentMultiAssetObject )
        {
            multiAssetDetailsObject[currentMultiAssetRecordKey] = currentMultiAssetObject[currentMultiAssetRecordKey];
        }

        let multiAssetDetailsFormData = ProcessFormInputModule.createFormInputData( multiAssetDetailsObject );

        await HttpRestAPIClientModule.sendHttpFileUploadRequestToSmartBidServerWithCallback( "UploadAuctionPhotos", 
            multiAssetDetailsFormData, successResponseUploadAuctionPhotos, failureResponseUploadAuctionPhotos );
        
    }

    async function successResponseUploadAuctionPhotos(responseTextFromServer) 
    {

        console.log("Successfully submitted the MultiAsset Record Data => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.currentPublishAssetTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "Publish MultiAsset Test Passed";
        document.getElementById(GlobalsForClientModule.currentPublishAssetTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Blue";

        await executeMultiAssetRecordRetrievalTest();
    }

    async function failureResponseUploadAuctionPhotos(responseTextFromServer) 
    {

        console.log("Failed to submit the MultiAsset Record Data => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.currentPublishAssetTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "Publish MultiAsset Test Failed";
        document.getElementById(GlobalsForClientModule.currentPublishAssetTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Red";

        await executeMultiAssetRecordRetrievalTest();
    }

    
    // Publish MultiAsset Retrieval Test

    async function executeMultiAssetRecordRetrievalTest()
    {
        
        let currentMultiAssetObject = GlobalsForClientModule.currentObjectPublishMultiAssetTest[GlobalsForClientModule.currentMultiAssetTestIndex];

        let multiAssetRecordRetrievalUrlParamsString = "RetrieveAuctions?Status=Open&SellerCustomerId=" + 
            currentMultiAssetObject.SellerCustomerId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( multiAssetRecordRetrievalUrlParamsString, 
        successfulMultiAssetRecordRetrieval, failureMultiAssetRecordRetrieval );
        
    }

    async function successfulMultiAssetRecordRetrieval(responseTextFromServer) 
    {

        console.log("Successfully Retrieved the MultiAsset Record Data => " + responseTextFromServer);

        let currentMultiAssetObject = GlobalsForClientModule.currentObjectPublishMultiAssetTest[GlobalsForClientModule.currentMultiAssetTestIndex];

        let retrievedResponseObjectFromServer = ( JSON.parse(responseTextFromServer).length == 1 ) ? JSON.parse(responseTextFromServer)[0] :
                                                JSON.parse(responseTextFromServer)[1];

        if( !ClientInputValidatorModule.validateRecordRetrievalObject( retrievedResponseObjectFromServer , 
            currentMultiAssetObject ) )
        {

            console.log("Retrieved MultiAsset Record values are incorrect");
            document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "MultiAsset Record Retrieval Test Failed";
            document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Red";
                
        }

        else
        {

            console.log("Retrieved MultiAsset Record values matched that of expected");
            document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "MultiAsset Record Retrieval Test Passed";
            document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Blue";

        }

        GlobalsForClientModule.customerDashboardAssetArray[GlobalsForClientModule.currentMultiAssetTestIndex] = 
            ( JSON.parse(responseTextFromServer).length == 1 ) ? JSON.parse(responseTextFromServer)[0].AssetId :
                                                JSON.parse(responseTextFromServer)[1].AssetId;

        await exitTheMultiAssetPublishTest();
    }

    async function failureMultiAssetRecordRetrieval(responseTextFromServer) 
    {

        console.log("Failed to Retrieve the MultiAsset Record Data => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "MultiAsset Record Retrieval Test Failed";
        document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer + GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Red";
                
        await exitTheMultiAssetPublishTest();
    }

    async function exitTheMultiAssetPublishTest()
    {

        GlobalsForClientModule.currentMultiAssetTestIndex++;

        if( GlobalsForClientModule.currentMultiAssetTestIndex < GlobalsForClientModule.currentObjectPublishMultiAssetTest.length )
        {

            await executePublishMultiAssetFunctionalTest();
        }
        else
        {
            await GlobalsForClientModule.currentObjectPublishMultiAssetCompletionTest();
        }

    }


    return {

        executePublishMultiAssetFunctionalTest : executePublishMultiAssetFunctionalTest,
        
    }

})();

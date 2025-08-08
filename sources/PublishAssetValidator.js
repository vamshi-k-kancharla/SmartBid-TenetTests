
var PublishAssetValidatorModule = ( function() {

    // Publish Asset Functional Test

    async function executePublishAssetFunctionalTest()
    {
        
        let assetDetailsObject = {};

        for( let currentAssetRecordKey in GlobalsForClientModule.currentObjectPublishAssetTest )
        {
            assetDetailsObject[currentAssetRecordKey] = GlobalsForClientModule.currentObjectPublishAssetTest[currentAssetRecordKey];
        }

        let assetDetailsFormData = ProcessFormInputModule.createFormInputData( assetDetailsObject );

        await HttpRestAPIClientModule.sendHttpFileUploadRequestToSmartBidServerWithCallback( "UploadAuctionPhotos", 
            assetDetailsFormData, successResponseUploadAuctionPhotos, failureResponseUploadAuctionPhotos );
        
    }

    function successResponseUploadAuctionPhotos(responseTextFromServer) 
    {

        console.log("Successfully submitted the Asset Record Data => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.currentPublishAssetTestContainer).innerHTML = "Publish Asset Test Passed";
        document.getElementById(GlobalsForClientModule.currentPublishAssetTestContainer).style.color = "Blue";

        executeAssetRecordRetrievalTest();
    }

    function failureResponseUploadAuctionPhotos(responseTextFromServer) 
    {

        console.log("Failed to Submit the Asset Record Data => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.currentPublishAssetTestContainer).innerHTML = "Publish Asset Test Failed";
        document.getElementById(GlobalsForClientModule.currentPublishAssetTestContainer).style.color = "Red";

        executeAssetRecordRetrievalTest();
    }

    
    // Publish Asset Retrieval Test

    async function executeAssetRecordRetrievalTest()
    {
        
        let assetRecordRetrievalUrlParamsString = "RetrieveAuctions?Status=Open&SellerCustomerId=" + 
            GlobalsForClientModule.publishAssetObject.SellerCustomerId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( assetRecordRetrievalUrlParamsString, 
        successfulAssetRecordRetrieval, failureAssetRecordRetrieval );
        
    }

    function successfulAssetRecordRetrieval(responseTextFromServer) 
    {

        console.log("Successfully Retrieved the Asset Record Data => " + responseTextFromServer);

        if( !ClientInputValidatorModule.validateRecordRetrievalObject( JSON.parse(responseTextFromServer)[0] , 
            GlobalsForClientModule.currentObjectPublishAssetTest ) )
        {

            console.log("Retrieved Asset Record values are incorrect");
            document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer).innerHTML = "Asset Record Retrieval Test Failed";
            document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer).style.color = "Red";
                
        }

        else
        {

            console.log("Retrieved Asset Record values matched that of expected");
            document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer).innerHTML = "Asset Record Retrieval Test Passed";
            document.getElementById(GlobalsForClientModule.currentAssetRetrievalTestContainer).style.color = "Blue";

        }

        GlobalsForClientModule.currentCallBackFunctionForPublishAssetTest(JSON.parse(responseTextFromServer)[0].AssetId);

    }

    function failureAssetRecordRetrieval(responseTextFromServer) 
    {

        console.log("Failed to Retrieve the Asset Record Data => " + responseTextFromServer);
        document.getElementById("assetRecordRetrievalTest_container").innerHTML = "Asset Record Retrieval Test Failed";
        document.getElementById("assetRecordRetrievalTest_container").style.color = "Red";

        GlobalsForClientModule.currentCallBackFunctionForPublishAssetTest();
    }


    // Asset Record Removal Test

    async function executeAssetRecordRemovalTest(inputAssetId = 0)
    {
        
        let assetRecordRemovalUrlParamsString = "DeleteAsset?AssetId=" + inputAssetId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( assetRecordRemovalUrlParamsString, 
        successfulAssetRecordRemoval, failureAssetRecordRemoval );
        
    }

    function successfulAssetRecordRemoval(responseTextFromServer) 
    {

        console.log("Successfully Removed the asset Record Data => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalTestContainer).innerHTML = "Asset Record Removal Test Passed";
        document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalTestContainer).style.color = "Blue";

        executeAssetRecordRemovalConfirmationTest();
    }

    function failureAssetRecordRemoval(responseTextFromServer) 
    {

        console.log("Failed to Remove the asset Record Data => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalTestContainer).innerHTML = "Asset Record Removal Test Failed";
        document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalTestContainer).style.color = "Red";

        executeAssetRecordRemovalConfirmationTest();
    }


    // Asset Record Removal Confirmation Test

    async function executeAssetRecordRemovalConfirmationTest()
    {
        
        let assetRecordRetrievalUrlParamsString = "RetrieveAuctions?Status=Open&SellerCustomerId=" + 
            GlobalsForClientModule.publishAssetObject.SellerCustomerId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( assetRecordRetrievalUrlParamsString, 
        successfulAssetRecordRemovalConfirmation, failureAssetRecordRemovalConfirmation );
        
    }

    function successfulAssetRecordRemovalConfirmation(responseTextFromServer) 
    {

        console.log("Successfully Retrieved the Asset Record Data => " + responseTextFromServer);

        if( JSON.parse(responseTextFromServer).length != 0 )
        {

            console.log("Couldn't confirm the deletion of Asset Record");
            document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalConfirmationTestContainer).innerHTML = "Asset Record Removal Confirmation Test Failed";
            document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalConfirmationTestContainer).style.color = "Red";
                
        }

        else
        {

            console.log("Was able to confirm the deletion of Asset Record");
            document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalConfirmationTestContainer).innerHTML = "Asset Record Removal Confirmation Test Passed";
            document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalConfirmationTestContainer).style.color = "Blue";

        }

        GlobalsForClientModule.currentCallbackFunctionForAssetRemovalTest();

    }

    function failureAssetRecordRemovalConfirmation(responseTextFromServer) 
    {

        console.log("Failed to confirm the removal of Asset Record Data => " + responseTextFromServer);
        document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalConfirmationTestContainer).innerHTML = "Asset Record Removal Confirmation Test Failed";
        document.getElementById(GlobalsForClientModule.currentAssetRecordRemovalConfirmationTestContainer).style.color = "Red";

        GlobalsForClientModule.currentCallbackFunctionForAssetRemovalTest();

    }


    return {

        executePublishAssetFunctionalTest : executePublishAssetFunctionalTest,

        executeAssetRecordRemovalTest : executeAssetRecordRemovalTest,
        
    }

})();

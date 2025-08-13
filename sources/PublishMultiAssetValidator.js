
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


    // Asset Record Removal Test

    async function executeMultiAssetRecordRemovalTest()
    {
        
        let currentMultiAssetId = GlobalsForClientModule.customerDashboardAssetArray[GlobalsForClientModule.currentMultiAssetTestIndex];
        let assetRecordRemovalUrlParamsString = "DeleteAsset?AssetId=" + currentMultiAssetId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( assetRecordRemovalUrlParamsString, 
        successfulAssetRecordRemoval, failureAssetRecordRemoval );
        
    }

    function successfulAssetRecordRemoval(responseTextFromServer) 
    {

        console.log("Successfully Removed the asset Record Data => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalContainerPrefix + 
            GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "Multi Asset Record Removal Test Passed";
        document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalContainerPrefix + 
            GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Blue";

        executeAssetRecordRemovalConfirmationTest();
    }

    function failureAssetRecordRemoval(responseTextFromServer) 
    {

        console.log("Failed to Remove the asset Record Data => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalContainerPrefix + 
            GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "Multi Asset Record Removal Test Failed";
        document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalContainerPrefix + 
            GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Red";

        executeAssetRecordRemovalConfirmationTest();
    }


    // Asset Record Removal Confirmation Test

    async function executeAssetRecordRemovalConfirmationTest()
    {
        
        let currentMultiAssetSellerCustomerId = GlobalsForClientModule.customerDashboardSellerCustomerIdArray[
            GlobalsForClientModule.currentMultiAssetTestIndex];
        let assetRecordRetrievalUrlParamsString = "RetrieveAuctions?Status=Open&SellerCustomerId=" + 
            currentMultiAssetSellerCustomerId;

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback( assetRecordRetrievalUrlParamsString, 
        successfulAssetRecordRemovalConfirmation, failureAssetRecordRemovalConfirmation );
        
    }

    async function successfulAssetRecordRemovalConfirmation(responseTextFromServer) 
    {

        console.log("Successfully Retrieved the Asset Record Data => " + responseTextFromServer);

        let numOfPresentRecords = ( GlobalsForClientModule.currentMultiAssetTestIndex % 2 == 0 ) ? 1 : 0;

        if( JSON.parse(responseTextFromServer).length != numOfPresentRecords )
        {

            console.log("Couldn't confirm the deletion of Asset Record");

            document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalConfirmationContainerPrefix + 
                GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "Multi Asset Record Removal confirmation Test Failed";
            document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalConfirmationContainerPrefix + 
                GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Red";
                
        }

        else
        {

            console.log("Was able to confirm the deletion of Asset Record");

            document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalConfirmationContainerPrefix + 
                GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "Multi Asset Record Removal confirmation Test Passed";
            document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalConfirmationContainerPrefix + 
                GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Blue";
                
        }

        await exitTheMultiAssetDeletionTest();

    }

    async function failureAssetRecordRemovalConfirmation(responseTextFromServer) 
    {

        console.log("Failed to confirm the removal of Asset Record Data => " + responseTextFromServer);

        document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalConfirmationContainerPrefix + 
            GlobalsForClientModule.currentMultiAssetTestIndex).innerHTML = "Multi Asset Record Removal confirmation Test Failed";
        document.getElementById(GlobalsForClientModule.currentCustomerDashboardAssetRecordRemovalConfirmationContainerPrefix + 
            GlobalsForClientModule.currentMultiAssetTestIndex).style.color = "Red";

        await exitTheMultiAssetDeletionTest();

    }

    async function exitTheMultiAssetDeletionTest()
    {

        GlobalsForClientModule.currentMultiAssetTestIndex++;

        if( GlobalsForClientModule.currentMultiAssetTestIndex < GlobalsForClientModule.customerDashboardAssetArray.length )
        {
            await executeMultiAssetRecordRemovalTest();
        }
        else
        {
            await GlobalsForClientModule.currentObjectDeleteMultiAssetCompletionTest();
        }

    }

    return {

        executePublishMultiAssetFunctionalTest : executePublishMultiAssetFunctionalTest,

        executeMultiAssetRecordRemovalTest : executeMultiAssetRecordRemovalTest,
        
    }

})();

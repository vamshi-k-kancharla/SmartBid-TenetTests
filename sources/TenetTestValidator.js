
async function validateTenetTests() {

    self.onmessage = async (e) => {

        console.log("TenentTestValidator: WebWorkerNumber = " + e.data.WebWorkerNumber);

        e.data['noOfSuccessfulQueries'] = 0;
        e.data['noOfFailureQueries'] = 0;

        self.postMessage(e.data);

        await executeCustomerSignupFunctionalTest(e.data);

    }

}

validateTenetTests();


// Tenet Records

const httpRequestURLPrefix = "http://127.0.0.1:8000/";

let customerRecordObject = {"Name":"CustomerName","EmailAddress":"customerEmail@gmail.com","Address":"Inupamula",
    "UserType":"Customer","City":"Hyderabad","State":"Telangana","Country":"India","Password":"abcd1234",
    "PhoneNumber":"730600410"};

let publishAssetObject = {"AssetType":"Flat","MinAuctionPrice":7500000,"Address":"ZPHS",
    "Colony":"Inupamula","City":"Nakrekal","State":"Telangana","Country":"India", "SellerCustomerId":0,
    "ApprovalType":"DTCP","AssetSize":"484 sq yards","BuiltUpArea":"3500 sqft", "Status":"open",
    "AssetBedrooms":3,"AssetBathrooms":4,"AssetDescription":"Beautiful Villa in Inupamula", "BiddingType":"open"};

let feedbackRecordObject = { "CustomerName":"abcdcustomer","EmailAddress":"customerEmail@gmail.com","Subject":"feedback subject",
    "Message":"SmartBid is exceptional" };


// Helper Util Functions

function transformCurrentRecordObject(inputRecord, inputRecordNumber, inputWorkerData)
{

    let resultRecordObject = {};

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("transformCurrentRecordObject.inputRecord = " + JSON.stringify(inputRecord));
    }

    for( let currentInputKey in inputRecord )
    {
        resultRecordObject[currentInputKey] = inputRecord[currentInputKey] + inputRecordNumber;

        if( inputWorkerData.bDisplayLogs )
        {
            console.log("transformCurrentRecordObject.resultRecordObject = " + JSON.stringify(resultRecordObject));
        }
    }

    return resultRecordObject;

}

function createFormInputData(userInputObject)
{
    let formInputData = new FormData();

    for( currentInputKey in userInputObject )
    {
        formInputData.append(currentInputKey, userInputObject[currentInputKey]);
    }

    return formInputData;
}

function sendHttpRequestToSmartBidServerWithCallback(urlParamsString, successCallbackFunction, failureCallbackFunction, 
    inputRecordData = null)
{
    let xmlHttpRequest = new XMLHttpRequest();
    let httpRequestURL = httpRequestURLPrefix;

    httpRequestURL += urlParamsString;

    if( inputRecordData.bDisplayLogs )
    {
        console.log("Sending Http request (URL Encoded): httpRequestURL = " + httpRequestURL);
    }

    xmlHttpRequest.open('GET', httpRequestURL);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xmlHttpRequest.onload = () => {

        if( inputRecordData.bDisplayLogs )
        {
            console.log("First time load of xmlHttpRequest");
        }

        if ( xmlHttpRequest.status == 200 )
        {
            if( inputRecordData.bDisplayLogs )
            {
                console.log("Successfully completed the request = " + xmlHttpRequest.responseText);
            }

            successCallbackFunction(xmlHttpRequest.responseText, inputRecordData);
        }
        else
        {
            console.error("Error occured while sending the request = " + xmlHttpRequest.status);
            console.error("Error Text = " + xmlHttpRequest.statusText);

            failureCallbackFunction(xmlHttpRequest.statusText, inputRecordData);  
        }
    };

    xmlHttpRequest.onerror = () => {

        console.log("XML http request has encountered an error");
        failureCallbackFunction(xmlHttpRequest.responseText, inputRecordData);
    }

    xmlHttpRequest.send();

    if( inputRecordData.bDisplayLogs )
    {
        console.log("Successfully sent the http request ");
    }
}

function sendHttpJsonRequestToSmartBidServerWithCallback(inputQueryRequest, inputJsonQueryObject, successCallbackFunction, 
    failureCallbackFunction, inputRecordData = null)
{
    let xmlHttpRequest = new XMLHttpRequest();
    let httpRequestURL = httpRequestURLPrefix;

    httpRequestURL += inputQueryRequest;

    if( inputRecordData.bDisplayLogs )
    {
        console.log("Sending Http request (Json Encoded): httpRequestURL = " + httpRequestURL);
    }

    xmlHttpRequest.open('POST', httpRequestURL);
    xmlHttpRequest.setRequestHeader('Content-Type', 'text/plain');

    xmlHttpRequest.onload = () => {

        if( inputRecordData.bDisplayLogs )
        {
            console.log("First time load of xmlHttpRequest");
        }

        if ( xmlHttpRequest.status == 200 )
        {
        
            if( inputRecordData.bDisplayLogs )
            {
                console.log("Successfully completed the request = " + xmlHttpRequest.responseText);
            }

            successCallbackFunction(xmlHttpRequest.responseText, inputRecordData);
        }
        else
        {
            console.error("Error occured while sending the request = " + xmlHttpRequest.status);
            console.error("Error Text = " + xmlHttpRequest.statusText);

            failureCallbackFunction(xmlHttpRequest.statusText, inputRecordData);  
        }
    };

    xmlHttpRequest.onerror = () => {

        console.log("XML http request has encountered an error");
        failureCallbackFunction(xmlHttpRequest.statusText, inputRecordData);
    }

    xmlHttpRequest.send(JSON.stringify(inputJsonQueryObject));

    if( inputRecordData.bDisplayLogs )
    {
        console.log("Successfully sent the json based http request post");
    }
}


function sendHttpFileUploadRequestToSmartBidServerWithCallback(inputFileUploadRequest, inputFormData, 
    successCallbackFunction, failureCallbackFunction, inputRecordData = null)
{
    let xmlHttpRequest = new XMLHttpRequest();
    let httpRequestURL = httpRequestURLPrefix;

    httpRequestURL += inputFileUploadRequest;

    if( inputRecordData.bDisplayLogs )
    {
        console.log("Sending Http request (File Upload based): httpRequestURL = " + httpRequestURL);
    }

    xmlHttpRequest.open('POST', httpRequestURL, true);

    xmlHttpRequest.onload = () => {

        if ( xmlHttpRequest.status == 200 )
        {
            successCallbackFunction(xmlHttpRequest.responseText, inputRecordData);
        }
        else
        {
            console.error("Error occured while sending the request = " + xmlHttpRequest.status);
            console.error("Error Text = " + xmlHttpRequest.statusText);

            failureCallbackFunction(xmlHttpRequest.statusText, inputRecordData);  
        }
    };

    xmlHttpRequest.onerror = () => {

        console.log("XML http request has encountered an error");
        failureCallbackFunction(xmlHttpRequest.statusText, inputRecordData);
    }

    xmlHttpRequest.send(inputFormData);
}


// Customer Sign Up Query

async function executeCustomerSignupFunctionalTest(inputWorkerData)
{
    
    let customerDetailsObject = {};
    
    customerDetailsObject = transformCurrentRecordObject(customerRecordObject,
        inputWorkerData.WebWorkerNumber, inputWorkerData
    );

    customerDetailsObject.Password = inputWorkerData.CurrentPasswords[inputWorkerData.WebWorkerNumber-1];

    inputWorkerData["currentCustomerEmailAddress"] = customerDetailsObject.EmailAddress;

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("TenetTestValidator:executeCustomerSignupFunctionalTest.customerDetailsObject = " + 
            JSON.stringify(customerDetailsObject));
    }

    sendHttpJsonRequestToSmartBidServerWithCallback( "AddCustomer", customerDetailsObject, 
    successfulCustomerDataSubmission, failureCustomerDataSubmission, inputWorkerData );
    
}

async function successfulCustomerDataSubmission(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully submitted the Customer Record Data => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executeCustomerLogInTest(inputWorkerData);
}

async function failureCustomerDataSubmission(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to Submit the Customer Record Data => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executeCustomerLogInTest(inputWorkerData);
}

// Customer LogIn Test

async function executeCustomerLogInTest(inputWorkerData)
{
    
    let customerDetailsObject = {};

    customerDetailsObject.EmailAddress = inputWorkerData["currentCustomerEmailAddress"];
    customerDetailsObject.PasswordCode = inputWorkerData.CurrentPasswords[inputWorkerData.WebWorkerNumber-1];

    sendHttpJsonRequestToSmartBidServerWithCallback( "AuthenticateUser", customerDetailsObject, successfulCustomerLogIn, 
        failureCustomerLogIn, inputWorkerData );
    
}

async function successfulCustomerLogIn(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully Logged Into the Server => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executePublishAssetTest(inputWorkerData);
}

async function failureCustomerLogIn(responseTextFromServer) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to Login to the Server => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executePublishAssetTest(inputWorkerData);
}


// Publish Asset Test

async function executePublishAssetTest(inputWorkerData)
{
    
    let auctionAssetObject = {};
    
    auctionAssetObject = transformCurrentRecordObject(publishAssetObject, inputWorkerData.WebWorkerNumber, inputWorkerData);

    auctionAssetObject.BiddingType = (inputWorkerData.WebWorkerNumber % 2) ? "open" : "secretive";

    inputWorkerData["CurrentAssetSellerCustomerId"] = auctionAssetObject.SellerCustomerId;

    let assetDetailsFormData = createFormInputData( auctionAssetObject );

    sendHttpFileUploadRequestToSmartBidServerWithCallback( "UploadAuctionPhotos", 
        assetDetailsFormData, successResponseUploadAuctionPhotos, failureResponseUploadAuctionPhotos, inputWorkerData );
    
}

async function successResponseUploadAuctionPhotos(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully published Asset Record => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executeAssetRecordRetrievalTest(inputWorkerData);
}

async function failureResponseUploadAuctionPhotos(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to publish the asset record to the server => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executeAssetRecordRetrievalTest(inputWorkerData);
}

// Publish Asset Retrieval Test

async function executeAssetRecordRetrievalTest(inputWorkerData)
{
    
    let assetRecordRetrievalUrlParamsString = "RetrieveAuctions?Status=Open&SellerCustomerId=" + 
        inputWorkerData["CurrentAssetSellerCustomerId"];

    sendHttpRequestToSmartBidServerWithCallback( assetRecordRetrievalUrlParamsString, 
    successfulAssetRecordRetrieval, failureAssetRecordRetrieval, inputWorkerData );
    
}

async function successfulAssetRecordRetrieval(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully Retrieved the Asset Record Data => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    inputWorkerData['currentAssetRecordAssetId'] = JSON.parse(responseTextFromServer)[0].AssetId;

    await executePlaceBidRecordTest(inputWorkerData);

}

async function failureAssetRecordRetrieval(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to retrieve the asset record from the server => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executePlaceBidRecordTest(inputWorkerData);

}

// Place Bid Test

async function executePlaceBidRecordTest(inputWorkerData)
{

    let currentBiddingType = (inputWorkerData.WebWorkerNumber % 2) ? "open" : "secretive";

    let placeBidRecordUrlParamsString = "AddBid?AssetId=" + inputWorkerData['currentAssetRecordAssetId'] + 
    "&CustomerId=10&BidPrice=8500000&BiddingType=" + currentBiddingType;

    sendHttpRequestToSmartBidServerWithCallback( placeBidRecordUrlParamsString, 
    successfulPlaceBidRecord, failurePlaceBidRecord, inputWorkerData );
    
}

async function successfulPlaceBidRecord(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully placed the bid => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executeCustomerDashboardRecordTest(inputWorkerData);

}

async function failurePlaceBidRecord(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to place the bid => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executeCustomerDashboardRecordTest(inputWorkerData);

}

// Customer Dashboard Tests

async function executeCustomerDashboardRecordTest(inputWorkerData)
{
    
    let customerDashboardRecordUrlParamsString = "CustomerAuctionsAndBids?SellerCustomerId=" + 
        inputWorkerData["CurrentAssetSellerCustomerId"];

    sendHttpRequestToSmartBidServerWithCallback( customerDashboardRecordUrlParamsString, 
    successfulCustomerDashboardRecord, failureCustomerDashboardRecord, inputWorkerData );
    
}

async function successfulCustomerDashboardRecord(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully Retrieved the customer Auctions and bids => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executeFeedbackRecordAddTest(inputWorkerData);

}

async function failureCustomerDashboardRecord(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to retrieve the customer auctions and bids => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executeFeedbackRecordAddTest(inputWorkerData);

}


// Execute Feedback Tests

async function executeFeedbackRecordAddTest(inputWorkerData)
{
    
    let feedbackDetailsObject = {};
    
    feedbackDetailsObject = transformCurrentRecordObject(feedbackRecordObject,
        inputWorkerData.WebWorkerNumber, inputWorkerData
    );

    inputWorkerData["currentFeedbackCustomerName"] = feedbackDetailsObject.CustomerName;

    let feedbackRecordUrlParamsString = "AddFeedback?CustomerName=" + feedbackDetailsObject.CustomerName + 
        "&EmailAddress=" + feedbackDetailsObject.EmailAddress +
        "&Subject=" + feedbackDetailsObject.Subject +
        "&Message=" + feedbackDetailsObject.Message;

    sendHttpRequestToSmartBidServerWithCallback( feedbackRecordUrlParamsString, 
    successfulAddFeedbackRecord, failureAddFeedbackRecord, inputWorkerData );
    
}

async function successfulAddFeedbackRecord(responseTextFromServer, inputWorkerData)
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully added feedback record => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executeDeleteFeedbackRecordTest(inputWorkerData);

}

async function failureAddFeedbackRecord(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to add feedback record data => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executeDeleteFeedbackRecordTest(inputWorkerData);

}

// Delete Feedback Record Test

async function  executeDeleteFeedbackRecordTest(inputWorkerData)
{

    let feedbackRecordRemovalUrlParamsString = "DeleteFeedback?CustomerName=" + 
        inputWorkerData["currentFeedbackCustomerName"];

    sendHttpRequestToSmartBidServerWithCallback( feedbackRecordRemovalUrlParamsString, 
    successfulFeedbackRecordRemoval, failureFeedbackRecordRemoval, inputWorkerData );
    
}

async function successfulFeedbackRecordRemoval(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully deleted feedback record => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executeBidsRecordRemovalTest(inputWorkerData);

}

async function failureFeedbackRecordRemoval(responseTextFromServer) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to delete feedback record data => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executeBidsRecordRemovalTest(inputWorkerData);

}


// Bids Record Removal Test

async function executeBidsRecordRemovalTest(inputWorkerData)
{
    
    let bidRecordRemovalUrlParamsString = "DeleteBids?AssetId=" + inputWorkerData['currentAssetRecordAssetId'];

    sendHttpRequestToSmartBidServerWithCallback( bidRecordRemovalUrlParamsString, 
    successfulBidRecordRemoval, failureBidRecordRemoval, inputWorkerData );
    
}

async function successfulBidRecordRemoval(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully removed the bid record data => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executeAssetRecordRemovalTest(inputWorkerData);

}

async function failureBidRecordRemoval(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to remove the bid record => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executeAssetRecordRemovalTest(inputWorkerData);

}

// Asset Record Removal Test

async function executeAssetRecordRemovalTest(inputWorkerData)
{
    
    let assetRecordRemovalUrlParamsString = "DeleteAsset?AssetId=" + inputWorkerData['currentAssetRecordAssetId'];

    sendHttpRequestToSmartBidServerWithCallback( assetRecordRemovalUrlParamsString, 
    successfulAssetRecordRemoval, failureAssetRecordRemoval, inputWorkerData );
    
}

async function successfulAssetRecordRemoval(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully deleted the Asset Record Data => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executeCustomerRecordDeletionTest(inputWorkerData);

}

async function failureAssetRecordRemoval(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to delete the asset record data => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executeCustomerRecordDeletionTest(inputWorkerData);

}


// Customer Record Deletion Query

async function executeCustomerRecordDeletionTest(inputWorkerData)
{

    let customerRecordRemovalUrlParamsString = "DeleteCustomer?EmailAddress=" + 
        inputWorkerData.currentCustomerEmailAddress;

    sendHttpRequestToSmartBidServerWithCallback( customerRecordRemovalUrlParamsString, 
    successfulCustomerRecordRemoval, failureCustomerRecordRemoval, inputWorkerData);
    
}

async function successfulCustomerRecordRemoval(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Successfully Removed the Customer Record Data => " + responseTextFromServer);
    }

    inputWorkerData['noOfSuccessfulQueries'] += 1;

    await executeEndOfPerfTests(inputWorkerData);
}

async function failureCustomerRecordRemoval(responseTextFromServer, inputWorkerData) 
{

    if( inputWorkerData.bDisplayLogs )
    {
        console.log("Failed to Remove the Customer Record Data => " + responseTextFromServer);
    }

    inputWorkerData['noOfFailureQueries'] += 1;

    await executeEndOfPerfTests(inputWorkerData);
}

async function executeEndOfPerfTests(inputWorkerData)
{

    self.postMessage(inputWorkerData);

    inputWorkerData['noOfSuccessfulQueries'] = 0;
    inputWorkerData['noOfFailureQueries'] = 0;

    await executeCustomerSignupFunctionalTest(inputWorkerData);

}
    

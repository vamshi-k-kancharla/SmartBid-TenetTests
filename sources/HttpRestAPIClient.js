
var HttpRestAPIClientModule = ( function() {

    async function sendHttpRequestToSmartBidServer(urlParamsString)
    {
        let xmlHttpRequest = new XMLHttpRequest();
        let httpRequestURL = GlobalsForClientModule.httpRequestURLPrefix;

        httpRequestURL += urlParamsString;

        console.log("Sending Http request (URL Encoded): httpRequestURL = " + httpRequestURL);

        xmlHttpRequest.open('GET', httpRequestURL);
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xmlHttpRequest.onload = () => {

            console.log("First time load of xmlHttpRequest");

            if ( xmlHttpRequest.status == 200 )
            {
                console.log("Successfully completed the request = " + xmlHttpRequest.responseText);
            }
            else
            {
                console.error("Error occured while sending the request = " + xmlHttpRequest.status);
                console.error("Error Text = " + xmlHttpRequest.statusText);
            }

            location.reload();
        };

        xmlHttpRequest.onerror = () => {

            console.log("XML http request has encountered an error");
            location.reload();
        }

        xmlHttpRequest.send();

        console.log("Successfully sent the http request ");
    }

    function sendHttpRequestToSmartBidServerWithCallback(urlParamsString, successCallbackFunction, failureCallbackFunction)
    {
        let xmlHttpRequest = new XMLHttpRequest();
        let httpRequestURL = GlobalsForClientModule.httpRequestURLPrefix;

        httpRequestURL += urlParamsString;

        console.log("Sending Http request (URL Encoded): httpRequestURL = " + httpRequestURL);

        xmlHttpRequest.open('GET', httpRequestURL);
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xmlHttpRequest.onload = () => {

            console.log("First time load of xmlHttpRequest");

            if ( xmlHttpRequest.status == 200 )
            {
                console.log("Successfully completed the request = " + xmlHttpRequest.responseText);
                successCallbackFunction(xmlHttpRequest.responseText);
            }
            else
            {
                console.error("Error occured while sending the request = " + xmlHttpRequest.status);
                console.error("Error Text = " + xmlHttpRequest.statusText);

                failureCallbackFunction();  
            }
        };

        xmlHttpRequest.onerror = () => {

            console.log("XML http request has encountered an error");
            failureCallbackFunction();
        }

        xmlHttpRequest.send();

        console.log("Successfully sent the http request ");
    }

    function sendHttpJsonRequestToSmartBidServerWithCallback(inputQueryRequest, inputJsonQueryObject, successCallbackFunction, failureCallbackFunction)
    {
        let xmlHttpRequest = new XMLHttpRequest();
        let httpRequestURL = GlobalsForClientModule.httpRequestURLPrefix;

        httpRequestURL += inputQueryRequest;

        console.log("Sending Http request (Json Encoded): httpRequestURL = " + httpRequestURL);

        xmlHttpRequest.open('POST', httpRequestURL);
        xmlHttpRequest.setRequestHeader('Content-Type', 'text/plain');

        xmlHttpRequest.onload = () => {

            console.log("First time load of xmlHttpRequest");

            if ( xmlHttpRequest.status == 200 )
            {
                console.log("Successfully completed the request = " + xmlHttpRequest.responseText);
                successCallbackFunction(xmlHttpRequest.responseText);
            }
            else
            {
                console.error("Error occured while sending the request = " + xmlHttpRequest.status);
                console.error("Error Text = " + xmlHttpRequest.statusText);

                failureCallbackFunction(xmlHttpRequest.statusText);  
            }
        };

        xmlHttpRequest.onerror = () => {

            console.log("XML http request has encountered an error");
            failureCallbackFunction(xmlHttpRequest.statusText);
        }

        xmlHttpRequest.send(JSON.stringify(inputJsonQueryObject));

        console.log("Successfully sent the json based http request post");
    }

    function sendHttpFileUploadRequestToSmartBidServerWithCallback(inputFileUploadRequest, inputFormData, 
        successCallbackFunction, failureCallbackFunction)
    {
        let xmlHttpRequest = new XMLHttpRequest();
        let httpRequestURL = GlobalsForClientModule.httpRequestURLPrefix;

        httpRequestURL += inputFileUploadRequest;

        console.log("Sending Http request (File Upload based): httpRequestURL = " + httpRequestURL);

        xmlHttpRequest.open('POST', httpRequestURL, true);

        xmlHttpRequest.onload = () => {

            console.log("First time load of xmlHttpRequest");

            if ( xmlHttpRequest.status == 200 )
            {
                console.log("Successfully completed the request = " + xmlHttpRequest.responseText);
                successCallbackFunction(xmlHttpRequest.responseText);
            }
            else
            {
                console.error("Error occured while sending the request = " + xmlHttpRequest.status);
                console.error("Error Text = " + xmlHttpRequest.statusText);

                failureCallbackFunction();  
            }
        };

        xmlHttpRequest.onerror = () => {

            console.log("XML http request has encountered an error");
            failureCallbackFunction();
        }

        xmlHttpRequest.send(inputFormData);

        console.log("Successfully sent the file based http request post");
    }

    return{

        sendHttpRequestToSmartBidServer : sendHttpRequestToSmartBidServer,
        sendHttpRequestToSmartBidServerWithCallback : sendHttpRequestToSmartBidServerWithCallback,
        sendHttpJsonRequestToSmartBidServerWithCallback : sendHttpJsonRequestToSmartBidServerWithCallback,
        sendHttpFileUploadRequestToSmartBidServerWithCallback : sendHttpFileUploadRequestToSmartBidServerWithCallback,

    }

})();

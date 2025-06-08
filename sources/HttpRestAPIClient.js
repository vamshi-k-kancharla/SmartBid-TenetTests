
var HttpRestAPIClientModule = ( function() {

    async function sendHttpRequestToSmartBidServer(urlParamsString)
    {
        let xmlHttpRequest = new XMLHttpRequest();
        let httpRequestURL = "http://127.0.0.1:8000/";

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
        let httpRequestURL = "http://127.0.0.1:8000/";

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

    return{

        sendHttpRequestToSmartBidServer : sendHttpRequestToSmartBidServer,
        sendHttpRequestToSmartBidServerWithCallback : sendHttpRequestToSmartBidServerWithCallback,
    }

})();

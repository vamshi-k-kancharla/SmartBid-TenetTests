
var UserAuthenticationModule = ( function() {

    async function authenticateUserFromCache(successCallBackFunction, failureCallBackFunction)
    {
        let authenticateUserObject = {};

        let currentUser_EmailAddress = window.localStorage.getItem("CurrentUser_EmailAddress");
        let currentUser_Password = window.localStorage.getItem("CurrentUser_Password");

        authenticateUserObject["emailAddress"] = (currentUser_EmailAddress === null || currentUser_EmailAddress === undefined) ? 
            "" : currentUser_EmailAddress;
        authenticateUserObject["password"] = (currentUser_Password === null || currentUser_Password === undefined) ? 
            "" : currentUser_Password;

        if( authenticateUserObject.emailAddress === "" || authenticateUserObject.password === "" )
        {
            console.log("UserName and/or password are missing from the cache");
            failureCallBackFunction();
            
            return;
        }

        let userAuthenticationUrlString = buildHttpRequestURLForUserAuthData(authenticateUserObject);
        
        console.log("userAuthenticationUrlString = " + userAuthenticationUrlString);

        await HttpRestAPIClientModule.sendHttpRequestToSmartBidServerWithCallback(userAuthenticationUrlString, 
            successCallBackFunction, failureCallBackFunction);
    }

    function buildHttpRequestURLForUserAuthData(authenticateUserObject)
    {
        let userAuthenticationUrlString = "AuthenticateUser?EmailAddress="+authenticateUserObject.emailAddress+
        "&PasswordCode="+authenticateUserObject.password;

        return userAuthenticationUrlString;
    }

    function clearUserAuthDetailsFromCache()
    {

        for( let currentCacheItem of GlobalsForClientModule.userAuthItemsToBeRemovedFromCache )
        {
            window.localStorage.removeItem(currentCacheItem);
        }
    }

    return{

        authenticateUserFromCache : authenticateUserFromCache,
        clearUserAuthDetailsFromCache : clearUserAuthDetailsFromCache,
    }

})();

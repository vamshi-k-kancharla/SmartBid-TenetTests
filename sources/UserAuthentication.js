
var UserAuthenticationModule = ( function() {

    async function authenticateUserFromCache(successCallBackFunction, failureCallBackFunction)
    {
        let authenticateUserObject = {};

        let currentUser_EmailAddress = window.localStorage.getItem("CurrentUser_EmailAddress");
        let currentUser_Password = window.localStorage.getItem("CurrentUser_Password");

        authenticateUserObject["EmailAddress"] = (currentUser_EmailAddress === null || currentUser_EmailAddress === undefined) ? 
            "" : currentUser_EmailAddress;
        authenticateUserObject["PasswordCode"] = (currentUser_Password === null || currentUser_Password === undefined) ? 
            "" : currentUser_Password;

        if( authenticateUserObject.EmailAddress === "" || authenticateUserObject.PasswordCode === "" )
        {
            console.log("UserName and/or password are missing from the cache");
            failureCallBackFunction();
            
            return;
        }

        console.log("Sending JSON based Http Request to Server : ");

        HttpRestAPIClientModule.sendHttpJsonRequestToSmartBidServerWithCallback( "AuthenticateUser", authenticateUserObject,
            successCallBackFunction, failureCallBackFunction );
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

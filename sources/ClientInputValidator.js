
var ClientInputValidatorModule = ( function() {

    function validateUserInputValue(userInputValue)
    {
        if( userInputValue == null || userInputValue == undefined || userInputValue === "" )
        {
            return false;
        }

        return true;
    }

    function validateUserInputObject(userInputObject, userInputKeys)
    {
        for( currentInputKey of userInputKeys )
        {
            if( !validateUserInputValue(userInputObject[currentInputKey]) )
            {
                return false;
            }
        }

        return true;
    }

    function validateUserInputObjectValue(userInputObject)
    {

        if( userInputObject == null || userInputObject == undefined || Object.keys(userInputObject).length === 0 
            || Object.values(userInputObject).length === 0 )
        {
            return false;
        }

        return true;
    }

    function validateRecordRetrievalObject(retrievedObject, inputObject)
    {
        for( currentInputKey in inputObject )
        {
            
            console.log("ClientInputValidator.validateRecordRetrievalObject : currentInputKey => " + currentInputKey);

            if( inputObject[currentInputKey] != retrievedObject[currentInputKey] )
            {

                console.log(inputObject[currentInputKey] + " != " + retrievedObject[currentInputKey]);

                return false;
                
            }
        }

        return true;
    }

    return {

        validateUserInputValue : validateUserInputValue,
        validateUserInputObject : validateUserInputObject,
        validateUserInputObjectValue : validateUserInputObjectValue,

        validateRecordRetrievalObject : validateRecordRetrievalObject,
        
    }

})();

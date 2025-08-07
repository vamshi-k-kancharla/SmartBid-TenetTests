
var ProcessFormInputModule = ( function() {

    function processInputDataFromForm(userInputObject, userInputObjectKeys, userFormIds)
    {
        for( currentInputKey of userInputObjectKeys )
        {
            userInputObject[currentInputKey] = document.getElementById(userFormIds[userInputObjectKeys.indexOf(currentInputKey)]).value;
        }

        return userInputObject;
    }

    function createFormInputData(userInputObject, userInputObjectKeys)
    {
        let formInputData = new FormData();

        for( currentInputKey of userInputObjectKeys )
        {
            formInputData.append(currentInputKey, userInputObject[currentInputKey]);
        }

        return formInputData;
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

    return {

        processInputDataFromForm : processInputDataFromForm,
        createFormInputData : createFormInputData,
    }

})();


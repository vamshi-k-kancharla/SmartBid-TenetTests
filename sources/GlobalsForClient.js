
var GlobalsForClientModule = ( function() {

    const maxThreadsToBeSpawned = 25;

    let tenetWorkerThreads = [];
    let inputTenetData = [];

    const bDisplayLogs = false;

    return{

        maxThreadsToBeSpawned : maxThreadsToBeSpawned,

        tenetWorkerThreads : tenetWorkerThreads,
        inputTenetData : inputTenetData,

        bDisplayLogs : bDisplayLogs,

    }

})();


var GlobalsForClientModule = ( function() {

    const httpRequestURLPrefix = "http://127.0.0.1:8000/";

    const maxFilesUploadCount = 10;

    let auctionAssetKeysForDisplay = ["AssetType", "Address", "Colony", "City", "State", "Country", "ApprovalType", 
        "AssetSize", "BuiltUpArea"];

    let auctionAssetUIIdsForDisplay = ["id_assettype_", "id_address_", "id_colony_", "id_city_", "id_state_", "id_country_", 
        "id_approvaltype_", "id_size_", "id_builtup_area_"];

    let userAuthItemsToBeRemovedFromCache = ["CurrentUser_Password", "CurrentUser_CustomerId", "CurrentUser_Name", 
        "CurrentUser_EmailAddress", "CurrentUser_PhoneNumber"];

    // Validate & Upload Asset Data

    let auctionAssetUIIdsForUpload = ["id_asset_type", "id_min_auction_price", "id_address", "id_colony", "id_city", "id_state", 
        "id_country", "id_approval_type", "id_asset_size", "id_built_up_area"];

    let auctionAssetKeysForUpload = ["AssetType", "MinAuctionPrice", "Address", "Colony", "City", "State", 
        "Country", "ApprovalType", "AssetSize", "BuiltUpArea"];

    // Functional Tests : Input Objects : Customer SignUp

    let customerRecordObject = {"Name":"CustomerName","EmailAddress":"customerEmail@gmail.com","Address":"Inupamula",
        "UserType":"Customer","City":"Hyderabad","State":"Telangana","Country":"India","Password":"abcd1234",
        "PhoneNumber":"7306004100"};

    let validateCustomerRecordObject = {"Name":"CustomerName","EmailAddress":"customerEmail@gmail.com","Address":"Inupamula",
        "UserType":"Customer","City":"Hyderabad","State":"Telangana","Country":"India","PhoneNumber":"7306004100"};


    // Functional Tests : Publish Assets : Input Objects

    let publishAssetObject = {"AssetType":"Flat","MinAuctionPrice":"7500000","Address":"godrej royal woods",
        "Colony":"devanahalli","City":"bangalore","State":"karnataka","Country":"india", "SellerCustomerId":55,
        "ApprovalType":"bda","AssetSize":"25 sq yards","BuiltUpArea":"1000 sqft", "Status":"open",
        "AssetBedrooms":4,"AssetBathrooms":2,"AssetDescription":"Beautiful flat in Godrej Royal Woods", "BiddingType":"open"};

    let publishSecretiveAssetObject = {"AssetType":"Flat","MinAuctionPrice":"7600000","Address":"GRW, Bhuvanahalli",
        "Colony":"devanahalli","City":"bangalore","State":"karnataka","Country":"india", "SellerCustomerId":55,
        "ApprovalType":"bda","AssetSize":"30 sq yards","BuiltUpArea":"1200 sqft", "Status":"open",
        "AssetBedrooms":4,"AssetBathrooms":3,"AssetDescription":"Beautiful flat in Godrej Royal Woods", "BiddingType":"secretive"};

    // Functional Tests : Close Auction : Input Objects

    let closeAuctionAssetObject = {"AssetType":"Flat","MinAuctionPrice":"7500000","Address":"godrej royal woods",
        "Colony":"devanahalli","City":"bangalore","State":"karnataka","Country":"india", "SellerCustomerId":61,
        "ApprovalType":"bda","AssetSize":"25 sq yards","BuiltUpArea":"1000 sqft", "Status":"open",
        "AssetBedrooms":4,"AssetBathrooms":2,"AssetDescription":"Beautiful flat in Godrej Royal Woods", "BiddingType":"open"};

    // Functional Tests : Customer Dashbaord Tests : Input Objects

    let customerDashboardAssetsObjects = [
        
        {"AssetType":"Flat","MinAuctionPrice":"7500000","Address":"godrej royal woods",
        "Colony":"devanahalli","City":"bangalore","State":"karnataka","Country":"india", "SellerCustomerId":55,
        "ApprovalType":"bda","AssetSize":"25 sq yards","BuiltUpArea":"1000 sqft", "Status":"open",
        "AssetBedrooms":4,"AssetBathrooms":2,"AssetDescription":"Beautiful flat in Godrej Royal Woods", "BiddingType":"open"} ,

        {"AssetType":"Flat","MinAuctionPrice":"7600000","Address":"godrej royal woods",
        "Colony":"devanahalli","City":"bangalore","State":"karnataka","Country":"india", "SellerCustomerId":55,
        "ApprovalType":"bda","AssetSize":"26 sq yards","BuiltUpArea":"1100 sqft", "Status":"open",
        "AssetBedrooms":4,"AssetBathrooms":3,"AssetDescription":"Beautiful flat in Godrej Royal Woods2", "BiddingType":"secretive"} ,

        {"AssetType":"Flat","MinAuctionPrice":"7700000","Address":"godrej royal woods",
        "Colony":"devanahalli","City":"bangalore","State":"karnataka","Country":"india", "SellerCustomerId":56,
        "ApprovalType":"bda","AssetSize":"27 sq yards","BuiltUpArea":"1200 sqft", "Status":"open",
        "AssetBedrooms":4,"AssetBathrooms":3,"AssetDescription":"Beautiful flat in Godrej Royal Woods3", "BiddingType":"open"} ,

        {"AssetType":"Flat","MinAuctionPrice":"7800000","Address":"godrej royal woods",
        "Colony":"devanahalli","City":"bangalore","State":"karnataka","Country":"india", "SellerCustomerId":56,
        "ApprovalType":"bda","AssetSize":"28 sq yards","BuiltUpArea":"1300 sqft", "Status":"open",
        "AssetBedrooms":5,"AssetBathrooms":3,"AssetDescription":"Beautiful flat in Godrej Royal Woods4", "BiddingType":"secretive"} ,

    ];

    let customerDashboardAssetArray = [0, 0, 0, 0];

    // Functional Tests : Retrieve Assets : Input Objects

    let retrieveBidObject = {"AssetId":99,"CustomerId":56,"BidPrice":"8000000"};

    let retrieveSecondBidObject = {"AssetId":109,"CustomerId":56,"BidPrice":"8500000"};

    let retrieveBetterBidObject = {"AssetId":199,"CustomerId":57,"BidPrice":"8100000"};

    let retrieveWorseBidObject = {"AssetId":299,"CustomerId":57,"BidPrice":"7900000"};

    let retrieveBidCloseAuctionObject = {"AssetId":300,"CustomerId":60,"BidPrice":"8000000"};


    // Globals Helping the callbacks in Regression suite
    
    
    let currentCallBackFunctionForPublishAssetTest = undefined;
    let currentObjectPublishAssetTest = publishAssetObject;
    let currentPublishAssetTestContainer = undefined;
    let currentAssetRetrievalTestContainer = undefined;


    let currentAssetRecordRemovalTestContainer = undefined;
    let currentAssetRecordRemovalConfirmationTestContainer = undefined;
    let currentCallbackFunctionForAssetRemovalTest = undefined;


    let currentAssetRecordId = undefined;
    let currentAssetBidderCustomerId = undefined;
    let currentAssetBiddingPrice = undefined;
    let placeBidTestContainer = undefined;
    let currentAssetBiddingType = undefined;
    let retrieveBidTestContainer = undefined;
    let currentRetrieveAssetObject = undefined;
    let currentAssetSellerCustomerId = undefined;
    let currentValidateBidObject = undefined;

    let executePlaceBidRecordCompletionTest = undefined;
    let executeDeleteBidRecordCompletionTest = undefined;

    let currentObjectPublishMultiAssetTest = undefined;
    let currentObjectPublishMultiAssetCompletionTest = undefined;
    let currentBidRecordIndexForValidation = undefined;

    return{

        auctionAssetKeysForDisplay : auctionAssetKeysForDisplay,
        auctionAssetUIIdsForDisplay : auctionAssetUIIdsForDisplay,
        userAuthItemsToBeRemovedFromCache : userAuthItemsToBeRemovedFromCache,
        httpRequestURLPrefix : httpRequestURLPrefix,
        auctionAssetUIIdsForUpload : auctionAssetUIIdsForUpload,
        auctionAssetKeysForUpload : auctionAssetKeysForUpload,
        maxFilesUploadCount : maxFilesUploadCount,
        
        // Functional Tests 
        
        customerRecordObject : customerRecordObject,
        validateCustomerRecordObject : validateCustomerRecordObject,
        publishAssetObject : publishAssetObject,

        currentCallBackFunctionForPublishAssetTest : currentCallBackFunctionForPublishAssetTest,
        currentObjectPublishAssetTest : currentObjectPublishAssetTest,
        currentPublishAssetTestContainer : currentPublishAssetTestContainer,
        currentAssetRetrievalTestContainer : currentAssetRetrievalTestContainer,

        currentAssetRecordRemovalTestContainer : currentAssetRecordRemovalTestContainer,
        currentAssetRecordRemovalConfirmationTestContainer : currentAssetRecordRemovalConfirmationTestContainer,
        currentCallbackFunctionForAssetRemovalTest : currentCallbackFunctionForAssetRemovalTest,

        // Open Bidding

        currentAssetRecordId : currentAssetRecordId,
        currentAssetBidderCustomerId : currentAssetBidderCustomerId,
        currentAssetBiddingPrice : currentAssetBiddingPrice,
        currentAssetBiddingType : currentAssetBiddingType,
        placeBidTestContainer : placeBidTestContainer,
        retrieveBidTestContainer : retrieveBidTestContainer,
        retrieveBidObject : retrieveBidObject,
        currentRetrieveAssetObject : currentRetrieveAssetObject,
        currentAssetSellerCustomerId : currentAssetSellerCustomerId,
        currentValidateBidObject : currentValidateBidObject,
        retrieveBetterBidObject : retrieveBetterBidObject,

        executePlaceBidRecordCompletionTest : executePlaceBidRecordCompletionTest,
        executeDeleteBidRecordCompletionTest : executeDeleteBidRecordCompletionTest,

        // Secretive Bidding

        publishSecretiveAssetObject : publishSecretiveAssetObject,
        retrieveWorseBidObject : retrieveWorseBidObject,

        // Close Auction

        closeAuctionAssetObject : closeAuctionAssetObject,
        retrieveBidCloseAuctionObject : retrieveBidCloseAuctionObject,

        // Customer Dashboard

        customerDashboardAssetsObjects : customerDashboardAssetsObjects,
        currentObjectPublishMultiAssetTest : currentObjectPublishMultiAssetTest,
        currentObjectPublishMultiAssetCompletionTest : currentObjectPublishMultiAssetCompletionTest,
        customerDashboardAssetArray : customerDashboardAssetArray,
        retrieveSecondBidObject : retrieveSecondBidObject,
        currentBidRecordIndexForValidation : currentBidRecordIndexForValidation,

    }

})();

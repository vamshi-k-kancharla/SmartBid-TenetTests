
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

    // Functional Tests : Input Objects

    let customerRecordObject = {"Name":"CustomerName","EmailAddress":"customerEmail@gmail.com","Address":"Inupamula",
        "UserType":"Customer","City":"Hyderabad","State":"Telangana","Country":"India","Password":"abcd1234",
        "PhoneNumber":"7306004100"};

    let validateCustomerRecordObject = {"Name":"CustomerName","EmailAddress":"customerEmail@gmail.com","Address":"Inupamula",
        "UserType":"Customer","City":"Hyderabad","State":"Telangana","Country":"India","PhoneNumber":"7306004100"};


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
        
    }

})();

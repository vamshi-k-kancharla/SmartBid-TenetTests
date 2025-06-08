
var GlobalsForClientModule = ( function() {

    let auctionAssetKeysForDisplay = ["AssetType", "Address", "Colony", "City", "State", "Country", "ApprovalType", 
        "AssetSize", "BuiltUpArea"];

    let auctionAssetUIIdsForDisplay = ["id_assettype_", "id_address_", "id_colony_", "id_city_", "id_state_", "id_country_", 
        "id_approvaltype_", "id_size_", "id_builtup_area_"];

    let userAuthItemsToBeRemovedFromCache = ["CurrentUser_Password", "CurrentUser_CustomerId", "CurrentUser_Name", 
        "CurrentUser_EmailAddress", "CurrentUser_PhoneNumber"];

    return{

        auctionAssetKeysForDisplay : auctionAssetKeysForDisplay,
        auctionAssetUIIdsForDisplay : auctionAssetUIIdsForDisplay,
        userAuthItemsToBeRemovedFromCache : userAuthItemsToBeRemovedFromCache,
    }

})();

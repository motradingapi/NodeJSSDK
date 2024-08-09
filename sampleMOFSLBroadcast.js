let MofslOpenApi = require('./MOFSLOPENAPI_NodejsV2.3');
let readline = require('readline-sync');

// --------------------------------------------------------------------------
// ------------------------------Broadcast WebSocket-------------------------
// --------------------------------------------------------------------------

// Refer README for Info
userID = "";
password = "";
PANorDOB = "";
vendorId = "";
totp = "";  //Google Authenticator OTP
SourceId = "WEB";       //WEB, DESKTOP
BrowserName = "Chrome";
BrowserVersion = "104"

// You wil get Your api key from website
Apikey = "";

clientcode = "";

// Set Url for LIVE or UAT Testing
// Enter Base Url
Base_Url = "https://openapi.motilaloswaluat.com";

// Initialize MofslOpenApi using Apikey and Base_Url, SourceId, BrowserName and BrowserVersion
let Mofsl = new MofslOpenApi(Apikey, Base_Url, SourceId, BrowserName, BrowserVersion);

// Uncomment console.log statement to execute
// SysteInfo, LocationInfo and then Login request will always be first request with each following request

Mofsl.SystemInfo().then((data) => {
    Mofsl.setdeviceModel(data.model);
    Mofsl.setManufacture(data.manufacturer);

}).then(() => {
    return Mofsl.GetPublicIP();

}).then((message) => {
    return Mofsl.setClientPublicIp(message);

}).then(() =>{
    // return Mofsl.GetLocationInfo()
    
}).then((location) => {
    // Mofsl.setLocationInfo(location)
    return Mofsl.Login(userID, password, PANorDOB, vendorId, totp)

}).then((message) => {
        console.log("LOGIN :: ", message);

        // if (totp === "" || message.isAuthTokenVerified == 'FALSE') {
        //     // Enter OTP from console
        //     var MobileEmailOTP = readline.question('Enter OTP: ')
        //     // // Verify OTP
        //     return Mofsl.verifyotp(MobileEmailOTP);
        //     // return Mofsl.resendotp();
        // }
    }).then((message) => {
        // console.log(message);
        // return Mofsl.verifyotp(otp);
        
    }).then((message) => {
        // console.log(message);
        return Mofsl.GetMaxBroadcastLimit(clientcode);

    }).then(() => {
        return Mofsl.Broadcast_connect();

    }).then(() => {
        Mofsl.Register("MCX", "DERIVATIVES", 250058);
        Mofsl.Register("BSEFO", "DERIVATIVES",873973);
        
        Mofsl.Register("NSE", "CASH",11536);
        Mofsl.Register("BSE", "CASH", 532540);
        // Mofsl.UnRegister("BSE", "CASH", 532540);

        // // // Index BSE, NSE
        // Mofsl.IndexRegister("NSE");
        // Mofsl.IndexUnregister("NSE");

        // Mofsl.IndexRegister("BSE");
        // Mofsl.IndexUnregister("BSE");

        // Logout Broadcast
        // Mofsl.BroadcastLogout();
    })
    .catch((e) => {
        console.log("ERROR :: ", e.message);
    })

Mofsl.onBroadcast('tick', onBroadcastResponse);

function onBroadcastResponse(message) {
    if (message.Type === "Index") {
        console.log("Index :: ", message);
    }
    else if (message.Type === "LTP") {
        console.log("LTP :: ", message);
    }
    else if (message.Type === "MarketDepth") {
        console.log("MarketDepth :: ", message);
    }
    else if (message.Type === "DayOHLC") {
        console.log("DayOHLC :: ", message);
    }
    else if (message.Type === "DPR") {
        console.log("DPR :: ", message);
    }
    else if (message.Type === "OpenInterest") {
        console.log("OpenInterest :: ", message);
    }
    else {
        console.log("Broadcast Response :: ", message);
    }
}

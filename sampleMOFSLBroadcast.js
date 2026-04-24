let MofslOpenApi = require('./MOFSLOPENAPI_V3.1');
let readline = require('readline-sync');

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
API_SecretKey = "";

clientcode = "";

// Set Url for LIVE or UAT Testing
// Enter Base Url
Base_Url = "https://openapi.motilaloswaluat.com";

// Initialize MofslOpenApi using Apikey and Base_Url, SourceId, BrowserName and BrowserVersion
let Mofsl = new MofslOpenApi(Apikey, Base_Url, SourceId, BrowserName, BrowserVersion, API_SecretKey);

// Uncomment console.log statement to execute
// SysteInfo, LocationInfo and then Login request will always be first request with each following request
async function runBroadcastSample() {
     try {
        // System Info, LocationInfo and then Login request will always be first request with each following request
        
        // Get system information
        const systemData = await Mofsl.SystemInfo();
        console.log("System Info:", systemData);
        await Mofsl.setdeviceModel(systemData.model);
        await Mofsl.setManufacture(systemData.manufacturer);

        // Get public IP
        const publicIp = await Mofsl.GetPublicIP();
        const clientPublicIp = await Mofsl.setClientPublicIp(publicIp);
        // console.log("Client Public IP:", clientPublicIp);

        // Get location information based on public IP
        const location_info = await Mofsl.GetLocationInfo(clientPublicIp)
        // console.log("Location Info:", location_info);

        // Set location information in Mofsl instance
        await Mofsl.setLocationInfo(location_info)

        // Login by userId, Password, PANorDOB, vendorId and totp
        const loginResponse = await Mofsl.Login(userID, password, PANorDOB, vendorId, totp);
        console.log("LOGIN :: ", loginResponse);

        
        // // Handle OTP verification if needed
        // if (totp === "" || loginResponse.isAuthTokenVerified == 'FALSE')
        // {
        //     let MobileEmailOTP = readline.question("Enter 6 Digit OTP : ");
        //     // Verify OTP received on registered Mobile or Email
        //     const otpResponse = await Mofsl.verifyotp(MobileEmailOTP);
        //     console.log("OTP Response:", otpResponse);
        // }
        
        // // Resend OTP on registered Mobile and Email (if needed)
        // const resendOtpResponse = await Mofsl.resendotp();
        // console.log("Resend OTP Response:", resendOtpResponse);

        await Mofsl.GetMaxBroadcastLimit(clientcode);
    } catch (error) {
        console.error("Error in runBroadcastSample:", error);
        return; 
    }

    try {
        await Mofsl.Broadcast_connect();
        
        Mofsl.Register("MCX", "DERIVATIVES", 250058);
        Mofsl.Register("BSEFO", "DERIVATIVES",873973);
        
        Mofsl.Register("NSE", "CASH",11536);
        Mofsl.Register("BSE", "CASH", 532540);
        Mofsl.UnRegister("BSE", "CASH", 532540);

        // // // Index BSE, NSE
        Mofsl.IndexRegister("NSE");
        // Mofsl.IndexUnregister("NSE");

        Mofsl.IndexRegister("BSE");
        // Mofsl.IndexUnregister("BSE");

        // Logout Broadcast
        // Mofsl.BroadcastLogout();

        Mofsl.onBroadcast('tick', onBroadcastResponse);
        
    } catch (error) {
        console.error("Error in broadcast operations:", error);
    }
}

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

// Run the broadcast sample
runBroadcastSample().catch(error => {
    console.error("Fatal error in runBroadcastSample:", error);
    process.exit(1);
});

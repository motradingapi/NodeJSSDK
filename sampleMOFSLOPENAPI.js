
let MofslOpenApi = require('./MOFSLOPENAPI_V3.1');
let readline = require('readline-sync');

// Dheeraj Sir
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

// Main async function to handle all API calls
async function runOpenAPISample() {
    try {
        // System Info, LocationInfo and then Login request will always be first request with each following request
        
        // Get system information
        const systemData = await Mofsl.SystemInfo();
        // console.log("System Info:", systemData);
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

        // Get Access Token - Always call this after Login
        const accessToken = await Mofsl.GetAccessToken();
        console.log("Access Token::", accessToken);

        // Set the access token in header
        Mofsl.setAccessToken(accessToken.accesstoken);

        // // GetProfile response 
        const profileDetails = await Mofsl.GetProfile();
        console.log("Profile Details::", profileDetails);

        // -------------------------Place Order------------------
        // let PlaceOrderInfo = {
        //     clientcode: clientcode,
        //     exchange: "NSE",
        //     symboltoken: 1660,
        //     buyorsell: "BUY",
        //     ordertype: "LIMIT",
        //     producttype: "Normal",
        //     orderduration: "DAY",
        //     price: 330,
        //     triggerprice: 0,
        //     quantityinlot: 100,
        //     disclosedquantity: 0,
        //     amoorder: "Y",
        //     goodtilldate: "15-Nov-2022",
        //     tag: ""
        // }
        // const placeOrderResponse = await Mofsl.PlaceOrder(PlaceOrderInfo);
        // console.log("Place Order Response:", placeOrderResponse);
        // -----------------------------End of Place Order------------------

        // ------------ Modify Order --------------
        // let ModifyOrderInfo = {
        //     clientcode: clientcode,
        //     uniqueorderid: "0600009T024312",
        //     newordertype: "NORMAL",
        //     neworderduration: "GTD",
        //     newquantityinlot: 100,
        //     newdisclosedquantity: 0,
        //     newprice: 20.5,
        //     newtriggerprice: 0,
        //     newgoodtilldate: "15-Nov-2022",
        //     lastmodifiedtime: "08-Nov-2022 11:30:25",
        //     qtytradedtoday: 0
        // }
        // const modifyOrderResponse = await Mofsl.ModifyOrder(ModifyOrderInfo);
        // console.log("Modify Order Response:", modifyOrderResponse);
        // ------------End of Modify Order --------------

        // ---------- Cancel Order ------------
        // let cancelorderinfo = {
        //     clientcode: clientcode,
        //     uniqueorderid: "0600007T024312"
        // }
        // const cancelOrderResponse = await Mofsl.CancelOrder(cancelorderinfo);
        // console.log("Cancel Order Response:", cancelOrderResponse);
        // -----------End of Cancel Order-------------

        // ----------------- Position Conversion --------------
        // let PositionConversionInfo = {
        //     clientcode: clientcode,
        //     exchange: "NSE",
        //     scripcode: 11536,
        //     quantity: 1,
        //     oldproduct: "NORMAL",
        //     newproduct: "VALUEPLUS"
        // }
        // const positionConversionResponse = await Mofsl.PositionConversion(PositionConversionInfo);
        // console.log("Position Conversion Response:", positionConversionResponse);
        // -----------------End of Position Conversion --------------

        // ----------------- Get LTP message --------------
        let LTPData = {
            clientcode: clientcode,
            exchange: "BSE",
            scripcode: 500317
        }
        const ltpResponse = await Mofsl.GetLtp(LTPData);
        console.log("LTP Response:", ltpResponse);
        // -----------------End of Get LTP message --------------

        const positionResponse = await Mofsl.GetPosition(clientcode);
        console.log("Position Response:", positionResponse);

        const tradeBookResponse = await Mofsl.GetTradeBook(clientcode);
        console.log("Trade Book Response:", tradeBookResponse);

        const orderBookResponse = await Mofsl.GetOrderBook(clientcode);
        console.log("Order Book Response:", orderBookResponse);

        const dpHoldingResponse = await Mofsl.GetDPHolding(clientcode);
        // console.log("DP Holding Response:", dpHoldingResponse);

        // const marginDetailResponse = await Mofsl.GetReportMarginDetail(clientcode);
        // console.log("Margin Detail Response:", marginDetailResponse);

        // const marginSummaryResponse = await Mofsl.GetReportMarginSummary(clientcode);
        // console.log("Margin Summary Response:", marginSummaryResponse);

        // const instrumentFileResponse = await Mofsl.GetInstrumentFile("NSEFO", clientcode);
        // console.log("Instrument File Response:", instrumentFileResponse);

        // const orderDetailResponse = await Mofsl.GetOrderDetailByUniqueorderID("0600009T024312", clientcode);
        // console.log("Order Detail Response:", orderDetailResponse);

        // const tradeDetailResponse = await Mofsl.GetTradeDetailByUniqueorderID("0600009T024312", clientcode);
        // console.log("Trade Detail Response:", tradeDetailResponse);

        // const reportMarginResponse = await Mofsl.GetReportMargin(clientcode);
        // console.log("Report Margin Response:", reportMarginResponse);

        // const tradeWebhookResponse = await Mofsl.TradeWebhook(userID);
        // console.log("Trade Webhook Response:", tradeWebhookResponse);

        const brokerageDetailResponse = await Mofsl.GetBrokerageDetail(clientcode, "NSE", "A");
        // console.log("Brokerage Detail Response:", brokerageDetailResponse);

        // const logoutResponse = await Mofsl.Logout(clientcode);
        // console.log("Logout Response:", logoutResponse);

        // --------------------------------------------------------------------------
        // ------------------------------Trade WebSocket-----------------------------
        // --------------------------------------------------------------------------
        
        // WebSocket operations (these are not async functions)
        await Mofsl.TradeStatus_connect();  
        await Mofsl.Tradelogin();
        await Mofsl.TradeSubscribe();
        // Mofsl.TradeUnsubscribe();
        await Mofsl.OrderSubscribe();
        // Mofsl.OrderUnsubscribe();
        // Mofsl.Tradelogout();

    } catch (error) {
        console.log("EXCEPTION::", error.message);
        console.error("Full Error:", error);
    }
}

// Run the demo
runOpenAPISample();

// WebSocket event handler
Mofsl.onConnect('tick', TradeStatusResponse);

function TradeStatusResponse(message) {
    console.log("Trade Status :: ", message);
}

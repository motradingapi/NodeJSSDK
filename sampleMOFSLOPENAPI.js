
let MofslOpenApi = require('./MOFSLOPENAPI_NodejsV2.3');
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
    
}).then((message)=> {
    // console.log(message);
    // return Mofsl.GetLocationInfo(message)

}).then((location) => {
    // console.log(location)
    // Mofsl.setLocationInfo(location)

    // Login by userId, Password, PANorDOB, vendorId and totp
     return Mofsl.Login(userID, password, PANorDOB, vendorId, totp);

}).then((message) => {
    console.log("LOGIN :: ", message);

    // if (totp === "" || message.isAuthTokenVerified == 'FALSE')
    // {
    //     let MobileEmailOTP = readline.question("Enter 6 Digit OTP : ");

    //     // Verify OTP received on registered Mobile or Email
    //     return Mofsl.verifyotp(MobileEmailOTP);
    // }
    
}).then((message) => {
    
    // console.log(message);
    // Resend OTP on registered Mobile and Email
    // return Mofsl.resendotp();

}).then((message) => {

    // console.log(message);

    // // GetProfile response for dealer
    return Mofsl.GetProfile();

    // // -------------------------Place Order------------------
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
    // return Mofsl.PlaceOrder(PlaceOrderInfo);
    // // -----------------------------End of Place Order------------------

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
    // return Mofsl.ModifyOrder(ModifyOrderInfo);
    // // ------------End of Modify Order --------------


    // // ---------- Cancel Order ------------
    // let cancelorderinfo = {
    //     clientcode: clientcode,
    //     uniqueorderid: "0600007T024312"
    // }
    // return Mofsl.CancelOrder(cancelorderinfo);
    // // -----------End of Cancel Order-------------

    // //----------------- Position Conversion --------------
    // let PositionConversionInfo = {
    //     clientcode: clientcode,
    //     exchange: "NSE",
    //     scripcode: 11536,
    //     quantity: 1,
    //     oldproduct: "NORMAL",
    //     newproduct: "VALUEPLUS"
    // }
    // return Mofsl.PositionConversion(PositionConversionInfo);
    // //-----------------End of Position Conversion --------------

    // //----------------- Get LTP message --------------
    // let LTPData = {
    //     clientcode: clientcode,
    //     exchange: "BSE",
    //     scripcode: 500317
    // }
    // return Mofsl.GetLtp(LTPData)
    // //-----------------End of Get LTP message --------------

    // // GetPosition
    // return Mofsl.GetPosition(clientcode);

    // // GetTradeBook
    // return Mofsl.GetTradeBook(clientcode);

    // // GetOrderBook
    // return Mofsl.GetOrderBook(clientcode);

    // // GetDPHolding
    // return Mofsl.GetDPHolding(clientcode);

    // // GetReportMarginDetail
    // return Mofsl.GetReportMarginDetail(clientcode);

    // // GetReportMarginSummary
    // return Mofsl.GetReportMarginSummary(clientcode);

    // // GetInstrumentFile
    // return Mofsl.GetInstrumentFile("NSEFO",clientcode);

    // // GetOrderDetailByUniqueorderID
    // return Mofsl.GetOrderDetailByUniqueorderID("0600009T024312", clientcode);

    // // GetTradeDetailByUniqueorderID
    // return Mofsl.GetTradeDetailByUniqueorderID("0600009T024312",clientcode);


    // GetReportMargin
    // return Mofsl.GetReportMargin(clientcode);

    // TradeWebhook
    // return Mofsl.TradeWebhook(userID)


    // GetBrokerageDetail
    // return Mofsl.GetBrokerageDetail(clientcode, "NSE", "A");

    // // Logout
    // return Mofsl.Logout(clientcode);

})
    .then((message) => {
        console.log("Data::", message);

        // --------------------------------------------------------------------------
        // ------------------------------Trade WebSocket-----------------------------
        // --------------------------------------------------------------------------
    }).then(() => {
        Mofsl.TradeStatus_connect();  
    }).then(() => {
        Mofsl.Tradelogin();
    }).then(() => {
        Mofsl.TradeSubscribe();
    }).then(() => {
        // Mofsl.TradeUnsubscribe();
    }).then(() => {
        Mofsl.OrderSubscribe();
    }).then(() => {
        // Mofsl.OrderUnsubscribe();
    }).then(() => {
        //  Mofsl.Tradelogout();
    }).catch(ex => {
        console.log("EXCEPTION::", ex.message);
    })

Mofsl.onConnect('tick', TradeStatusResponse);

function TradeStatusResponse(message) {
    console.log("Trade Status :: ", message);
}

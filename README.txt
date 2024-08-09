Implementation guide

Updated Date: 31-07-2024
SDK VERSION: "Nodejs 2.3" UAT base URL changes

1. Use NodeJs Version
	NodeJs Version = 14.17.3 
	If run with any lower version, It may cause error. 

2. Packages Used
	1. address
	2. axios
	3. buffer
	4. crypto
	5. ip
	6. public-ip
	7. python-struct
	8. ws
	9. fs
	10. os
	11. systeminformation 
	Not included in SDK, can installed with 'npm install' command. Use the exact version as in 'package.json' dependencies.

3. ApiKey
	ApiKey will be obtain from website 

4. userID, password, clientcode, Two_FA, vendorinfo, totp
	1. userID and password is your trading account username and password
	2. clientcode only needed in case of dealer, else always keep clientcode = ""
	3. Two_FA as per user defined DOB or PAN in string format
	4. vendorinfo - clientcode
	5. totp - Google Authentication OTP, if not keed totp = ""

5. Set Url
	Enter Base Url for LIVE or UAT Testing 
	1. For live 
	   Base_Url = "https://openapi.motilaloswal.com"
	2. For UAT
	   Base_Url = "https://openapi.motilaloswaluat.com"

6. Initialize MofslOpenApi
	Initialize MofslOpenApi using Apikey, Base_Url and SourceId
		- SourceId: WEB or DESKTOP

7. Uncomment console.log statement to execute
	SystemInfo and then Login request will always be first request with each following request 

8. To resend otp uncomment resendotp(). You will receive an OTP on registered Mobile and Email

9. To verify otp Uncomment verifyotp(otp)
	- If you are passing totp (Google Authenticator OTP) in Login, you do not have need to verifyotp
		
	   
# -----------------------------------------------WebSocket------------------------------------------------

1. Repeat all above Instructions 

2. Keep Login request Uncomment for Validation to use WebSocket

3. Uncomment Mofsl.TradeStatus_connect() to use OpenAPI Trade Websocket 

	1. To send Request for Authorization:
		Mofsl.Tradelogin();

	2. To send Request for TradeSubscription:
		Mofsl.TradeSubscribe();

	3. To send Request for TradeUnsubscription:
		Mofsl.TradeUnsubscribe();

	4. To send Request for OrderSubscription:
		Mofsl.OrderSubscribe();

	5. To send Request for OrderUnsubscription:
		Mofsl.OrderUnsubscribe();

	6. To send Request for Logout:
		Mofsl.Tradelogout();

4. To set Max Broadcast Limit call Mofsl.GetMaxBroadcastLimit(clientcode) before broadcast connect
5. Uncomment Mofsl.Broadcast_connect() to use OpenAPI Broadcast Websocket  
6. Uncomment Mofsl.BroadcastLogout() to Logout Broadcast Websocket

	To Register or Unregister script:
		1. Register script
			Mofsl.Register("BSE", "CASH", 532543);

		2. Unregister script
			Mofsl.UnRegister("BSE", "CASH", 532543);

	To Register or Unregister Index:
		1. Register Index 
			Mofsl.IndexRegister("NSE");

		2. Unregister Index
			Mofsl.IndexUnregister("NSE");


	
	






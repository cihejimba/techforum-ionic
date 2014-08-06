package com.phonegap.plugins.sms;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import android.telephony.SmsManager;

public class SMSPlugin extends CordovaPlugin {

	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext){
		if("send".equals(action)) {
			try{
			   SmsManager smsManager = SmsManager.getDefault();
			   String phoneNumber = args.getString(0);
			   String message = args.getString(1);
			   smsManager.sendTextMessage(phoneNumber, null, message, null, null);
			   callbackContext.success("SMS sent");
			   return true;
			}catch(Exception e) {
				callbackContext.error("SMS failed");
			}
		}
		return false;
   }
}
package com.digitaltools.kayodm;

import com.google.android.apps.analytics.GoogleAnalyticsTracker;

import android.app.Activity;
import android.content.Context;
import android.widget.Toast;

public class JavascriptInterface {
	Context mContext;
	GoogleAnalyticsTracker tracker;
	
	public JavascriptInterface(Context c) {
		// TODO Auto-generated constructor stub
		mContext = c;
	}
	
	public JavascriptInterface(Context c, GoogleAnalyticsTracker track) {
		// TODO Auto-generated constructor stub
		mContext = c;
		this.tracker = track;
	}
	
	public void showToast(String text){
		Toast.makeText(mContext, text, Toast.LENGTH_SHORT).show();
	}
	
	public void trackPage(String page)
	{
		this.tracker.trackPageView(page);
	}
	
	// 按下返回键后处理相关的操作
	public void exitApp(){
		Activity _c =  (Activity) mContext;
		_c.finish();
	}
}

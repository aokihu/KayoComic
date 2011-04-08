package com.digitaltools.kayodm;

import com.google.android.apps.analytics.GoogleAnalyticsTracker;
import com.guohead.sdk.GuoheAdLayout;
import com.guohead.sdk.GuoheAdManager;
import com.guohead.sdk.GuoheAdStateListener;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Window;
import android.webkit.*;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.widget.LinearLayout.LayoutParams;
import com.digitaltools.kayodm.JavascriptInterface;

public class app extends Activity {
    /** Called when the activity is first created. */
	
	GoogleAnalyticsTracker tracker;
	WebView web;
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        tracker = GoogleAnalyticsTracker.getInstance();
        tracker.start("UA-22478651-1", 5, this);
        tracker.setCustomVar(1, "android mode", android.os.Build.MODEL);
        tracker.setCustomVar(1, "android product", android.os.Build.PRODUCT);
        tracker.setCustomVar(1, "android device", android.os.Build.DEVICE);
        tracker.setCustomVar(1, "android id", android.os.Build.ID);
        tracker.setCustomVar(1, "android brand", android.os.Build.BRAND);
        tracker.trackPageView("Main page");
        
        // 去掉标题栏
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        
        setContentView(R.layout.main);
        
        // 加载网页
        web = (WebView) this.findViewById(R.id.mainWebView);
        web.getSettings().setJavaScriptEnabled(true);
        web.addJavascriptInterface(new JavascriptInterface(this, tracker), "Android");	// 增加一个javascript interface到web view众,tracker是google分析对象
        web.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);
        web.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        web.loadUrl("file:///android_asset/www/index.html");
        
        // Guohead广告设置
        LinearLayout.LayoutParams GuoheAdLayoutParams = new LinearLayout.LayoutParams(
        	    LayoutParams.FILL_PARENT, 
        	    LayoutParams.WRAP_CONTENT);

        	LinearLayout footer = (LinearLayout)findViewById(R.id.adLayout);    
        	GuoheAdLayout adLayout = new GuoheAdLayout(this);    
        	adLayout.setListener(new GuoheAdStateListener() {

        	    @Override
        	    public void onFail() {
        	    }

        	    @Override
        	    public void onClick() {
        	        //adLayout.setVisibility(View.GONE);
        	    }

        	    @Override
        	    public void onReceiveAd(){
        	    }

				@Override
				public void onRefreshAd() {
					// TODO Auto-generated method stub
					
				}

        	});
        	footer.addView(adLayout, GuoheAdLayoutParams);
        
    }
    
    @Override
    protected void onDestroy() {
    	// TODO Auto-generated method stub
    	super.onDestroy();
    	GuoheAdManager.finish(this);
    	tracker.stop();
    }
    
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
    	// TODO Auto-generated method stub
    	
    	if(keyCode == KeyEvent.KEYCODE_BACK)
    	{
    		web.loadUrl("javascript:doBackPress()");
    		
    		return true;
    	}
    	else
    		return super.onKeyDown(keyCode, event);
    }
    
}
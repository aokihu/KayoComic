package com.digitaltools.kayodm;

import com.google.android.apps.analytics.GoogleAnalyticsTracker;
import com.guohead.sdk.GuoheAdLayout;
import com.guohead.sdk.GuoheAdManager;
import com.guohead.sdk.GuoheAdStateListener;

import android.app.Activity;
import android.os.Bundle;
import android.view.Window;
import android.webkit.*;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;

public class app extends Activity {
    /** Called when the activity is first created. */
	
	GoogleAnalyticsTracker tracker;
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        tracker = GoogleAnalyticsTracker.getInstance();
        tracker.start("UA-22478651-1", 5, this);
        tracker.trackPageView("Main page");
        
        // 去掉标题栏
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        
        setContentView(R.layout.main);
        
        // 加载网页
        WebView web = (WebView) this.findViewById(R.id.mainWebView);
        web.getSettings().setJavaScriptEnabled(true);
        web.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);
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
    
}
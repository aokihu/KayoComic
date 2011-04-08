// 
// Author: aokihu
// 
// 
//

var __Global = {
    title:"Kayo动漫",
    rootUrl:"http://www.kayonees.com/kayodm/data/"
};

var navigtor; // 导航器

Ext.setup({
    fullscreen:true,
    phoneStartupScreen:"res/loginload.png",
    onReady:init
});

// 页面初始化方法
function init(){
   
    // 目录数据结构定义
    Ext.regModel('category',{
        fields:['name','vol','path','pages']
    }); 
    
    
    var store = new Ext.data.JsonStore({
        model:'category',
        sorters:"name",
        proxy: {
            type: 'ajax',
            url:__Global.rootUrl + "data.json?_t="+(new Date()).getTime(),
            readers:{
                type: "json",
                root: "."
            }
        },
        autoLoad:true
    });
   
    // 目录列表
    var categoryList = new Ext.List({
        itemTpl:"{name} 第{vol}卷",
        store:store,
		ui:"green"
    }); 
	
	categoryList.on("itemtap",function(list,index,sender){
		var record = store.getAt(index);
        var name = record.data.name;
        var vol = record.data.vol;
		var path = record.data.path;
		var pages = record.data.pages;
		console.log(record.data);
		navigtor.push(categoryList);
		navigtor.setActiveItem(display);
		display.update(makeDisplay(path,pages));
		
        // 缩放按钮有效化
        var bigger = zoomDock.child("#zoomBigger");
        bigger.setDisabled(false);
        var smaller = zoomDock.child("#zoomSmaller");
        smaller.setDisabled(false);
        
        // 设置标题
        navigtor.setTitle(name +" "+vol+"话");
        
        // 设置google分析
        Android.trackPage(name);
	})
	
	// 展示页
	var display = new Ext.Panel({
		scroll:"both"
	});
	
	// 缩放Dock
	var zoomDock = new Ext.Toolbar({
		dock:"bottom",
		items:[
			{xtype:"button",id:"zoomBigger",text:"放大",flex:0.5,disabled:true,handler:function(){zoom('bigger');display.doLayout()}},
			{xtype:"button",id:"zoomSmaller",text:"缩小",flex:0.5,disabled:true,handler:function(){zoom('smaller');display.doLayout()}}
		]
	});
	
	// 导航器
    navigtor = new DTNavigtorComponent({
        fullscreen: true,
		title:__Global.title,
		items:[categoryList,display],
		activeItem:0,
		layout:{type:"card"},
		cardSwitchAnimation:"slide"
    });
	
	navigtor.addDocked(zoomDock);
	navigtor.on("pop",function(el){
        // 使缩放按钮无效
        var bigger = zoomDock.child("#zoomBigger");
        bigger.setDisabled(true);
        var smaller = zoomDock.child("#zoomSmaller");
        smaller.setDisabled(true);
        
        // 设置标题
        this.setTitle(__Global.title);
    });	
}



/* 方法定义
--------------------------------------------*/

function makeDisplay(category, pageNumber){
	
	ret = "";
	
	for(i = 1 ; i <= pageNumber; i++)
	{
		var _src = __Global.rootUrl + category+"/bundle/"+i+".jpg";
		ret += "<img class='my-image' src='" + _src + "' width='100%' />";
	}
    
	return ret;
}

// 放大缩小
function zoom(method)
{
    
    var imgs = document.querySelectorAll(".my-image");
    
    for(i = 0; i < imgs.length; i++)
    {
        var img = imgs[i];
        
        if(method == "bigger")
        {
            img.setAttribute("width","");
        }
        
        if(method == "smaller")
        {
            img.setAttribute("width","100%");
        }
    }
    
}

// 处理程序回退功能
function doBackPress(){
    var _number = navigtor.getViewStackNumber();
    
    if(_number > 0)
    {
        navigtor.pop();
    }else
    {
        Android.exitApp();
    }
}
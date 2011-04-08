/**
 * 导航组件
 * NavigtorComponent.class
 *
 * @author aokihu
 * @date 2010-12-24
 * @version 1
 *
 * 导航器是一个基于视图堆栈的Panel
 *
 * version: 0.2
 * 新增pop触发事件，onPop(popItem)
*/

DTNavigtorComponent = Ext.extend(Ext.Panel,{
	
	// 构造函数
	constructor:function(config){
		
		var self = this;
		
		// 视图堆栈
		self.viewStack = [];
		
		// 返回按钮
		self.returnButton = new Ext.Button({
			text:DTLang.getString("return"),
			hidden: true,
			handler: function(){self.pop()}
		});
		
		// 工具栏
		self.toolbar = new Ext.Toolbar({
			dock:"top",
			title:config.title ? config.title : "Title",
			items:[
				self.returnButton,
				{xtype:"spacer"}
			]
		});
		
		// 父类构造函数
		DTNavigtorComponent.superclass.constructor.call(self,config);
		
		// 添加工具栏
		self.addDocked(self.toolbar);
	},
	// 压入视图
	push:function(view){
		this.viewStack.push(view);
		
		if(this.returnButton.isHidden())
			this.returnButton.show("fade");
	},
	// 弹出视图
	pop:function(){
		
		var ret = this.viewStack.pop();
		this.setActiveItem(ret);
		
		if(this.viewStack.length <= 0)
			this.returnButton.hide("fade");
		
		this.fireEvent("pop",ret);
		
		return ret;
	},
	// 设置导航栏标题
	setTitle:function(title){
		this.toolbar.setTitle(title);
	},
	// 返回导航栏对象
	getToolbar:function(){
		return this.toolbar;
	},
    // 返回堆栈数量
    getViewStackNumber:function(){
        return this.viewStack.length;
    }
})
/**
 * 我的菜单组件
 * MyMenu.class
 *
 * @author aokihu
 * @date 2010-12-25
 * @version 1
 *
 * 我的菜单是一个浮动的Panel,用来给用户操作已点的菜肴，结账等功能
*/

DTMyMenu = Ext.extend(Ext.Panel,{
	constructor:function(config){
		self = this;
		
		/**************  菜单数据和列表定义  *****************/
		// 注册我的菜单数据模型
		Ext.regModel('myMenu',{
			fields:['id','name','number','price']
		});
		
		// 我的菜单项目数组
		self.itemStore = new Ext.data.Store({
			model:'myMenu',
			data:[]
		});
		
		// 清单列表
		self.list = new Ext.List({
			itemTpl:"<p>{name} ×{number}</p>\
					 <p>{price}</p>",
			scroll:'vertical',
			autoHeight:true,
			store:self.itemStore
		});
		
		// 注册item扫除事件
		self.list.on("itemswipe",function(list,index){
			self.hide();
			Ext.Msg.confirm("删除","你确认要删除吗?",function(i){
				if(i == "yes")
				{
					self.itemStore.removeAt(index);
					list.refresh();
					self.refreshPriceSum();
				}
			});
			
		});
		
		/****************   按钮定义  *******************/
		
		// 确认菜单按钮
		self.confirmButton = new Ext.Button({
			text:DTLang.getString("confirm"),
			ui:"confirm",
			flex:1
		});
		
		// 清空按钮
		self.clearButton = new Ext.Button({
			text:DTLang.getString("clear_my_menu"),
			flex:1,
			handler:function(){
				self.clearMenu();
			}
		});		
		
		/****************  工具栏定义  *********************/
		
		// 底部工具栏
		self.toolbar = new Ext.Toolbar({
			dock:"bottom",
			layout:{
				type:'hbox',
			},
			items:[
				self.clearButton,	// 清除按钮
				self.confirmButton	// 确认菜单按钮
			]
		});
		
		// 顶部工具栏
		self.infobar = new Ext.Toolbar({
			dock:"top",
			title:DTLang.getString("sum_price") + ":0元"
		});
		
		config.layout = {
			type:'fit',
			align:'stretch'
		};
		
		//初始化菜单
		DTMyMenu.superclass.constructor.call(self,config);
		self.setFloating(true);
		self.setWidth(300);
		self.setHeight(600);
		self.addDocked([self.infobar,self.toolbar]);
		self.add(self.list);
	},
	/*清空菜单*/
	clearMenu:function(){
		var self = this;
		
		// 遍历菜单对象，逐个删除
		self.itemStore.each(function(record){
			self.itemStore.remove(record);
		});
		
		//更新列表
		self.list.refresh();
		
		// 更新总金额
		self.refreshPriceSum();
	},
	/*添加菜单项目*/
	addMenuItem:function(data){
		var self = this;
		
		// 检查输入的数据是否已经存在
		// 如果存在则增加number
		if((record = self.itemStore.findRecord('id',data.id)) == null)
		{
			self.itemStore.add(data);
			self.list.refresh();
		}else
		{
			console.log(record);
			record.data.number++;
			self.list.refresh();
		}
		
		self.refreshPriceSum();
	},
	/*移除菜单项目*/
	removeMenuItem:function(index){
		var self = this;
		self.itemStore.removeAt(index);
		self.list.refresh();
		self.refreshPriceSum();
	},
	/*计算总价*/
	getPriceSum:function(){
		self = this;
		var sum = 0;
		
		self.itemStore.each(function(record){
			sum += (record.data.price * record.data.number);
		});
		
		return sum;
	},
	/*更新总金额*/
	refreshPriceSum:function(){
		self = this;
		self.infobar.setTitle(DTLang.getString("sum_price") + ":" + self.getPriceSum() + "元");
	}
})
/**
 * 我的菜单组件
 * MenuCategory.class
 *
 * @author aokihu
 * @date 2010-12-26
 * @version 1
 *
 * 菜肴主分类Panel
*/

MenuCategory = Ext.extend(Ext.DataView,{
	constructor:function(config){
		
		var self = this;
		
		/******************* 配置主分类列表 *************************/
		
		// 数据模型
		Ext.regModel('MenuCategory',{
			fields:[
				{name:"id",		type:"string"},
				{name:"name",	type:"string"},
				{name:"itemsCount", type:"int"},
				{name:"img",	type:"string"},
				{name:"items",	type:"array"}
			]
		})
		
		// 数据源
		self.store = new Ext.data.Store({
			model:'MenuCategory',
			proxy:{
				type:'ajax',
				url:DTManifest.data.menuData,
				reader:{
					type:"json",
					root:"menus"
				}
			},
			autoLoad:true
		});
		
		// 模板
		self.tpl = new Ext.XTemplate(
			'<tpl for="menus">',
			'<p class="dt-selector">{name}</p>',
			'</tpl>'
			);
		
		config.itemTpl = self.tpl;
		config.store = self.store;
		config.autoHeight = true;
		config.autoWidth = true;
		config.itemSelector = ".dt-selector";
		
		/******************* 构造函数 *************************/
		
		// 构造初始化
		MenuCategory.superclass.constructor.call(this,config);
		
		console.log(self.store);
	}
});
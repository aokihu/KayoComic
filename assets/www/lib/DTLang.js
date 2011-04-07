/**
 * DTLang 语言包
 * 
*/

var DTLang = new Object();

// 语言包目录
DTLang.bundlePath = "res/lang/";

// 语言
DTLang.lang = DTManifest.lang;

// 获得相应的字符串
DTLang.getString = function(str)
{
	return typeof DTLang.items[str] !== "undefined" ? DTLang.items[str] : "null";
}

DTLang.setBundlePath = function(path)
{
	DTLang.bundlePath = path;
}

// 加载语言包
DTLang.load = function(lang){
	document.writeln("<script type='text/javascript' src='"+DTLang.bundlePath+DTLang.lang+".js'></"+"script>")
}


// 加载语言包语言
DTLang.load(DTLang.lang);
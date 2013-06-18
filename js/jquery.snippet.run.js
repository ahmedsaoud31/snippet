/*
* snippet plugin
* v1.0
* Written by Ahmed Aboelsaoud
* https://github.com/ahmedsaoud31/snippet
* 06/18/2013
* Released under LGPL License.
*/
function runSnippet(){
	$(function(){
		var code;
		$("code.snippet").each(function(){
			goSnippet($(this));
		});
		function goSnippet(element){
			code = $(element).html();
			code = code.replace(/\<\!\-\-/g,"");
			code = code.replace(/\-\-\>/g,"");
			$(element).html(code);
			code = $(element).find('pre').html();
			code = code.replace(/\{HTMLCOMMENTSTART\}/g,"&LT;!--");
			code = code.replace(/\{HTMLCOMMENTEND\}/g,"--&GT;");
			code = code.replace(/\{HTMLLT\}/g,"&LT;");
			code = code.replace(/\{HTMLGT\}/g,"&GT;");
			var lang = $(element).find('pre').attr('lang');
			var settings = JSON.parse($(element).find('pre').attr('settings'));
			$(element).html('<pre>'+code+'</pre>');
			$(element).find('pre').snippetcache('session', lang, settings);
		}
	});
}
runSnippet();

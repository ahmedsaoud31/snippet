/*
* snippet plugin
* v1.1
* Written by Ahmed Aboelsaoud
* https://github.com/ahmedsaoud31/snippet
* Date 06/17/2013
* Update 07/04/2013
* Released under LGPL License.
*/
tinymce.PluginManager.add('snippet', function(editor) {
	var code = '';
	var defaultStyle = 'acid';
	var settings = {};
	var defaultLang = 'html';
	var lang;
	var data = {};
	function showDialog() {
		var selection = editor.selection, dom = editor.dom, thisSelectCode,selctedCode,selectFlag=false;
		settings = {};
		lang = '';
		settings['style'] = '';
		data.collapse = false;
		data.menu = true;
		data.showNum = true;
		data.transparent = false;
		var langArr = [	{text:'Shoose Language',value:'0'},
						{text:'C',value:'c'},
						{text:'C#',value:'csharp'},
						{text:'C++',value:'cpp'},
						{text:'CSS',value:'css'},
						{text:'Flex',value:'flex'},
						{text:'HTML',value:'html'},
						{text:'Java',value:'java'},
						{text:'JavaScript',value:'javascript'},
						{text:'JavaScript with DOM',value:'javascript_dom'},
						{text:'Perl',value:'perl'},
						{text:'PHP',value:'php'},
						{text:'Python',value:'python'},
						{text:'Ruby',value:'ruby'},
						{text:'SQL',value:'sql'},
						{text:'XML',value:'xml'}
					];
		var styleArr = [{text:'Select Style',value:'0'},
						{text:'acid',value:'acid'},
						{text:'berries-dark',value:'berries-dark'},
						{text:'berries-light',value:'berries-light'},
						{text:'bipolar',value:'bipolar'},
						{text:'blacknblue',value:'blacknblue'},
						{text:'contrast',value:'contrast'},
						{text:'darkblue',value:'darkblue'},
						{text:'darkness',value:'darkness'},
						{text:'desert',value:'desert'},
						{text:'dull',value:'dull'},
						{text:'easter',value:'easter'},
						{text:'emacs',value:'emacs'},
						{text:'golden',value:'golden'},
						{text:'greenlcd',value:'greenlcd'},
						{text:'ide-anjuta',value:'ide-anjuta'},
						{text:'ide-codewarrior',value:'ide-codewarrior'},
						{text:'ide-devcpp',value:'ide-devcpp'},
						{text:'ide-eclipse',value:'ide-eclipse'},
						{text:'ide-kdev',value:'ide-kdev'},
						{text:'ide-msvcpp',value:'ide-msvcpp'},
						{text:'kwrite',value:'kwrite'},
						{text:'matlab',value:'matlab'},
						{text:'navy',value:'navy'},
						{text:'nedit',value:'nedit'},
						{text:'neon',value:'neon'},
						{text:'night',value:'night'},
						{text:'pablo',value:'pablo'},
						{text:'peachpuff',value:'peachpuff'},
						{text:'rand01',value:'rand01'},
						{text:'random',value:'random'},
						{text:'the',value:'the'},
						{text:'typical',value:'typical'},
						{text:'vampire',value:'vampire'},
						{text:'vim',value:'vim'},
						{text:'vim-dark',value: 'vim-dark'},
						{text:'whatis',value:'whatis'},
						{text:'whitengrey',value:'whitengrey'},
						{text:'zellner',value:'zellner'}
						];
		thisSelectCode = selection.getNode();
		
		if(thisSelectCode.nodeName == 'DIV' && dom.getAttrib(thisSelectCode, 'class') == 'snippet'){
			selectFlag=true;
			lang = $('#textareaContent_ifr').contents().find(thisSelectCode).find('.lang').html();
			lang = lang.replace(/\<\!\-\-\{/g,"").replace(/\}\-\-\>/g,"");
			settings = $('#textareaContent_ifr').contents().find(thisSelectCode).find('.settings').html();
			settings = settings.replace(/\<\!\-\-\{/g,"").replace(/\}\-\-\>/g,"");
			settings = JSON.parse(settings);
			selctedCode = $('#textareaContent_ifr').contents().find(thisSelectCode).find('.code').html();
			selctedCode = selctedCode.replace(/\<\!\-\-\{/g,"").replace(/\}\-\-\>/g,"").replace(/\&LT\;/g,"<").replace(/\&GT\;/g,">");
		}else if((thisSelectCode.nodeName=='PRE' && dom.getAttrib(thisSelectCode,'class')=='snippet')||
				(thisSelectCode.nodeName=='SPAN' && dom.getAttrib(thisSelectCode,'class')=='lang')||
				(thisSelectCode.nodeName=='SPAN' && dom.getAttrib(thisSelectCode,'class')=='settings')||
				(thisSelectCode.nodeName=='SPAN' && dom.getAttrib(thisSelectCode,'class')=='code')){
			selectFlag=true;
			thisSelectCode = dom.getParent(thisSelectCode, 'div.snippet');
			lang = $('#textareaContent_ifr').contents().find(thisSelectCode).find('.lang').html();
			lang = lang.replace(/\<\!\-\-\{/g,"").replace(/\}\-\-\>/g,"");
			settings = $('#textareaContent_ifr').contents().find(thisSelectCode).find('.settings').html();
			settings = settings.replace(/\<\!\-\-\{/g,"").replace(/\}\-\-\>/g,"");
			settings = JSON.parse(settings);
			selctedCode = $('#textareaContent_ifr').contents().find(thisSelectCode).find('.code').html();
			selctedCode = selctedCode.replace(/\<\!\-\-\{/g,"").replace(/\}\-\-\>/g,"").replace(/\&LT\;/g,"<").replace(/\&GT\;/g,">");
		}else{
			selctedCode = selection.getContent({format : 'text'});
		}
		for(var i=0;i<langArr.length;i++){
			if(langArr[i].value == lang){
				langArr[i].selected = true;
			}
		}
		for(var i=0;i<styleArr.length;i++){
			if(styleArr[i].value == settings['style']){
				styleArr[i].selected = true;
			}
		}
		if(typeof settings.collapse != 'undefined') {
			if(settings.collapse){
				data.collapse = true;
			}else{
				data.collapse = false;
			}
		}
		if(typeof settings.menu != 'undefined') {
			if(settings.menu){
				data.menu = true;
			}else{
				data.menu = false;
			}
		}
		if(typeof settings.showNum != 'undefined') {
			if(settings.showNum){
				data.showNum = true;
			}else{
				data.showNum = false;
			}
		}
		if(typeof settings.transparent != 'undefined') {
			if(settings.transparent){
				data.transparent = true;
			}else{
				data.transparent = false;
			}
		}
		if(typeof settings.box != 'undefined') {
			data.linesbox = settings.box;
		}
		if(lang == ''){
			lang = defaultLang;
		}
		if(settings['style'] == ''){
			settings['style'] = defaultStyle;
		}
		
		data.codebox = selctedCode;
		editor.windowManager.open({
			title: 'Snippet',
			data: data,
			body: [
					{
						name: 'Language',
						type: 'listbox',
						values: langArr,
						onselect : function(v) {
							if(this.value() == '0'){
								lang = defaultLang;
							}else{
								lang = this.value();
							}
						 }
					},
					{
						name:'Style',
						type:'listbox',
						values:styleArr,
						onselect : function(v) {
							if(this.value() == '0'){
								settings['style'] = defaultStyle;
							}else{
								settings['style'] = this.value();
							}
						 }
					},
					{
						type: 'container',
						layout: 'flex',
						direction: 'row',
						align: 'center',
						spacing: 5,
						items: [
							{
								type: 'checkbox',
								checked:data.collapse,
								text: 'hide/show Code',
								onclick: function(){
									settings['collapse'] = this.value();
								}
							},
							{
								type: 'checkbox',
								checked:data.menu,
								text: 'show Menu',
								onclick: function(){
									settings['menu'] = this.value();
								}
							},
							{
								type: 'checkbox',
								checked:data.showNum,
								text: 'show Numbers',
								onclick: function(){
									settings['showNum'] = this.value();
								}
							},
							{
								type: 'checkbox',
								checked:data.transparent,
								text: 'Transparent',
								onclick: function(){
									settings['transparent'] = this.value();
								}
							}
						]
					},
					{
						type: 'container',
						layout: 'flex',
						direction: 'row',
						align: 'center',
						spacing: 5,
						items: [
							{
								type: 'label', 
								text: 'Box'
							},
							{
								name: 'linesbox',
								type: 'textbox',
								tooltip: 'Box on Specific lines in format like "2,2-5" '
							},
							{
								name: 'boxColor',
								type: 'colorbutton',
								text: 'Box Color',
								tooltip: 'Box Border Color',
								onselect: function(e) {
									settings['boxColor'] = e.value;
								}
							},
							{
								name: 'boxFill',
								type: 'colorbutton',
								text: 'Box Fill',
								tooltip: 'Box Background Color',
								onselect: function(e) {
									settings['boxFill'] = e.value;
								}
							}
						]
					},
					{
						name: 'codebox',
						type: 'textbox',
						minHeight: 250,
						multiline: true
					}
			],
			onsubmit: function(e) {
				var code2 = code = e.data.codebox;
				code2 = code2.replace(/\</g,"&LT;");
				code2 = code2.replace(/\>/g,"&GT;");
				code2 = code2.replace(/\n/g,"<br>");
				code2 = code2.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
				code2 = code2.replace(/\s/g,"&nbsp;");
				code = code.replace(/\</g,"&LT;");
				code = code.replace(/\>/g,"&GT;");
				var lines = e.data.linesbox.replace(/[^0-9,-]/g,"");
				if(lines != ''){
					settings['box'] = lines;
				}
				if(selectFlag){
					editor.dom.remove(thisSelectCode);
				}
				editor.insertContent('<br><div contenteditable="false" dir="ltr" class="snippet" style="background-color: #DDD; margin: 5px 0 5px 0;"><pre class="snippet">'+code2+'</pre><span class="lang"><!--{'+lang+'}--></span><span class="settings"><!--{'+JSON.stringify(settings)+'}--></span><span class="code"><!--{'+code+'}--></span></div><br>',{format: 'text'});
				settings = {};
				lang = defaultLang;
			}
		});
	}
	editor.addButton('snippet', {
		icon: 'code',
		tooltip: 'Insert/edit Code',
		onclick: function() {
			showDialog();
        }
	});
    editor.addMenuItem('snippet', {
        text: 'Snippet',
		icon: 'code',
        context: 'insert',
        onclick: function() {
			showDialog();
        }
    });
});

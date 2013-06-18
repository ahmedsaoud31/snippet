/*
* snippet plugin
* v1.0
* By Ahmed Aboelsaoud
* Date 06/17/2013
* https://gethub.com/ahmedsaoud31
*/
tinymce.PluginManager.add('snippet', function(editor) {
	var code = '';
	var defaultStyle = 'acid';
	var settings = {};
	settings['style'] = defaultStyle;
	var lang = defaultLang = 'html';
	var data = {};
	function showDialog() {
		data.codebox = editor.selection.getContent({format : 'text'});
		editor.windowManager.open({
			title: 'Snippet',
			data: data,
			body: [
					{
						name: 'Language',
						type: 'listbox',
						values: [	{text: 'Shoose Language', value: '0'},
									{text: 'C', value: 'c'},
									{text: 'C#', value: 'csharp'},
									{text: 'C++', value: 'cpp'},
									{text: 'CSS', value: 'css'},
									{text: 'Flex', value: 'flex'},
									{text: 'HTML', value: 'html'},
									{text: 'Java', value: 'java'},
									{text: 'JavaScript', value: 'javascript'},
									{text: 'JavaScript with DOM', value: 'javascript_dom'},
									{text: 'Perl', value: 'perl'},
									{text: 'PHP', value: 'php'},
									{text: 'Python', value: 'python'},
									{text: 'Ruby', value: 'ruby'},
									{text: 'SQL', value: 'sql'},
									{text: 'XML', value: 'xml'}
									],
						onselect : function(v) {
							if(this.value() == '0'){
								lang = defaultLang;
							}else{
								lang = this.value();
							}
						 }
					},
					{
						name: 'Style',
						type: 'listbox',
						values: [	{text: 'Select Style', value: '0'},
									{text: 'acid', value: 'acid'},
									{text: 'berries-dark', value: 'berries-dark'},
									{text: 'berries-light', value: 'berries-light'},
									{text: 'bipolar', value: 'bipolar'},
									{text: 'blacknblue', value: 'blacknblue'},
									{text: 'contrast', value: 'contrast'},
									{text: 'darkblue', value: 'darkblue'},
									{text: 'darkness', value: 'darkness'},
									{text: 'desert', value: 'desert'},
									{text: 'dull', value: 'dull'},
									{text: 'easter', value: 'easter'},
									{text: 'emacs', value: 'emacs'},
									{text: 'golden', value: 'golden'},
									{text: 'greenlcd', value: 'greenlcd'},
									{text: 'ide-anjuta', value: 'ide-anjuta'},
									{text: 'ide-codewarrior', value: 'ide-codewarrior'},
									{text: 'ide-devcpp', value: 'ide-devcpp'},
									{text: 'ide-eclipse', value: 'ide-eclipse'},
									{text: 'ide-kdev', value: 'ide-kdev'},
									{text: 'ide-msvcpp', value: 'ide-msvcpp'},
									{text: 'kwrite', value: 'kwrite'},
									{text: 'matlab', value: 'matlab'},
									{text: 'navy', value: 'navy'},
									{text: 'nedit', value: 'nedit'},
									{text: 'neon', value: 'neon'},
									{text: 'night', value: 'night'},
									{text: 'pablo', value: 'pablo'},
									{text: 'peachpuff', value: 'peachpuff'},
									{text: 'rand01', value: 'rand01'},
									{text: 'random', value: 'random'},
									{text: 'the', value: 'the'},
									{text: 'typical', value: 'typical'},
									{text: 'vampire', value: 'vampire'},
									{text: 'vim', value: 'vim'},
									{text: 'vim-dark', value: 'vim-dark'},
									{text: 'whatis', value: 'whatis'},
									{text: 'whitengrey', value: 'whitengrey'},
									{text: 'zellner', value: 'zellner'}
								],
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
								text: 'hide/show Code',
								onclick: function(){
									settings['collapse'] = this.value();
								}
							},
							{
								type: 'checkbox',
								checked: true,
								text: 'show Menu',
								onclick: function(){
									settings['menu'] = this.value();
								}
							},
							{
								type: 'checkbox',
								checked: true,
								text: 'show Numbers',
								onclick: function(){
									settings['showNum'] = this.value();
								}
							},
							{
								type: 'checkbox',
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
				code = e.data.codebox;
				code = code.replace(/\<\!\-\-/g,"{HTMLCOMMENTSTART}");
				code = code.replace(/\-\-\>/g,"{HTMLCOMMENTEND}");
				code = code.replace(/\</g,"{HTMLLT}");
				code = code.replace(/\>/g,"{HTMLGT}");
				var lines = e.data.linesbox.replace(/[^1-9,-]/g,"");
				if(lines != ''){
					settings['box'] = lines;
				}
				editor.insertContent('<code class="snippet" style="background-color: #EEE;">{'+lang+' Code}<!--<pre lang="'+lang+'" settings=\''+JSON.stringify(settings)+'\'>'+code+'</pre>--></code>',{format: 'text'});
				settings = {};
				lang=defaultLang;
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

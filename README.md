snippet
=======

snippet is a tinymce v4.0 plugin build on Snippet "jQuery syntax highlighting plugin" built on SHJS script and snippetcache script .

to use it copy snippet folder into tinymce plugins folder.

and config the editor to show snippet plugin:

tinymce.init({
  selector: "textarea",
	theme: "modern",
	plugins: [
		"table preview image link media insertdatetime code snippet"
	],
	toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image snippet",
	toolbar2: "print preview media | forecolor backcolor emoticons",
	templates: [
		{title: 'Test template 1', content: 'Test 1'},
		{title: 'Test template 2', content: 'Test 2'}
	]
});


to display the syntax highlighting for codes don't forget add this links in your page:
`<script type="text/javascript" src="path/to/js/jquery-1.9.1.min.js"></script>`
`<script type="text/javascript" src="path/to/js/jquery-migrate-1.1.1.min.js"></script>`
`<script type="text/javascript" src="path/to/js/jquery.snippet.min.js"></script>`
`<script type="text/javascript" src="path/to/js/jquery.snippet.compiler.js"></script>`
`<script type="text/javascript" src="path/to/js/jquery.snippet.run.js"></script>`
`<link rel="stylesheet" type="text/css" href="path/to/css/jquery.snippet.min.css">`

snippet run autmaticly when page is loaded if you want to run snippet whith other event just use runSnippent() function.

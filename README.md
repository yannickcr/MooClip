MooClip
====

MooClip add a copy to clipboard functionnality to your website using ZeroClipboard and Mootools.

How to use
----------

To use MooClip, you need one or more elements to use as "copy" buttons and a source for the data to copy to clipboard (by default it will use the data-copy attribute (HTML5) of your button).
Just call the constructor with the element(s) as first parameter and the options object as second parameter.

### Example

HTML:

	<button id="mycopybutton" data-copy="Text to copy">Copy to Clipboard</button>

JavaScript:

	new MooClip('#mycopybutton', {
		onCopy: function(e){
			// do stuff
		}
	});
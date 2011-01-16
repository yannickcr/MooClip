Class: MooClip {#MooClip}
=========================================

MooClip is a MooTools plugin that add a copy to clipboard functionnality to your website using [ZeroClipboard](http://code.google.com/p/zeroclipboard/).

### Implements:

[Options][options], [Events][events]

MooClip Method: constructor {#MooClip:constructor}
-------------------------------------------------------------------

### Syntax:

	var myMooClip = new MooClip(elements, options);

### Arguments:

1. elements - (mixed) A CSS selector or an Element reference.
2. options - (object) Options for the class.

### Options:

* moviePath - (string: defaults to `ZeroClipboard.swf`) The path to the ZeroClipboard swf file.
* activeClass - (string: defaults to `active`) The class to apply to the element on mouse down.
* hoverClass - (string: defaults to `hover`) The class to apply to the element on mouse over.
* dataSource - (function) The source of the datas to copy in the clipboard. By default it retrieve the value of the element's data-source attribute.

### Events:

* onBeforeCopy (function) The function to execute before the copy.
* onCopy (function) The function to execute after the copy.

### Example:

#### HTML:

    <textarea id="example1-text" cols="50" rows="5">Example text</textarea>
    <button id="example1">Copy to Clipboard</button>

#### JavaScript:

    var myMooClip = new MooClip('#example1', {
        moviePath: '../Source/ZeroClipboard.swf',
        dataSource: function(target){
            return document.id('example1-text').get('value');
        }
    });

### Notes:

 * This plugin needs [Adobe Flash](http://get.adobe.com/fr/flashplayer/) to works.

MooClip Method: addElements {#MooClip:addElements}
-------------------------------------------------------------------

Allows one or more items to be added to an existing MooClip instance.

### Syntax:

	myMooClip.addElements(element);

### Arguments:

1. elements - (mixed) A CSS selector or an Element reference.

### Returns:

* (object) This MooClip instance.

### Example:

#### JavaScript:

    var myMooClip = new MooClip('#button1');
    
    var button2 = new Element('button', {id: 'button2', text: 'Copy', 'data-source': 'Copy me !'}).inject(document.id('button1'), 'after');

    myMooClip.addElements('#button2');

[options]:http://mootools.net/docs/core/Class/Class.Extras#Options
[events]:http://mootools.net/docs/core/Class/Class.Extras#Events
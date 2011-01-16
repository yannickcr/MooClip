/*
---
script: MooClip.js

description: Provides "Copy to Clipboard" functionality (using Flash)

license: MIT-style license.

authors:
 - Yannick Croissant
 - Joseph Huckaby, for ZeroClipboard (http://code.google.com/p/zeroclipboard/)

requires:
 core/1.3: '*'

provides: [MooClip]

...
*/

var MooClip = new Class({

	Implements: [Options, Events],
		
	options: {/*
		onBeforeCopy: function(event){},
		onCopy: function(event){}, */
		moviePath: 'ZeroClipboard.swf',
		activeClass: 'active',
		hoverClass: 'hover',
		dataSource: function(target){
			return target.get('data-copy');
		}
	},

	initialize: function(els, options){
		this.setOptions(options);
		this.id = Number.random(10e6, 10e7);
		
		this.createClip();
		if (els) this.addElements(els);
	},
	
	createClip: function(){
		this.clip = new Element('div', {
			id: 'MooClipContainer' + this.id,
			events: {
				mouseout: function(e){
					this.current.removeClass(this.options.hoverClass);
					this.clip.setStyle('left', '-9999px');
				}.bind(this),
				mouseup: function(e){
					this.fireEvent('onCopy', e);
					this.current.removeClass(this.options.activeClass);
				}.bind(this),
				mousedown: function(e){
					this.fireEvent('onBeforeCopy', e);
					this.current.addClass(this.options.activeClass);
				}.bind(this)
			},
			styles: {
				position: 'absolute',
				overflow: 'hidden',
				height: '1px',
				width: '1px'
			}
		}).inject(document.body);
		new Swiff(this.options.moviePath, {
			id: 'MooClip' + this.id,
			width: 500,
			height: 500,
			params: {
				loop: 'false',
				menu: 'false',
				quality: 'best',
				allowFullScreen: 'false',
				wmode: 'transparent',
				allowScriptAccess: 'always'
			},
			vars: {
				id: 'MooClip' + this.id,
				width: 500,
				height: 500
			},
			container: this.clip
		});
	},
	
	addElements: function(els){
		var els = typeof els == 'object' ? els : document.getElements(els);
		els.addEvent('mouseover', function(e){
			this.current = document.id(e.target);
			var coords = this.current.getCoordinates(),
				zIndex = this.current.getStyle('z-index');
			this.current.addClass(this.options.hoverClass);
			
			Swiff.remote(this.clip.getFirst(), 'setText', this.options.dataSource(this.current));
					
			this.clip.setStyles({
				top: coords.top + 'px',
				left: coords.left + 'px',
				width: coords.width + 'px',
				height: coords.height + 'px',
				'z-index': zIndex
			});
		}.bind(this));
		return this;
	}
});
/*
	licensed under MIT License: http://en.wikipedia.org/wiki/MIT_License
	author: Jason Sebring  (mail@jasonsebring.com)  September 5th, 2014
*/
;(function(){
	function pad(str, max) {
	  str = str.toString();
	  return str.length < max ? pad('0' + str, max) : str;
	}

	function getHexLittleIndian(num) {
	    var str = num.toString(16);
	    str = pad(str,4);
	    return (str.substr(2) + str.substr(0,2)).toUpperCase();
	}

	var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	function bto64(input) {
		var ret = [];
		var i = 0;
		var j = 0;
		var a3 = [];
		var a4 = [];
		var inLen = input.length;
		var pos = 0;

		while (inLen--) {
			a3[i++] = input[pos++];
			if (i == 3) {
				a4[0] = (a3[0] & 0xfc) >> 2;
				a4[1] = ((a3[0] & 0x03) << 4) + ((a3[1] & 0xf0) >> 4);
				a4[2] = ((a3[1] & 0x0f) << 2) + ((a3[2] & 0xc0) >> 6);
				a4[3] = a3[2] & 0x3f;

				for (i = 0; (i < 4) ; i++) { ret += b64chars.charAt(a4[i]); }
				i = 0;
			}
		}

		if (i) {
			for (j = i; j < 3; j++) { a3[j] = 0; }

			a4[0] = (a3[0] & 0xfc) >> 2;
			a4[1] = ((a3[0] & 0x03) << 4) + ((a3[1] & 0xf0) >> 4);
			a4[2] = ((a3[1] & 0x0f) << 2) + ((a3[2] & 0xc0) >> 6);
			a4[3] = a3[2] & 0x3f;

			for (j = 0; (j < i + 1); j++) { ret += b64chars.charAt(a4[j]); }

			while ((i++ < 3)) { ret += '='; }
		}

		return ret;
	}

	function getDataUri(width, height) {
	    var key = width+':'+height;
	    var self = getDataUri;
	    if (self[key]) {
	        return self[key]; // memoize
	    }
		
	    var hex = '474946383961' + getHexLittleIndian(width) + getHexLittleIndian(height) + 
			'800000000000FFFFFF21F90401000000002C000000000100010000020144003B';
			
	    var binary = [];
	    for (var i = 0; i < hex.length / 2; i++) {
	        var h = hex.substr(i * 2, 2);
	        binary[i] = parseInt(h, 16);        
	    }
		
	    var base64 = bto64(binary);
	    var dataUrl = 'data:image/gif;base64,' + base64;
	    self[key] = dataUrl;
	    return self[key];
	}
	
	$.fn.transparentGif = function(options) {
		var $self = this;
		$self.each(function(){
			var w, h, arr;
			var $this = $(this);
			if ($this.data('img')) {
				arr = $this.data('img').split(',');
				w = parseInt(arr[w]);
				h = parseInt(arr[h]);
			} else {
				w = options.width;
				h = options.height;
			}
			$this.replaceWith($('<img>',{ src: getDataUri(w,h) }))
		});
	};
	
	$.fn.transparentGif.dataUri = getDataUri;
})();
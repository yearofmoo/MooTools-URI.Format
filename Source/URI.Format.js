/**
 * Copyright (C) 2012 by Matias Niemela
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
URI.implement({

  getBase : function() {
    var port = this.get('port');
    port = port.length == 0 || port == 80 ? '' : ':'+port;
    return this.get('scheme') + '://' + this.get('host') + port;
  },

  setFormat : function(format) {
    var url = this.toString();
    this.format = format;
    if(format.charAt(0) != '.') {
      format = '.'+format;
    }
    var matches = url.match(/^(?:https?:\/\/)?[^\/]+\/?([^\.\?\#]+)(?:\.(.+?))?((?:\?|\#).*)?$/) || [];
    if(matches.length>1) {
      var path = matches[1];
      var limit = path.length-1;
      if(path.charAt(limit) == '/') {
        path = path.substr(0,limit);
      }
      var query = matches[3] || '';
      var base = this.getBase();
      url = base + '/' + path + format + query;
    }
    else {
      url += format;
    }

    this.initialize(url);

    return url;
  },

  hasFormat : function() {
    return !! this.getFormat();
  },

  getFormat : function() {
    if(!this.format) {
      var url = this.toString();
      var matches = url.match(/^([^\.\?]+)(?:\.(.+?))(\?.*)?$/) || [];
      if(matches.length>0) {
        this.format = matches[2];
      }
    }
    return this.format;
  },

  clearFormat : function() {
    var url = this.toString();
    if(this.hasFormat()) {
      var format = this.getFormat();
      url = url.replace('.'+format,'');
      this.initialize(url);
    }
    return url;
  }

});

URI.extend({

  hasFormat : function(url) {
    return new URI(url).hasFormat();
  },

  clearFormat : function(url) {
    return new URI(url).clearFormat();
  },

  setFormat : function(url,format) {
    return new URI(url).setFormat(format);
  },

  getFormat : function(url) {
    return new URI(url).getFormat();
  }

});

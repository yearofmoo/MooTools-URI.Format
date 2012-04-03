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

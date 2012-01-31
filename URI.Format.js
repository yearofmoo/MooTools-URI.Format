URI.implement({

  getBase : function() {
    var port = this.get('port');
    port = port.length == 0 || port == 80 ? '' : ':'+port;
    return this.get('scheme') + '://' + this.get('host') + port;
  },

  setFormat : function(format) {
    var url = this.toString();
    this.format = format;
    format = '.'+format;
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
  }
  

});

URI.extend({

  setFormat : function(url,format) {
    url = new URI(url)
    url.setFormat(format);
    return url.toString();
  },

  getFormat : function(url) {
    return new URI(url).getFormat();
  }

});

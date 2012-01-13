URI.implement({

  getBase : function() {
    var port = this.get('port');
    port = port.length == 0 || port == 80 ? '' : ':'+port;
    return this.get('scheme') + '://' + this.get('host') + port;
  },

});

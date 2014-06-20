define( [ 'backbone'], function(Backbone) {
	return Backbone.Collection.extend( {
		url: 'http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=inform&item_cnt=100&type=',
		type: '0',		
		
		fetch: function(options) {
			var collection = this;
			$.ajax({
				type: 'GET',
				url: this.url + this.type,
				dateType: 'json',
				success: function(data) {
					collection.reset($.parseJSON(data));
				}
			})
		},

		initialize: function() {
		}
	});
} );

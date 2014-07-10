define( [ 'backbone'], function(Backbone) {
	return Backbone.Collection.extend( {
		url: 'http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=review&year=',
		year:'',

		fetch: function(options) {
			var collection = this;
			$.ajax({
				type: 'GET',
				url: this.url + this.year,
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

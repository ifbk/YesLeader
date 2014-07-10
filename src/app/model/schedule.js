define( [ 'backbone'], function(Backbone) {
	return Backbone.Collection.extend( {
		url: 'http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=lecture',
		year: '',
		month: '',
		before_dayid : null,

		fetch: function(options) {
			var collection = this;
			$.ajax({
				type: 'GET',
				url: this.url + "&year=" + this.year + "&month=" + this.month,				
				dateType: 'json',
				success: function(data) {
					var obj = ($.parseJSON(data));
					var coll = collection.toJSON();
					collection.reset($.parseJSON(data));
				}
			})
		},

		initialize: function() {
		}
	});
} );



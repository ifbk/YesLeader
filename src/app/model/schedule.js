define( [ 'backbone'], function(Backbone) {
	return Backbone.Collection.extend( {
		//url: '​http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=lecture&year=2014&month=03',		
		//url: 'http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=lecture&year=2014&month=06',
		url: 'http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=lecture',
		year: '2014',
		month: '05',
		before_dayid : null,

		fetch: function(options) {
			var collection = this;
			$.ajax({
				type: 'GET',
				url: this.url + "&year=" + this.year + "&month=" + this.month,				
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



define( [ 'backbone'], function(Backbone) {
	return Backbone.Collection.extend( {
		url: 'http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=inform&item_cnt=100&type=',
		//리뷰 http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=review&year=2013 
		//•스케쥴 ◦​http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=lecture&year=2014&month=03 

		type: '0',


		fetch: function(options) {
			var collection = this;
			$.ajax({
				type: 'GET',
				//url: this.url + this.type,
				url: 'http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=inform&item_cnt=100&type=',
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

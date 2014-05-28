define( [ 'backbone', 'model/lecture' ], function(Backbone, Lecture) {
	return Backbone.Collection.extend( {
		model: Lecture,
		url: 'http://www.yesleaders.com/miplatform/miplatform/simpleJsonAction.do?method=video&category=',
		category: '01',

		fetch: function(options) {
			var collection = this;
			$.ajax({
				type: 'GET',
				url: this.url + this.category,
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

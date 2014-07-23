define( [ 'backbone'], function(Backbone) {
	return Backbone.Collection.extend( {
		url: 'http://192.168.0.44:8080/YesLeaderWebService/YesLeaderService.bo?method=GetQuestion',

		fetch: function(options) {
			var survey = this;
			$.ajax({
				type: 'GET',
				url: this.url,
				dateType: 'json',
				success: function(data) {
					var obj = ($.parseJSON(data));
					var coll = survey.toJSON();
					survey.reset($.parseJSON(data));
				}
			})
		},

		initialize: function() {
		}
	});
} );



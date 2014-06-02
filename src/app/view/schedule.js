define( [ 'backbone', 'template!view/schedule'], function( Backbone, template ) {
	return Backbone.View.extend( {

		el: 'section#schedule',

		initialize: function() {
		},

		render: function() {
			this.$el.html(template());
			return this;
		}
	});
} );

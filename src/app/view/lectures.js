define( [ 'backbone', 'model/lecture', 'model/lectures', 'template!view/lectures', 'style!view/lectures' ], 
function( Backbone, Lecture, Lectures, template ) {
	return Backbone.View.extend( {
		collection: null,

		el: 'section#lectures',

		initialize: function() {
			this.collection = new Lectures();
			this.collection.category = '01';
			this.listenTo(this.collection, 'reset', this.render);
			this.collection.fetch();
		},

		render: function() {
			this.$el.html(template( { lectures: this.collection.toJSON() }));
			return this;
		},

		events: {
			'click .category': 'categoryPressed',
			'click .lecture-wrap' : 'lecturePressed'
		},

		categoryPressed: function(event) {
			this.collection.category = $(event.target).data('category');
			this.collection.fetch();
		},

		lecturePressed: function(event) {
			var seq = $(event.target).data('seq');
			console.log('item Pressed: ' + seq);
		}
	});
} );

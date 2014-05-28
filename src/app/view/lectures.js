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
			console.log(this.collection.models);
			// page1.template 템플릿을 렌더링한 결과를 el의 하부에 추가한다.
			this.$el.html(template( { lectures: this.collection.toJSON() }));
			return this;
		},

		events: {
			'click .category': 'categoryPressed',
			'click .list-group .list-group-item': 'itemPressed'
		},

		categoryPressed: function(event) {
			this.collection.category = $(event.target).data('category');
			this.collection.fetch();
		},

		itemPressed: function(event) {
			var seq = $(event.target).data('seq');
			console.log('item Pressed: ' + seq);



		}
	});
} );

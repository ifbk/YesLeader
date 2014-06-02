define( [ 'backbone', 'model/news', 'template!view/news', 'style!view/news'], 
function( Backbone, News, template ) {
	return Backbone.View.extend( {
		collection: null,

		el: 'section#news',

		initialize: function() {
			this.collection = new News();
			this.collection.type = '0';
			this.listenTo(this.collection, 'reset', this.render);
			this.collection.fetch();
		},

		render: function() {
			console.log(this.collection.toJSON());
			this.$el.html(template( { news: this.collection.toJSON() } ));

			$('.tab-btn').removeClass('active');
			$('#tab-btn-' + this.collection.type).addClass('active');

			return this;
		},

		events: {
			'click .tab-btn': 'tabBtnPressed'
		},

		tabBtnPressed: function(event) {
			this.collection.type = $(event.target).parent().data('type');
			this.collection.fetch();			
		}

	});
} );

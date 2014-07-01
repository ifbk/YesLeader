define( [ 'backbone', 'model/reviews', 'template!view/reviews', 'style!view/reviews' ,'widget-modal'], 
function( Backbone, Reviews, template, Modal ) {
	return Backbone.View.extend( {
		collection: null,
		year:'',
		el: 'section#reviews',

		initialize: function() {
			this.collection = new Reviews();

			var d = new Date();
			this.year = d.getFullYear()-1;

			this.collection.year = this.year;
			this.listenTo(this.collection, 'reset', this.render);
			this.collection.fetch();
		},

		render: function() {
			console.log(this.collection.toJSON());
			this.$el.html(template( { reviews: this.collection.toJSON() } ));

			$('.tab-btn').removeClass('active');
			$('#tab-btn-' + this.collection.type).addClass('active');

			//$('#newsModal').modal({"backdrop":true,"keyboard":true});
			$('#reviewYear').html(this.year);
			return this;
		},

		events: {
			'click #pbtn': 'showPrev',
			'click #nbtn': 'showNext',
			'click #popReview': 'popReview'
		},
		showPrev: function(event) {
			this.year = (this.year*1)-1;
			this.collection.year = this.year;
			this.collection.fetch();
		},

		showNext: function(event) {
			this.year = (this.year*1)+1;
			this.collection.year = this.year;
			this.collection.fetch();
		},

		popReview: function(event) {
			var title = $(event.target).find("span").attr("title");
			var univ = $(event.target).find("span").attr("univ");
			var review = $(event.target).find("span").attr("review");
			$("#reviewModal").modal({"backdrop":false,"keyboard":true});
			$("#reviewModal").find("#m_r_title").html(title);
			$("#reviewModal").find("#m_r_univ").html(univ);
			$("#reviewModal").find("#m_r_review").html(review);
		}
	});
});

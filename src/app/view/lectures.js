define( [ 'backbone', 'model/lectures', 'template!view/lectures', 'style!view/lectures' ], 
function( Backbone, Lectures, template ) {
	var uView = Backbone.View.extend( {
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
			var category = this.collection.category;
			var scategory = $('.category').filter(function (index){				
				return $(this).data("category") == category;				
			});
			// scategory.css("border","3px double red");
			scategory.css("background-color","#128F76");

			$("#lecturesPath").text(scategory.text());			
			return this;
		},

		events: {
			'click .category': 'categoryPressed',
			'click .lecture-wrap' : 'lecturePressed',
			'click #popLModal' : 'clickModal',
		},

		categoryPressed: function(event) {
			this.collection.category = $(event.target).data('category');
			this.collection.fetch();
		},

		lecturePressed: function(event) {
			var seq = $(event.target).data('seq');
			console.log('item Pressed: ' + seq);
			var i=0;
		},

		clickModal: function(event) {
			var title = $(event.target).find("span").attr("title");			
			var leader = $(event.target).find("span").attr("leader");
			var company = $(event.target).find("span").attr("company");
			var time = $(event.target).find("span").attr("time");
			var videoLink = $(event.target).find("span").attr("videoLink");
			var contents = $(event.target).find("span").attr("contents");
			var subject = $(event.target).find("span").attr("subject");

			$("#videoModal").modal();
			$("#videoModal").find("#m_v_title").html(title);
			$("#videoModal").find("#m_v_subject").html(subject);
			$("#videoModal").find("#m_v_time").html(time);
			$("#videoModal").find("#m_v_leader_company").html(leader + "-" + company);
			$("#videoModal").find("#m_v_contents").html(contents);
			$("#videoModal").find("#m_v_video").html(videoLink);

			console.log('video Link : ' + contents);
			console.log('video Link : ' + videoLink);
		}	

	});

	return uView;
} );

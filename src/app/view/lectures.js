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
			// scategory.css("border","3px double red");  //주황테마 d56e00 // 녹색테마 128F76
			scategory.css("background-color","#d56e00");

			$("#lecturesPath").text(scategory.text());			
			return this;
		},

		events: {
			'click .category': 'categoryPressed',
			'click .lecture-wrap' : 'lecturePressed',
			'click #popLModal' : 'clickModal',
			'hidden.bs.modal #popLModal' : 'removeContent',
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
		removeContent:function(event) {
			$("#videoModal").find("#m_v_title").html('');
			$("#videoModal").find("#m_v_subject").html('');
			$("#videoModal").find("#m_v_time").html('');
			$("#videoModal").find("#m_v_leader_company").html('');
			$("#videoModal").find("#m_v_contents").html('');
			$("#videoModal").find("#m_v_video").html('');
		},
		clickModal: function(event) {

			var seqNumber = $(event.target).parents("a").data('seq');
		
			if(seqNumber == null) {
				seqNumber = $(event.target).data('seq');
			}

			var coll = this.collection.toJSON();
			var filter = $.grep(coll, function(element, index){
			    console.log(element.VIDEO_SEQ + ", seqNumber : " + seqNumber);
			    return (element.VIDEO_SEQ == seqNumber)
			});

			var object = filter[0];
			console.log(object);
			console.log(object.VIDEO_TITLE);

			$("#videoModal").modal({"backdrop":false});
			$("#videoModal").find("#m_v_title").html(object.VIDEO_TITLE);
			$("#videoModal").find("#m_v_subject").html(object.VIDEO_SUBJECT_TYPE_NM);
			$("#videoModal").find("#m_v_time").html(object.VIDEO_MINUTE + "분 " + object.VIDEO_SECOND + "초");
			$("#videoModal").find("#m_v_leader_company").html(object.LEADER_NM + " - " + object.COMPANY_NM);
			$("#videoModal").find("#m_v_contents").html(object.VIDEO_TEXT);
			$("#videoModal").find("#m_v_video").html(object.VIDEO_SOURCE);
		}	
	});
	return uView;
} );

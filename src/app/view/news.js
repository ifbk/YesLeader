define( [ 'backbone', 'model/news', 'template!view/news', 'style!view/news' ,'widget-modal'], 
function( Backbone, News, template, Modal ) { 
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
			'click .tab-btn': 'tabBtnPressed',
			'click #popModal' : 'clickModal',
		},

		tabBtnPressed: function(event) {
			this.collection.type = $(event.target).parent().data('type');
			this.collection.fetch();			
		},

		clickModal: function(event) {
			var title = $(event.target).find("span").attr("title");
			var contents = $(event.target).find("span").attr("contents");

			//$(".alert").alert("닫힘?")
			$("#newsModal").modal();
			$("#newsModal").find("#modalTitle").html(title);
			$("#newsModal").find("#modalContents").html(contents);
		},
	});
});

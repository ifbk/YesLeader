define( [ 'backbone', 'model/news', 'template!view/news', 'style!view/news' ,'widget-modal', 'view/srt-0.9'], 
function( Backbone, News, template, Modal ) { 
	return Backbone.View.extend( {
		collection: null,
		
		el: 'section#news',

		initialize: function() {
			this.collection = new News();
			this.collection.type = '0';
			this.listenTo(this.collection, 'reset', this.render);
			this.collection.fetch();

			this.el.addEventListener("backbutton", this.onBackbutton, false);
			// this.listenTo(this.el, 'backbutton', this.onBackbutton);
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
			$("#newsModal").modal({"backdrop":false});
			$("#newsModal").find("#modalTitle").html(title);
			$("#newsModal").find("#modalContents").html(contents);
		},
		
		onBackbutton: function() {
			if ($("#newsModal").modal.isShown == true) {
				alert("modal shown");
				$("#newsModal").modal("hide");	
			}
			else {
				alert("modal test");
			}
			
	    // Handle the backbutton event
	    // document.removeEventListener("backbutton", onBackbutton, false);
		}
	});
	
});

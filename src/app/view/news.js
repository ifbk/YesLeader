define( [ 'backbone', 'model/news', 'view/cordova', 'template!view/news', 'style!view/news' ,'widget-modal', 'view/srt-0.9'], 
function( Backbone, News, Cordova, template, Modal ) { 
	return Backbone.View.extend( {
		collection: null,
		
		el: 'section#news',

		initialize: function() {
			this.collection = new News();
			this.collection.type = '0';
			this.listenTo(this.collection, 'reset', this.render);
			this.collection.fetch();

			
			console.log("document ? - " + this.el.ownerDocument);
			this.el.ownerDocument.addEventListener("backbutton", this.onBackbutton, false);
			
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
			var seqNumber = $(event.target).parents("a").data('seq');
		
			if(seqNumber == null) {
				seqNumber = $(event.target).data('seq');
			}

			var coll = this.collection.toJSON();
			var filter = $.grep(coll, function(element, index){
			    
			    return (element.INFORM_SEQ == seqNumber)
			});

			var object = filter[0];
			
			$("#newsModal").modal({"backdrop":false});
			$("#newsModal").find("#modalTitle").html(object.INFORM_TITLE);
			$("#newsModal").find("#modalContents").html(object.INFORM_CONTENTS);
		},
		
		onBackbutton: function(event) {
			if ($("#newsModal").shown == true) {
				console.log("모달뷰 켜진상태");
				$("#newsModal").modal("hide");	
			}
			else {
				console.log("모달뷰 꺼진상태");
				navigator.app.exitApp();
			}
		}
	});
});

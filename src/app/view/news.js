define( [ 'backbone', 'model/news', 'template!view/news', 'template!view/newsModal' ,'style!view/news' ,'widget-modal'], 
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

			//$('#newsModal').modal({"backdrop":true,"keyboard":true});

			return this;
		},

		events: {
			'click .tab-btn': 'tabBtnPressed',
			'click #popModal' : 'clickModal',
			//'show.bs.modal #newsModal' : 'showModal'
			//'click .news-item-wrap' : 'clickTest'
		},

		tabBtnPressed: function(event) {
			this.collection.type = $(event.target).parent().data('type');
			this.collection.fetch();			
		},

		/*
		showModal : function(event){
			alert("show");
		},

		*/
		clickModal: function(event) {
			//alert($(event.target).text());
			//alert($(event.target).prop("nodeName"));
			//alert($(event.target).html());
			//alert($(event.target).children("news-title"));
			//alert($(event.target).find(".news-title").prop("nodeName"));
			//alert($(event.target).find(".news-title[testtitle]").value());
			//alert($(event.target).find(".news-title[testtitle]").text());
			//alert($(event.target).find("span").text());
			//alert($(event.target).find("span").attr("content"));

			var title = $(event.target).find("span").attr("title");
			var contents = $(event.target).find("span").attr("contents");

			//$(".alert").alert("닫힘?")
			$("#newsModal").modal();
			$("#newsModal").find("#modalTitle").html(title);
			$("#newsModal").find("#modalContents").html(contents);


			  //var modal = new Modal({
			   // el: "#newsModal"
			  //});
			  //modal.render();	
		},





	});

} );

/*

define( [ 'widget-modal'], 
function( Modal ) {

  var modal = new Modal({
    el: "#newsModal"
  });
  modal.render();

} );
*/
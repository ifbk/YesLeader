define( [ 'backbone', 'template!view/news'], 
function( Backbone, template ) {
	return Backbone.View.extend( {

		el: 'section#news',

		initialize: function() {
		},

		render: function() {
			// page1.template 템플릿을 렌더링한 결과를 el의 하부에 추가한다.
			this.$el.html(template());
			return this;
		}
	});
} );

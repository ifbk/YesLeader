
define( [ 'backbone', 'template!view/lectures', 'style!view/lectures' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#lectures',

		render: function() {
			// page1.template 템플릿을 렌더링한 결과를 el의 하부에 추가한다.
			this.$el.html( template() );
			return this;
		},

		events: {
			'click button.next': 'nextPage'
		},

		nextPage: function() {
			location.href = '#page2';
		index(selector/element)}
	} );
} );

define( [ 'logging', 'backbone', 'model/lecture', 'template!view/lectures', 'style!view/lectures' ], 
function( Log, Backbone, Lecture, template ) {

	var Lectures = Backbone.Collection.extend( {
		model: Lecture
	});
	
	return Backbone.View.extend( {

		el: 'section#lectures',

		initialize: function() {
			//this.listenTo(this.model, "change", this.render);
		},

		render: function() {
			// page1.template 템플릿을 렌더링한 결과를 el의 하부에 추가한다.
			this.$el.html( template() );
			return this;
		},

		events: {
			'click .category': 'categoryPressed'
		},

		categoryPressed: function(event) {
			Log.debug(event);
			Log.debug($(event.target).attr('id'));
		}
	} );
} );

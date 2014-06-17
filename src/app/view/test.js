

define( [ 'backbone', 'model/test', 'template!view/test', 'style!view/test' ], 
function( Backbone, Test, template ) {
	return Backbone.View.extend( {
		model: null,

		//el: 'section#test',
		el: 'section#tests',

		initialize: function() {
			this.model = new Test();
			this.model.set("age",35);
			//this.model.save();


			
		},

		render: function() {		

	       var data = template( { testarea: this.model.toJSON() });
	       //this.$el.html( data );
	       this.$el.html(data);
	 	   console.log(this.$el.html());
	       //this.$el.text(this.$el.html());
			return this;
		}
/*
		events: {			 
			'click .test-wrap' : 'testPressed'
		},

		testPressed: function(event) {
			Test.age = 38;
		}
*/
	});
} );

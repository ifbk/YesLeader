define(['backbone'],function(Backbone){
	return Backbone.Model.extend({
		
		defaults: { name: '홍길동',age: 40},
		initialize: function(){
			console.log('Created!');
		}
	});
});
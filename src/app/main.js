
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'view/lectures', 'view/schedule', 'view/news', 'view/blog', 'backbone', 'multipage-router', 'bootstrap', 'style!main' ], 
	function( LecturesView, ScheduleView, NewsView, BlogView, Backbone, MultipageRouter ) {
	return {
		launch: function() {

			// Router
			var MainRouter = MultipageRouter.extend( {
			
				pages: {
					'LecturesView': {
						fragment: ['', 'lectures'],
						el: '#lectures',
						render: function() {
							new LecturesView().render();
						}
					},
					'ScheduleView': {
						fragment: 'schedule',
						el: '#schedule',
						render: function() {
							new ScheduleView().render();
						}
					},
					'NewsView': {
						fragment: 'news',
						el: '#news',
						render: function() {
							new NewsView().render();
						}
					},
					'BlogView': {
						fragment: 'blog',
						el: '#blog',
						render: function() {
							new BlogView().render();
						}
					},
					'default': {
						active: function( path ) {
							alert( 'Page not found' );
							history.back();
						}
					}
				}
				/*
				transitions: {
					'page1:page2': 'slide',
					'page2:page3': { type: 'slide', duration: 3000 }
				},
				*/
			} );

			new MainRouter();
			Backbone.history.start();
		}	
	};
} );

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
					'ScheduleView': {
						fragment: 'schedule',
						el: '#schedule',
						render: function() {
							new ScheduleView().render();
						}
					},
					'NewsView': {
						newsView: null,
						fragment: 'news',
						el: '#news',
						render: function() {
							if (this.newsView == null)
								this.newsView = new NewsView();
							this.newsView.render();
						}
					},
					'LecturesView': {
						lecturesView: null,

						fragment: ['', 'lectures'],

						el: '#lectures',

						render: function() {
							if (this.lecturesView == null)
								this.lecturesView = new LecturesView();

							this.lecturesView.render();
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

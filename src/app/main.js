/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'view/lectures', 'view/schedule', 'view/news', 'view/blog','view/test', 'backbone', 'multipage-router', 'bootstrap', 'style!main' ], 
	function( LecturesView, ScheduleView, NewsView, BlogView,TestView,Backbone, MultipageRouter ) {
	return {
		launch: function() {

			// Router
			var MainRouter = MultipageRouter.extend( {
			
				pages: {
					'ScheduleView': {
						
						scheduleView: null,
						fragment: 'schedule',		
						el: 'section#schedule',				
						render: function() {
							if(this.scheduleView ==null)
								this.scheduleView = new ScheduleView();
							this.scheduleView.render();
						}
						
						/*
						newsView: null,
						fragment: 'schedule',	
						el: 'section#news',					
						render: function() {
							if (this.newsView == null)
								this.newsView = new NewsView();
							this.newsView.render();
						}
						*/
						
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
					'TestView': {
						testView: null,
						fragment: 'test',
						el: '#test',
						render: function() {
							if (this.testView == null)
								this.testView = new TestView();
							this.testView.render();
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

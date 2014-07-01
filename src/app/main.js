/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'view/lectures', 'view/schedule', 'view/news', 'view/reviews', 'backbone', 'multipage-router', 'bootstrap', 'style!main' ], 
	function( LecturesView, ScheduleView, NewsView, ReviewsView, Backbone, MultipageRouter ) {
	return {
		launch: function() {
			$('.enter_link').click(function() { 
        		$(this).parent().fadeOut(500);
 			});
			// Router
			var MainRouter = MultipageRouter.extend( {
			
				pages: {
					'ScheduleView': {
						scheduleView: null,
						fragment: ['', 'schedule'],		
						el: 'section#schedule',				
						render: function() {
							if(this.scheduleView ==null)
								this.scheduleView = new ScheduleView();
							this.scheduleView.render();
						}
					},
					'LecturesView': {
						lecturesView: null,
						fragment: 'lectures',
						el: '#lectures',

						render: function() {
							if (this.lecturesView == null)
								this.lecturesView = new LecturesView();

							this.lecturesView.render();
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
					'ReviewsView': {
						reviewsView:null,
						fragment: 'reviews',
						el: '#reviews',
						render: function() {
							if (this.reviewsView == null)
								this.reviewsView = new ReviewsView().render();
							this.reviewsView.render();
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

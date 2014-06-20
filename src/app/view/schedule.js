define( [ 'backbone', 'model/schedule', 'template!view/schedule', 'template!view/scheduleList', 'style!view/schedule','widget-modal'], 
function( Backbone, Schedule, templateMain, templateList , Modal) {
	return Backbone.View.extend( {

		collection : null,
		el: 'section#schedule',
		

		initialize: function() {
			this.collection = new Schedule();
			this.listenTo(this.collection,'reset',this.drawList);
			var d = new Date();
			this.collection.year = d.getFullYear();			
			this.collection.month =  (d.getMonth() +1) <10 ? "0" +(d.getMonth() +1)  : (d.getMonth() +1);
			this.collection.fetch();			
		},


		render: function() {
			//this.$el.html(templateMain());
			//alert($("#scheduleList"));
			//alert($("#scheduleList").text());
			this.$el.html(templateMain());
			//$("#scheduleList").html("dkdakadlda");


			var that = this;
            $("#my-calendar").zabuto_calendar({
            	language: "ko",
	            legend: [
	                {type: "text", label: "Special event", badge: "00"},
	                {type: "block", label: "Regular event"}
	            ], 
	            /*               	
                ajax: {                   		
                 	
				    //url: "show_data.php",
				    url: "lib/zabutoCalendar/json/yesleader_sample.json",
                    modal: false                      
                },*/
                    cell_border: true,
                    today: true,
                    show_days: true,
                    weekstartson: 0,
                    //nav_icon: {
                    //    prev: '<i class="fa fa-chevron-circle-left"></i>',
                     //   next: '<i class="fa fa-chevron-circle-right"></i>'
                    //},

	            action: function () {

					var date = $("#" + this.id).attr("yl_date");
					//console.log("date " + date);
	                var coll = that.collection.toJSON();
					var filteredJson = $.grep(coll, function(element, index){
					  //console.log(element + " " + index);
					  return element.LECTURE_DT == date;
					  
					});
					//$('table').children().find("td").css("background","white"); 
					//alert($("#" + this.id).html());
					//$('table').children().find(".badge").remove();
					//$('table').children().find(".day").html("<div class='day'>"  + "</div>");
					if(that.collection.before_dayid != null)
						 $("#" + that.collection.before_dayid).html("<div class='day'>" + $("#" + that.collection.before_dayid).text() + "<div>");

					that.collection.before_dayid = this.id;					
					$("#" + this.id).html("<div class='day'><span class='badge badge-event'>" + $("#" + this.id).text() +"</span></div>");
					//$("#" + this.id).css("background","red");
					

	                that.drawListDay(filteredJson);
	            },
	            action_nav: function () {
	            	//alert($("#" + this.id).attr("month"));
					that.collection.year =  $("#" + this.id).attr("year");
					var m = $("#" + this.id).attr("month");	
					
					that.collection.month = m.length < 2 ? "0" + m  : m;
					that.collection.fetch();

	        
	                var dd = "dd";
	            }

            });
			


			return this;
		},

		drawList: function(event) {
			
			$("#scheduleList").html(templateList({schedule: this.collection.toJSON()} ));

			//강의 있는 날짜 디자인 바꾸기
			var coll2 = this.collection.toJSON();
			$('table').children().find("td").each( function(i){
				//console.log("d" + $("#" + this.id).attr("yl_date"));
				var d = $("#" + this.id).attr("yl_date");
				var f = $.grep(coll2, function(element, index){
				  console.log(element.LECTURE_DT + " " + index);
				  return element.LECTURE_DT == d;				  
				});

				//console.log("ff " + f);
				if(f.length > 0)
					$("#" + this.id).css("background","blue");
					
				
			});
			

			
		},

		drawListDay: function(coll) {
			
			$("#scheduleList").html(templateList({schedule: coll} ));
			//alert(coll.toJSON());
		},

		testFunc: function(event) {
			alert("alert");
		},

		clickModal: function(event) {


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
		}
/*
	    myDateFunction : function(id, fromModal) {
	        $("#date-popover").hide();
	        if (fromModal) {
	            $("#" + id + "_modal").modal("hide");
	        }
	        var date = $("#" + id).data("date");
	        var hasEvent = $("#" + id).data("hasEvent");
	        if (hasEvent && !fromModal) {
	            return false;
	        }
	        $("#date-popover-content").html('You clicked on date ' + date);
	        $("#date-popover").show();
	        return true;
	    },

	    myNavFunction : function (id) {
	        $("#date-popover").hide();
	        var nav = $("#" + id).data("navigation");
	        var to = $("#" + id).data("to");
	     
	    }


*/


	});
} );

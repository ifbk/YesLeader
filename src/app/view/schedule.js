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
                    today: false,
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
			

			this.drawList();
			return this;
		},

		events: {
			'click #popSchedule' : 'clickSchedule',
			'click #popSearch' : 'clickSearch'
		},

		drawList: function(event) {
			
			$("#scheduleList").html(templateList({schedule: this.collection.toJSON()} ));

			//강의 있는 날짜 디자인 바꾸기
			var coll2 = this.collection.toJSON();
			$('table').children().find("td").each( function(i){
				//console.log("d" + $("#" + this.id).attr("yl_date"));
				var d = $("#" + this.id).attr("yl_date");
				var f = $.grep(coll2, function(element, index){
				  // console.log(element.LECTURE_DT + " " + index);
				  return element.LECTURE_DT == d;				  
				});

				//console.log("ff " + f);
				if(f.length > 0)
					$("#" + this.id).css("background","lightgray");
			});
			

			
		},

		drawListDay: function(coll) {
			
			$("#scheduleList").html(templateList({schedule: coll} ));
			//alert(coll.toJSON());
		},

		testFunc: function(event) {
			alert("alert");
		},

		clickSchedule: function(event) {
			console.log("clicked calendar info" + event.target);

			
			var leader = $(event.target).find("span").attr("leader");
			var target = $(event.target).find("span").attr("target");
			var date = $(event.target).find("span").attr("date");
			var stime = $(event.target).find("span").attr("stime");
			var etime = $(event.target).find("span").attr("etime");
			var host = $(event.target).find("span").attr("host");
			var place = $(event.target).find("span").attr("place");
			var staff = $(event.target).find("span").attr("staff");
			var tell = $(event.target).find("span").attr("tell");
			var subject = $(event.target).find("span").attr("subject");
			var contents = $(event.target).find("span").attr("contents");


			date = date.substring(0,4) + ". " +  date.substring(4,6) + ". " +  date.substring(6,8) + " ";
			stime = stime.substring(0,2) + ":" + stime.substring(2,4) +  " ~ ";
			etime = etime.substring(0,2) + ":" + etime.substring(2,4);
			tell = " (" + tell +")"; 

			// var name = $(event.target).find("span").attr("name");
			//$(".alert").alert("닫힘?")
			// $("#scheduleModal").modal();
			// $("#scheduleModal").find("#m_c_title").html(title);
			// $("#scheduleModal").fine("#m_c_name").html(name);
			// $("#scheduleModal").find("#calendarModalBody").html(contents);

			// var title = $(event.target).find("span").attr("title");
			// var contents = $(event.target).find("span").attr("contents");

			//$(".alert").alert("닫힘?")
			$("#scheduleModal").modal();
			$("#scheduleModal").find("#m_c_leader").html(leader);
			$("#scheduleModal").find("#m_c_target").html(target);
			$("#scheduleModal").find("#m_c_date").html(date);
			$("#scheduleModal").find("#m_c_stime").html(stime);
			$("#scheduleModal").find("#m_c_etime").html(etime);
			$("#scheduleModal").find("#m_c_host").html(host);
			$("#scheduleModal").find("#m_c_place").html(place);
			$("#scheduleModal").find("#m_c_staff").html(staff);
			$("#scheduleModal").find("#m_c_tell").html(tell);
			$("#scheduleModal").find("#m_c_subject").html(subject);
			$("#scheduleModal").find("#m_c_contents").html(contents);

			// $("#scheduleModal").find("#modalContents").html(contents);
		},
		clickSearch: function(event) {
			console.log("clicked ")
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



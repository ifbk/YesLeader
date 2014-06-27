define( [ 'backbone', 'model/schedule', 'template!view/schedule', 'template!view/scheduleList', 'style!view/schedule','widget-modal'], 
function( Backbone, Schedule, templateMain, templateList , Modal) {
	return Backbone.View.extend( {

		collection : null,
		el: 'section#schedule',
		region: ["전국", "서울", "인천", "대전", "대구", "부산", "광주", "경기", "충청", "경북", "경남", "전라", "강원", "제주"],
		selectedIndex: 0,
		selectedDay: 0,

		initialize: function() {
			this.collection = new Schedule();
			this.listenTo(this.collection,'reset',this.drawList);
			var d = new Date();
			this.collection.year = d.getFullYear();			
			this.collection.month =  (d.getMonth() +1) <10 ? "0" +(d.getMonth() +1)  : (d.getMonth() +1);
			this.collection.fetch();
			selectedIndex = 0;
			selectedDay = 0;
		},

		render: function() {
			console.log("render : " + this.selectedIndex);
			this.$el.html(templateMain());

			var that = this;
            $("#my-calendar").zabuto_calendar({
            	language: "ko",
	            legend: [], 

                cell_border: true,
                today: false,
                show_days: true,
                weekstartson: 0,

	            action: function () {
					var date = $("#" + this.id).attr("yl_date");
					console.log("render action  ");
	                var coll = that.collection.toJSON();
					var filteredJson = $.grep(coll, function(element, index){
					  
					  if (that.selectedIndex == 0)
					  	return (element.LECTURE_DT == date) && (element.SIDO_NM != that.region[that.selectedIndex]);
					  else	
					  	return (element.LECTURE_DT == date) && (element.SIDO_NM == that.region[that.selectedIndex]);
					});

					if(that.collection.before_dayid != null)
						$("#" + that.collection.before_dayid).html("<div class='day'>" + $("#" + that.collection.before_dayid).text() + "<div>");

					that.collection.before_dayid = this.id;					
					$("#" + this.id).html("<div class='day'><span class='badge badge-event'>" + $("#" + this.id).text() +"</span></div>");
	                that.drawListDay(filteredJson);
	            },
	            action_nav: function () {
					that.collection.year =  $("#" + this.id).attr("year");
					var m = $("#" + this.id).attr("month");	
					that.collection.month = m.length < 2 ? "0" + m  : m;
					that.collection.fetch();

					that.selectedDay = $("#" + this.id).attr("yl_date");
					
	                var coll = that.collection.toJSON();
					var filteredJson = $.grep(coll, function(element, index){
					   console.log(element.LECTURE_DT + " " + that.region[that.selectedIndex]);
					    if (that.selectedIndex == 0)
					   		return (element.LECTURE_DT == d) && (element.SIDO_NM != that.region[that.selectedIndex]);
					   	else
					   		return (element.LECTURE_DT == d) && (element.SIDO_NM == that.region[that.selectedIndex]);				  
					});
					that.drawListDay(filteredJson);
	            }
            });
			
			this.drawList();
			return this;
		},

		events: {
			'click #popSchedule' : 'popSchedule',
			'click #sbtn' : 'popSearch',
			'click #abtn' : 'showAlarm',
			'click #mbtn' : 'showMap',
			'click #cbtn' : 'makeCall',
			'click #allbtn' : 'showAllDate',
			'click #input-radio' : 'drawSearchResult',
			'hidden.bs.modal #searchModal' : 'showSelectedRegion',
		},

		drawList: function(event) {
			$("#regionTitle").html(this.region[this.selectedIndex]);
			var that = this;
			
			//강의 있는 날짜 디자인 바꾸기
			var coll = this.collection.toJSON();
			$('table').children().find("td").each( function(i) {
				console.log("drawList : d" + $("#" + this.id).attr("yl_date"));
				var d = $("#" + this.id).attr("yl_date");
				var f = $.grep(coll, function(element, index){
				    if (that.selectedIndex == 0)
				   		return (element.LECTURE_DT == d) && (element.SIDO_NM != that.region[that.selectedIndex]);
				   	else
				   		return (element.LECTURE_DT == d) && (element.SIDO_NM == that.region[that.selectedIndex]);				  
				});

				//console.log("ff " + f);
				if(f.length > 0)
					$("#" + this.id).css("background","lightgray");
				else
					$("#" + this.id).css("background","white");
			});

			var filteredJson = $.grep(coll, function(element, index){
			   console.log(element.LECTURE_DT + " " + that.region[that.selectedIndex]);
			    if (that.selectedIndex == 0)
			   		return (element.SIDO_NM != that.region[that.selectedIndex]);
			   	else
			   		return (element.SIDO_NM == that.region[that.selectedIndex]);				  
			});
			this.drawListDay(filteredJson);

		},

		drawListDay: function(coll) {
			$("#scheduleList").html(templateList({schedule: coll} ));
		},

		drawCalendar: function(coll) {
			var that = this;
			$('table').children().find("td").each( function(i) {
				console.log("drawCalendar : d" + $("#" + this.id).attr("yl_date"));
				var d = $("#" + this.id).attr("yl_date");
				var f = $.grep(coll, function(element, index){
				    console.log(element.LECTURE_DT + " " + index);
				    console.log(element.SIDO_NM + " " + that.region[that.selectedIndex]);
				    if (that.selectedIndex == 0)
				   		return (element.LECTURE_DT == d) && (element.SIDO_NM != that.region[that.selectedIndex]);
				   	else 
				   		return (element.LECTURE_DT == d) && (element.SIDO_NM == that.region[that.selectedIndex]);				  
				});

				if(f.length > 0)
					$("#" + this.id).css("background","lightgray");
				else
					$("#" + this.id).css("background","white");
			});

		},

		popSchedule: function(event) {
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

			$("#scheduleModal").modal();
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

			console.log("place : "+place);
			$("#scheduleModal").find("#place_map").html('<a href="https://maps.google.com/maps?q='+ place +'"><button type="mbtn" class="btn btn-sm"><span class="glyphicon glyphicon-globe"></span>위치</a></button></a>');
		},

		popSearch: function(event) {
			console.log("search pop");
			$("#searchModal").modal();

		    var container = $("#searchModal").find("#m_c_searchlist")
		    for(var i = 0; i < this.region.length; i++) {
		    	if (i == this.selectedIndex)
		    		container.append('<li class="list-group-item"><label class="input-radio"><input class="radio-input" name="radio1" type="radio" value="'+ i +'" checked><span class="control"></span>' + this.region[i] + '</input></label></li>');
		    	else
		        	container.append('<li class="list-group-item"><label class="input-radio"><input class="radio-input" name="radio1" type="radio" value="'+ i +'"><span class="control"></span>' + this.region[i] + '</input></label></li>');
		    }
		    var that = this;
			$("input:radio[name=radio1]").click(function(){
				console.log("change");
				console.log($(".radio-input:checked").val());
			    that.selectedIndex = $(".radio-input:checked").val();
			});
		    console.log("container = " + container);
		    console.log("popSearch this.selectedIndex: " + this.selectedIndex);
		},

		showSelectedRegion: function(event) {
			$("#regionTitle").html(this.region[this.selectedIndex]);

			this.redraw();
		},

		showAllDate: function(event) {
			this.redraw();
		},

		redraw: function(event) {
			
			var that = this;
			that.selectedDay = 0;
			$("#" + that.collection.before_dayid).html("<div class='day'>" + $("#" + that.collection.before_dayid).text() + "<div>");
			
            var coll = this.collection.toJSON();
            console.log("ss" + this.region[this.selectedIndex]);
			var filteredJson = $.grep(coll, function(element, index){
				if (that.selectedIndex == 0 && that.selectedDay == 0)
					return (element.SIDO_NM != that.region[that.selectedIndex]);
				else if (that.selectedIndex == 0 && that.selectedDay != 0)
					return (element.SIDO_NM != that.region[that.selectedIndex]) && (element.LECTURE_DT == that.selectedDay);
				else if (that.selectedIndex != 0 && that.selectedDay == 0)
					return (element.SIDO_NM == that.region[that.selectedIndex]);
				else 
					return (element.SIDO_NM == that.region[that.selectedIndex]) && (element.LECTURE_DT == that.selectedDay);
			});
			
            this.drawListDay(filteredJson);
            this.drawCalendar(filteredJson);
		},

		showAlarm: function(event) {
		},
		showMap: function(event) {			
		},
		makeCall: function(event) {
		},
	});
} );



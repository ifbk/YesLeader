define( [ 'backbone', 'model/schedule', 'model/survey', 'model/zabuto_calendar', 'view/Calendar', 'template!view/schedule', 'template!view/scheduleList', 'style!view/schedule', 'style!view/zabuto_calendar', 'widget-modal'], //'view/srt-0.9', 
function( Backbone, Schedule, Survey, Calendar, EventCalendar, templateMain, templateList , Modal) {
	return Backbone.View.extend( {

		collection : null,
		survey : null,
		el: 'section#schedule',
		region: ["전국", "서울", "인천", "대전", "대구", "부산", "광주", "경기", "충청", "경북", "경남", "전라", "강원", "제주"],
		selectedIndex: 0,
		selectedDay: 0,
		scheduleDay: "",
		scheduleTitle: "",

		initialize: function() {
			console.log("init called");
			this.collection = new Schedule();
			this.survey = new Survey();
			this.survey.fetch();
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

            	year: that.collection.year,
      			month: that.collection.month,
      			
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
					console.log("that.collection.month : " +that.collection.month);
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
			'click #allbtn' : 'showAllDate',
			'click #input-radio' : 'drawSearchResult',
			'click #surveybtn' : 'showSurvey',
			'hidden.bs.modal #searchModal' : 'showSelectedRegion',
			'hidden.bs.modal #alarmModal' : 'setAlarm',
			'click #sendbtn' : 'sendSurvey'
		},

		drawList: function(event) {
			$("#regionTitle").html(this.region[this.selectedIndex]);
			var that = this;
			
			//강의 있는 날짜 디자인 바꾸기
			var coll = this.collection.toJSON();
			$('table').children().find("td").each( function(i) {
				// console.log("drawList : d" + $("#" + this.id).attr("yl_date"));
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
			   // console.log(element.LECTURE_DT + " " + that.region[that.selectedIndex]);
			    if (that.selectedIndex == 0)
			   		return (element.SIDO_NM != that.region[that.selectedIndex]);
			   	else
			   		return (element.SIDO_NM == that.region[that.selectedIndex]);				  
			});
			this.drawListDay(filteredJson);
		},

		drawListDay: function(coll) {
			$("#scheduleList").html(templateList({schedule: coll}));
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

			var seqNumber = $(event.target).parents("a").data('seq');
			if(seqNumber == null) {
				seqNumber = $(event.target).data('seq');
			}

			var coll = this.collection.toJSON();
			var filter = $.grep(coll, function(element, index){
			    return (element.LECTURE_SEQ == seqNumber)
			});
			var object = filter[0];

			this.scheduleDay = object.LECTURE_DT + object.LECTURE_TIME1 + object.LECTURE_TIME2;

			// 현재날짜를 받아온 후 강의시간 1달이내 설문조사 버튼 심기
			var lectureday = new Date(object.LECTURE_DT.substring(0,4), object.LECTURE_DT.substring(4,6)-1, object.LECTURE_DT.substring(6,8), object.LECTURE_TIME1.substring(0,2), object.LECTURE_TIME1.substring(2,4), 0, 0);
			var today = new Date();
			// lectureday = lectureday + 24*60*60*1000*30;
			if (today >= lectureday && today < lectureday.getTime() + 24*60*60*1000*30) {
				$("#scheduleModal").find("#survey").html('<button type="button" id="surveybtn" class="btn btn-sm"><span class="glyphicon glyphicon-edit"></span>설문조사 참여하기</button></a');
			}
			else {
				$("#scheduleModal").find("#survey").html('');
			}

			console.log("date" + date + "stime" + stime);
			console.log("lectureday : " + lectureday);
			console.log("today : " + today);

			var date = object.LECTURE_DT.substring(0,4) + ". " +  object.LECTURE_DT.substring(4,6) + ". " +  object.LECTURE_DT.substring(6,8) + " ";
			var stime = object.LECTURE_TIME1.substring(0,2) + ":" + object.LECTURE_TIME1.substring(2,4) +  " ~ ";
			var etime = object.LECTURE_TIME2.substring(0,2) + ":" + object.LECTURE_TIME2.substring(2,4);
			var tell = " (" + object.STAFF_TEL +")"; 

			this.scheduleTitle = object.LECTURE_TITLE;

			$("#scheduleModal").modal({"backdrop":false});
			$("#scheduleModal").find("#m_c_leader").html(object.LEADER_NM);
			$("#scheduleModal").find("#m_c_target").html(object.TARGET_PERSON);
			$("#scheduleModal").find("#m_c_date").html(date);
			$("#scheduleModal").find("#m_c_stime").html(stime);
			$("#scheduleModal").find("#m_c_etime").html(etime);
			$("#scheduleModal").find("#m_c_host").html(object.COMPANY_NM);
			$("#scheduleModal").find("#m_c_place").html(object.PLACE_NM);
			$("#scheduleModal").find("#m_c_staff").html(object.STAFF_NM);
			$("#scheduleModal").find("#m_c_tell").html(tell);
			$("#scheduleModal").find("#m_c_subject").html(object.LECTURE_TITLE);
			$("#scheduleModal").find("#m_c_contents").html(object.LECTURE_CONTENT);
			$("#scheduleModal").find("#place_map").html('<a href="https://maps.google.com/maps?q='+ object.PLACE_NM +'"><button type="mbtn" class="btn btn-sm"><span class="glyphicon glyphicon-globe"></span>위치</a></button></a>');
			$("#scheduleModal").find("#tell").html('<a href="tel:'+ tell +'"><button type="button" id="cbtn" class="btn btn-sm"><span class="glyphicon glyphicon-phone-alt"></span>통화</button></a>');
		},

		popSearch: function(event) {
			console.log("search pop");
			$("#searchModal").modal({"backdrop":false,"keyboard":true});

		    var container = $("#searchModal").find("#m_c_searchlist")
		    for(var i = 0; i < this.region.length; i++) {
		    	if (i == this.selectedIndex)
		    		container.append('<li class="list-group-item"><label class="input-radio"><input class="radio-input" name="radio1" type="radio" value="'+ i +'" checked><span class="control"></span>' + this.region[i] + '</input></label></li>');
		    	else
		        	container.append('<li class="list-group-item"><label class="input-radio"><input class="radio-input" name="radio1" type="radio" value="'+ i +'"><span class="control"></span>' + this.region[i] + '</input></label></li>');
		    }
		    var that = this;
			$("input:radio[name=radio1]").click(function(){
				// console.log("change");
				// console.log($(".radio-input:checked").val());
			    that.selectedIndex = $(".radio-input:checked").val();
			    $("#searchModal").modal("hide");
			});
		    // console.log("container = " + container);
		    // console.log("popSearch this.selectedIndex: " + this.selectedIndex);
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
			$("#alarmModal").modal({"backdrop":false,"keyboard":true});

			var that = this;
			$("input:radio[name=radio2]").click(function(){
				console.log("몇일 전? " + $(".radio2-input:checked").val());
			    that.scheduleDay = that.scheduleDay + $(".radio2-input:checked").val();
				$("#alarmModal").modal("hide");
			});
		},

		setAlarm: function(event) {
			console.log("scheduleDay : "+ this.scheduleDay);

			function errorCallback(response) {
				alert("일정 추가에 실패하였습니다.");
			}
			function deletesc() {
				alert("일정을 삭제합니다.");
			}
			function eventAddedCB(event) {
				alert(event.description + " 일정이 추가되었습니다.");

				function successFind(events) {
					// do something with resulting list of objects
					for ( var i in events)
						alert("event.id = " + events[i].id + "\nevent.start = "
								+ events[i].start + "\nevent.description = "
								+ events[i].description + "\nevent.reminder = "
								+ events[i].reminder);
				}
			}

			var year = this.scheduleDay.substring(0,4)*1;
			var month = this.scheduleDay.substring(4,6)*1;
			var day = this.scheduleDay.substring(6,8)*1;
			var stime = this.scheduleDay.substring(8,10)*1;
			var sminute = this.scheduleDay.substring(10,12)*1;
			var etime = this.scheduleDay.substring(12,14)*1;
			var eminute = this.scheduleDay.substring(14,16)*1;
			var before = this.scheduleDay.substring(16,17)*1;

			this.scheduleDay = this.scheduleDay.substring(0,16);

			var d = new Date(year, month-1, day, stime, sminute, 0, 0);
			console.log('강의날 : ' + d); 
			d.setTime(d.getTime() - (24*60*60*1000*before));
			console.log('알람날 : ' + d);

			if(stime*1<10) {stime='0'+stime;} 
		    if(sminute*1<10) {sminute='0'+sminute;}
		    if(etime*1<10) {etime='0'+ etime;} 
		    if(eminute*1 < 10) {eminute='0'+ eminute;}

			var timeString = "("+ before + "일 후 " + stime + ":" + sminute + ")";
			console.log('시간 : ' + timeString);
			var mm = d.getMonth()+1; //1월 = 0
		    var dd = d.getDate();
		  	var yyyy = d.getFullYear();
		    if(dd*1<10) {dd='0'+dd;} 
		    if(mm*1<10) {mm='0'+mm;} 

		    //////////////////// phonegap plugin ////////////////////

		    console.log("시작 : " + yyyy+ '-' + mm + "-" + dd + ' ' + stime + ":" + sminute);
		    console.log('끝 : ' + yyyy+ '-' + mm + "-" + dd + ' ' + etime + ":" + eminute);

		    var title = "test";
            var location = "NYCM";
            var notes = "My notes";
            var startDate = new Date(2014,07,9,0,0,0);
            var endDate = new Date(2014,07,10,0,0,0);

          //   var success = function(message) {
          //   	// $("cal_response_id").text("New Calendar Success: " + JSON.stringify(message));
          //   	alert("New Calendar added : " + title + startDate);
         	// };
          //   var error = function(message) {
          //   	alert("New Calendar Error : " + message);
          //   	//$("cal_response_id").text("New Calendar Error: " + message);
          //   };


		    window.plugins.calendar.createEvent(title, location, notes, startDate, endDate, eventAddedCB, errorCallback);


		    //////////////////// phonegap plugin ////////////////////


		    // cornerstone add event to android only

			// var calEvent = navigator.calendar.createEvent({
			// 	description : this.scheduleTitle,
			// 	summary : this.scheduleTitle + timeString,
			// 	start : yyyy+ '-' + mm + "-" + dd + ' ' + stime + ":" + sminute,
			// 	end : yyyy+ '-' + mm + "-" + dd + ' ' + etime + ":" + eminute,
			// 	recurrence : {
			// 		expires : yyyy+ '-' + mm + "-" + dd + ' ' + stime + ":" + sminute,
			// 		frequency : 'once',
			// 		interval : 1,
			// 	},
			// 	reminder : '-3600000',
			// 	status : 'tentative',
			// 	// location : 'SK bundang'
			// });
			// console.log("navigator.calendar : " + navigator.calendar);
			// navigator.calendar.addEvent(eventAddedCB, errorCallback, calEvent);
		},
 
		// cornerstone android local notification
		/*
		setAlarm: function(event) {
			console.log("scheduleDay : "+ this.scheduleDay);

			if (this.scheduleDay.substring(12,13)*1 == 0) {
				return;
			}

			function addedSuccessCB() {
		    	alert("The localNotification was added");
			}

			// define the error callback
			function errorCB(response) {
			    alert( "The following error: " +  response.code + ", occurred");
			} 

			var year = this.scheduleDay.substring(0,4)*1;
			var month = this.scheduleDay.substring(4,6)*1;
			var day = this.scheduleDay.substring(6,8)*1; 
			var time = this.scheduleDay.substring(8,10)*1;
			var minute = this.scheduleDay.substring(10,12)*1;
			var before = this.scheduleDay.substring(12,13)*1;

			var timeString = "("+ before + "일 후 " + time + ":" + minute + ")";

			console.log("scheduleDay : "+ year + "," + month + "," + day + "," + time+ "," + minute + "," + before);

			// var d = new Date(year, month, day, time, minute);
			// d = d.getTime() - (24*60*60*1000*before);
			// d = d.getTime();

			// console.log("Real Alarm at : "+ d);

		    var current = new Date();
		    var month = current.getMonth()+1;
			var day = current.getDate();
			var year = current.getFullYear();
			console.log("Alarm1 at : " + month + '-' + day + '-' + year);

		    console.log("Alarm at : "+ current.getFullYear() + ","  + current.getTime());
			current.setTime(current.getTime() + 60000);

		    // current = current.getTime() + 60000; //60 seconds from now
		  	console.log("Alarm at : "+ current.getFullYear() + ","  + current.getTime());


		    navigator.localNotification.add(addedSuccessCB, errorCB, 
			{
				date : current,
				message : this.scheduleTitle,
				ticker : timeString,
				repeatDaily : false,
				id : 1
		    });
		},
		*/

		showSurvey: function(event) {
			console.log("showsurvey");
			var coll = this.survey.toJSON();
			console.log(coll[0].QUESTION_TEXT);

		    var container = $("#surveyModal").find("#m_c_surveylist");
		    container.html('<form id="survey">');
		    var i;
		    for(i = 0; i < coll.length; i++) {
		    	if (coll[i].QUESTION_SEQ == "99")
		    	{
		    		container.append('<ul class="list-group list-group-radio"><li class="list-group-item">'+ coll[i].QUESTION_TEXT + '<br/><input type="text" id="answer" name="answer" class="answer"'+coll.length+'"></li></ul>');
		    	} else {
			    	container.append(
			    		'<ul class="list-group list-group-radio"><li class="list-group-item">'+ coll[i].QUESTION_TEXT + 
			    		'<br/><table><tr><td><input type="radio" name="radio'+i+'" style="horigen-align: middle; margin: 0px;"> 1</input></td><td><input type="radio" name="radio'+i+'" value=2 style="vertical-align: middle; margin: 0px;"> 2</input></td><td><input type="radio" name="radio'+i+'" value=3 style="vertical-align: middle; margin: 0px;"> 3</input></td><td><input type="radio" name="radio'+i+'" value=4 style="vertical-align: middle; margin: 0px;"> 4</input></td><td><input type="radio" name="radio'+i+'" value=5 style="vertical-align: middle; margin: 0px;"> 5</input></td></tr></table></li></ul>');
			    		// '<ul class="list-group list-group-radio"><li class="list-group-item">' 
			    		// 	+ coll[i].QUESTION_TEXT + 
			    		// 	'<br /><label class="input-radio"><input class="radio-input" name="radio"'+i+'" type="radio" value="1">1</input></label><label class="input-radio"><input class="radio-input" name="radio"'+i+'" type="radio" value="2">2</input></label><label class="input-radio"><input class="radio-input" name="radio"'+i+'" type="radio" value="3">3</input></label><label class="input-radio"><input class="radio-input" name="radio"'+i+'" type="radio" value="4">4</input></label><label class="input-radio"><input class="radio-input" name="radio"'+i+'" type="radio" value="5">5</input></label><span class="control"></span></li></ul>');
				}
		    }
		   
		    
		    container.append('<ul class="list-group list-group-radio"><li class="list-group-item">응답자소개<table><tr><td class="title">성 명 </td><td class="userInput"><input type="text" id="name" name="answer" class="answer"'+(coll.length*1+1)+'"></td></tr><tr><td class="title">휴대폰 </td><td class="userInput"><input type="text" id="phone" name="answer" class="answer"'+(coll.length*1+2)+'"></td></tr><tr><td class="title">이메일 </td><td class="userInput"><input type="text" id="email" name="answer" class="answer"'+(coll.length*1+3)+'"></td></tr></table></li></ul></form>');

			$("#surveyModal").modal({"backdrop":false,"keyboard":true});

			// var that = this;
			// $("input:radio[name=radio2]").click(function(){
			// 	console.log("몇일전? " + $(".radio2-input:checked").val());
			//     that.scheduleDay = that.scheduleDay + $(".radio2-input:checked").val();
				
			// 	$("#alarmModal").modal("hide");
			//     // that.setAlarm();
			// });
			
			// for(i = 0; i < coll.length; i++) {
			// 	$("input:radio[name=radio"+i+"]").click(function(){
			// 		console.log(i + $(".radio"+i+"-input:checked").val());
			// 	    that.scheduleDay = that.scheduleDay + $(".radio2-input:checked").val();
			// 		$("#alarmModal").modal("hide");
			// 	});
			// }
		},

		sendSurvey: function(event) {
			var coll = this.survey.toJSON();
			var name = document.getElementById("name");
			var phone = document.getElementById("phone");
			var email = document.getElementById("email");
			var answer = document.getElementById("answer");
			console.log("name : "+name.value);
			console.log("phone : "+phone.value);
			console.log("email : "+email.value);

			

			var surveyURL = "http://192.168.0.44:8080/YesLeaderWebService/YesLeaderService.bo?method=SetQuestion&name="+name.value+"&phone="+phone.value+"&email="+email.value+"&lecture_seq=1";
			// var result = [{"question_seq" : "1", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "2", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "3", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "4", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "5", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "6", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "7", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "8", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "9", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "10", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "11", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "12", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "13", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "14", "answer_seq" : "1", "answer_text" : ""}
			// 			 ,{"question_seq" : "99", "answer_seq" : "1", "answer_text" : "hey"}];
			var result = new Array();
			for(i = 0; i < coll.length; i++) {
		    	if (coll[i].QUESTION_SEQ == "99")
		    	{
		    		result.push({question_seq: coll[i].QUESTION_SEQ, answer_seq:"1", answer_text:answer.value});
		    	} else {
		    		var radios = document.getElementsByName("radio"+i);
		    		window.rdValue = null;
		            for (var j = 0; j < radios.length; j++) {
		            	console.log("i :" + i + ",j : "+ j);
		                var aRadio = radios[j];
		                if (aRadio.checked) {
		                    var foundCheckedRadio = aRadio;
		                    rdValue = foundCheckedRadio.value;
		                    break;
		                }
		                else 
		                	rdValue = "";
		            }
		    		result.push({question_seq: coll[i].QUESTION_SEQ, answer_seq:rdValue, answer_text:""});
				}
		    }
		    console.log(result);

			$.ajax({
				type: 'POST',
				url: surveyURL,
				dateType: 'json',
				data: JSON.stringify(result),
				contentType: "application/json",

				success: function(data) {
					console.log(data + "survey sended");
				},
				error: function(jqXHR, textStatus, errorThrown)  {
					console.log("textStatus: " + textStatus);
					console.log("jqXHR: " + jqXHR);
					console.log("errorThrown: " + errorThrown);
					alert("jqXHR= " + jqXHR + ", textStatus= " + textStatus + ", errorThrown= " + errorThrown);
				}
			})
		}
	});
});



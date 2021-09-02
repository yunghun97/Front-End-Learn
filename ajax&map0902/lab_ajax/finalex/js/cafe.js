$(document).ready(function() {
	
	var root = "/lab_ajax";
	
//	인기메뉴 얻기.
	$.ajax({
		url: "./data/popmenu.json",
		type: "GET",
		dataType : "json",
		success: function(menus) {
			makeMenu(menus, ".popular_menu_ul");
		}
	});
	
	/*
	getPopularMenu();
	
	setInterval(getPopularMenu, 10000);
	
	function getPopularMenu() {
		$.ajax({
			url: root + "/popular",
			type: "GET",
			dataType : "json",
			success: function(menus) {
				makeMenu(menus, ".popular_menu_ul");
			}
		});
	}
	*/
	
//	신메뉴 얻기.
	$.ajax({
		url: "./data/newmenu.json",
		type: "GET",
		dataType : "json",
		success: function(menus) {
			makeMenu(menus, ".new_menu_ul");
		}
	});
	
	function makeMenu(menus, classname) {
		var list = $(classname).empty();
		$(menus).each(function(i, menu) {
			var priceDiv = $("<div></div>").addClass("menu_item_info").text(menu.pname + "(" + menu.price + "원)");
			var img = $("<img/>").attr("src", "img/coffee/" + menu.picture).attr("alt", menu.pname);
			var imgDiv = $("<div></div>").addClass("menu_item_img").append(img);
			var menuDiv = $("<div></div>").addClass("menu_item").attr("pname", menu.pname).append(imgDiv).append(priceDiv);
			var menuLi = $("<li></li>").addClass("popular_menu_li").append(menuDiv);
			$(list).append(menuLi);
		});
	}
	
//	인기메뉴 3초마다 이동
//	setInterval(function() {
//		$(".popular_menu_li").first().appendTo(".popular_menu_ul");
//	}, 3000);
	
//	신메뉴이동
	/*
	var interval;
	
	function play() {
		interval = setInterval(function() {
			next();
		}, 3000);
	}
	
	function stop() {
		clearInterval(interval);
	}
	
	var images = $(".new_menu_ul");
	function next() {
		images.stop(false, true).animate({left : "0px"}, 400, function() {
			$(this).children(":first").insertAfter($(this).children(":last")); //last 뒤에 first 삽입.
			$(this).css("left", "0");
		});
	}
	
	images.children().hover(function() {
		stop();
	}, function() {
		play();
	});
	
	play();
	*/
	
//	메뉴검색 start.
	var firstKey = '';
	var checkFirst = true;
	var checkSendKeyword = false;
	var lastKeyword = '';
	$("#search").keyup(function(event) {
		var keyword = $(this).val().trim();
		
		if(event.keyCode == 13) { // 엔터를 눌렀다면..
			search(keyword); // 검색어 서버에 전달.
			return;
		}
		
		if(keyword.length == 0) {
			checkFirst = true;
	 	}
		
		if(checkFirst) {
			firstKey = 'first';
			checkSendKeyword = true;
		} else {
			firstKey = '';
		}
		checkFirst = false;
		sendKeyword();
	});
	
	$("#search").focusout(function() {
		//hide();
	});
	
	function sendKeyword() {
		if(!checkSendKeyword)
			return;
		
		var keyword = $("#search").val().trim();
		if(keyword == '') {
			checkFirst = true;
			lastKeyword = '';
			hide();
		} else if(keyword != lastKeyword) {
			lastKeyword = keyword;
			if(lastKeyword != '') {
				var param = {'keyword' : lastKeyword, 'isFirst' : firstKey};
				$.ajax({
					url: root + "/autokeyword",
					type: "GET",
					data: param,
					success: function(data) {
						show(data);
					}
				});
			} else {
				hide();
			}
		}
	}
	
	function show(data) {
		var result = data.split("|");
		if(result[0] != 0) {
			$("#header_nav_search_result").css("left", $("#search").position().left).css("top", $("#search").position().top - 29);
			$("#header_nav_search_result").show();
			$("#header_nav_search_result").empty();
			$(result[1].split(",")).each(function(i, word) {
				$("#header_nav_search_result").append($('<div class="header_nav_search_result_keyword">' + word + '</div>'));
			});
			var regExp = new RegExp(lastKeyword, "gi");
			$("#header_nav_search_result").html($("#header_nav_search_result").html().replace(regExp, '<span class="result_color">' + lastKeyword + '</span>'));
		}
	}
	
	function hide() {
		$("#header_nav_search_result").empty();
		$("#header_nav_search_result").hide();
	}
// 	메뉴검색 end
	
//	검색어 선택
	$(document).on("click", ".header_nav_search_result_keyword", function() {
		$("#search").val($(this).text());	
		hide();
	});
	
	$("#searchBtn").click(function() {
		search($("#search").val());
	});
	
	function search(keyword) {
		$.ajax({
			url: root + "/search",
			type: "GET",
			data: {"keyword" : keyword},
			success: function() {
				$("#search").val('');
			}
		});
	}
	
//	이미지 클릭시 cnt 증가
	$(document).on("click", ".menu_item", function() {
		search($(this).attr("pname"));
	});
	
	
//	로그인
	$("#loginBtn").click(function() {
		var userid = prompt("아이디입력", "");
		if(userid.length == 0) {
			alert("아이디 입력!!!");
			return;
		}
		var userpass = prompt("비밀번호입력", "");
		if(userpass.length == 0) {
			alert("비밀번호 입력!!!");
			return;
		}
		
		$.ajax({
			url: "./data/users.xml",
			type: "POST",
			cache: false,
//			data: { "userid" : suerid, "userpwd" : userpass},
			dataType: "xml",
			success: function(data) {
//				alert(data);
				var login = false;
				var username = '';
				var userpic = '';
				$(data).find('user').each(function() {
					if(userid == $(this).attr("id") && userpass == $(this).find("passwd").text()) {
						username = $(this).find("username").text();
						userpic = $(this).find("picture").text();
						login = true;
						return false; // break;  * return true; continue
					}
				});
				
				if(login) {
					$("#profile_img").attr("src", "img/" + userpic);
					$("#header_nav_confirmoff").css("display", "none");
					$("#header_nav_confirmon").css("display", "block");
					$("#profile_msg").html("<b>" + username + "</b>님 안녕하세요.");
				} else {
					alert("아이디 또는 비밀번호 확인!!!");
				}
			}
		});
	});
	
	//로그아웃
	$("#logoutBtn").click(function() {
		$("#profile_img").attr("src", "img/profile.png");
		$("#header_nav_confirmoff").css("display", "block");
		$("#header_nav_confirmon").css("display", "none");
	});
	
	//왼쪽메뉴
	//전국매장
	var storeView = true;
	$("#store_display").click(function() {
		if(storeView) {
			$(".store_item_sub").slideDown(300);
			$("#store_display").text("전국매장접기");
			storeView = false;
		} else {
			$(".store_item_sub").slideUp(600);
			$("#store_display").text("전국매장펼치기");
			storeView = true;
		}
	});
	
	/*
	$(".store_display_on").click(function() {
		$(".store_item_sub").slideDown(300);
		$(this).css("display", "none");
		$(".store_display_off").css("display", "block");
	});
	
	$(".store_display_off").click(function() {
		$(".store_item_sub").slideUp(600);
		$(this).css("display", "none");
		$(".store_display_on").css("display", "block");
	});
	*/
	
	//지역매장
	$(".store_area").click(function() {
		$(this).siblings("div.store_item_sub").slideDown(300).parent().siblings("li").children("div.store_item_sub").slideUp(500);
	});
	
	//투표하기
	$("#voteBtn").click(function() {
		var sel_menu = $("input[name='vote_answer']:checked").val();
		alert(sel_menu + "를 선택했습니다.");
	});
	
	//투표만들기
	$("#voteMakeBtn").click(function() {
		window.open("pollmake.html", "poll", "width=420,height=300,top=300,left=400");
	});
	
	$("#addAnswerBtn").click(function() {
		var div = $('<div class="poll_answer_item">').append('<input type="text" name="answer">').append('<button type="button" class="minus_btn button">삭제</button>');
		$("#poll_answer_list").append(div);
	});
	
	$(document).on("click", ".minus_btn", function() {
		$(this).parent(".poll_answer_item").remove();
	});
	
	$("#pollMakeBtn").click(function() {
		if(!($("#question").val())) {
			alert("질문 내용 입력!!!");
			return;
		}
		
		var flag = true;
		$("input[name='answer']").each(function(i, element) {
			if(!($(this).val())) {
				alert("답변 항목 입력!!!");
				flag = false;
			}
		});
		
		if(flag) {
			alert("투표를 생성합니다.");
			self.close();
		}
	});

});
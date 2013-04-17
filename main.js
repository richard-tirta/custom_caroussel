// JavaScript Document


(function ($) { 

	
	/*Global Variables*/
	var isIpad = /ipad/i.test(navigator.userAgent.toLowerCase());

	/*Carrousel Variable*/
	var imageIndex = 0,
		imgCount,
		currentImg,						// Current image
		currentCaption,
		imageWidth = 1366,
		loopTimer = null;


	/*Carrousel Functions*/

	function initialSlide(n) {

		currentImg = $("#slide-image>div").eq(imageIndex);
		currentCaption = $("#slide-caption>div").eq(imageIndex);

		$("#slide-image>div").eq(imageIndex).siblings().css("left", imageWidth + "px");
		$("#slide-caption>div").eq(imageIndex).siblings().css("left", imageWidth + "px");
		
		imageIndex = n;
	}

	function showSlide(n) {
		var x = -imageWidth;						//variable if prev button clicked
		if (n > imageIndex) {x = imageWidth; }		//variable if next button clicked

		$(currentImg).stop().animate({left: -x + "px"}, 800, "swing");
		currentImg = $("#slide-image>div").eq(n).css("left", x + "px").stop().animate({left: "0"}, 800, "swing");

		$(currentCaption).stop().animate({left: -x + "px"}, 800, "swing");
		currentCaption = $("#slide-caption>div").eq(n).css("left", x + "px").stop().animate({left: "0"}, 800, "swing");

		$(".caption-wrapper").eq(n).hide().delay(500).fadeIn(800);

		imageIndex = n;
	}

	function prevLoop(n) {							//Loop the last image as previous
		var x = -imageWidth;

		$(currentImg).stop().animate({left: -x + "px"}, 800, "swing");
		currentImg = $("#slide-image>div").eq(n).css("left", x + "px").stop().animate({left: "0"}, 800, "swing");

		$(currentCaption).stop().animate({left: -x + "px"}, 800, "swing");
		currentCaption = $("#slide-caption>div").eq(n).css("left", x + "px").stop().animate({left: "0"}, 800, "swing");

		$(".caption-wrapper").eq(n).hide().delay(500).fadeIn(800);

		imageIndex = n;
	}

	function nextLoop(n) {							//Loop the first image as next			
		var x = imageWidth;
		
		$(currentImg).stop().animate({left: -x + "px"}, 800, "swing");
		currentImg = $("#slide-image>div").eq(n).css("left", x + "px").stop().animate({left: "0"}, 800, "swing");

		$(currentCaption).stop().animate({left: -x + "px"}, 800, "swing");
		currentCaption = $("#slide-caption>div").eq(n).css("left", x + "px").stop().animate({left: "0"}, 800, "swing");

		$(".caption-wrapper").eq(n).hide().delay(500).fadeIn(800);

		imageIndex = n;
	}

	function nextSlide() {
		var n = imageIndex + 1;
		if (n == imgCount) {
			n = 0;
			nextLoop(n);
		} else {
			showSlide(n);
		}
	}

	function prevSlide() {
		var n = imageIndex - 1;
		if (n < 0) {
			n = imgCount - 1;
			prevLoop(n);
		} else {
			showSlide(n);
		}
	}

	function autoSlide(){
		if (!isIpad) {
			clearInterval(loopTimer);
			loopTimer = setInterval( function() {
				nextSlide();
			}, 10000 );
		}
	}


	/*Media Responsive Function*/

	function mediaRespond() {
		var windowWidth = $(window).innerWidth();
		var windowHeight = $(window).innerHeight();
		var imageHeight;
		var gdc = windowWidth - windowHeight;
		var aspectRatio = (windowWidth/gdc)/(windowHeight/gdc);
		var calculateWidth = false;

		if (aspectRatio >= 1.25 && aspectRatio <= 1.6){
			calculateWidth = true;
		}
		
		if(window.innerHeight > window.innerWidth || calculateWidth == true){
			if (windowWidth >700 ) {
				$("#wrapper").css("width", windowWidth);
				$("#slide-show").css("width", windowWidth);	
				$("#slide-image").css("width", windowWidth);
				imageHeight = $("#slide-image>div>img").innerHeight();
				imageWidth = $("#slide-image>div>img").innerWidth();
				
				$("#slide-show").css("height",imageHeight + 1);
				//$("#debug").text("calculating by width")
			}
				//$("#debug2").text("width calculated")
		} else {
			if (windowHeight > 500) {
				//imageWidth = ((windowHeight)*(1024/655))-15;
				imageWidth = ((windowHeight)*(1366/768))-15;
				$("#wrapper").css("width", imageWidth);	
				$("#slide-show").css("width", imageWidth );	
				$("#slide-image").css("width", imageWidth);
				imageHeight = $("#slide-image>div>img").innerHeight();

				$("#slide-show").css("height",imageHeight + 1);
				//$("#debug").text("calculating by height")
			}
				//$("#debug2").text("height calculated")
		}
		
		initialSlide(imageIndex);
	}



	$(document).ready(function () {
		
		/*Initialize Image Carrousel Functions*/

		imgCount = $("#slide-image>div").length;
		initialSlide(imageIndex);
		autoSlide();
		
		$(".slide-next").click(nextSlide);
		$(".slide-prev").click(prevSlide);

		if (isIpad) {
			$("#slide-image").swipe( {
				swipeLeft:function(event, direction, distance, duration, fingerCount) {
				nextSlide();	
				},
				swipeRight:function(event, direction, distance, duration, fingerCount) {
				prevSlide();	
				}
			});
		}
		
		$("#slide-show").hover(
			function () {
			clearInterval(loopTimer);
			},
			function () {
			autoSlide();
			}
		);


	mediaRespond();

	});									// Closing Document Ready Function

	$(window).load(function () {
		
	/*Initiate Responsive Media Functions*/

		$(window).resize(function () {
			mediaRespond();
		});

		mediaRespond();
	});									// Closing Window Load Function
})(jQuery)

// JavaScript Document
var APP = (function () {

	// constructor
	var app = {};

	app.carousselInit = function(){
		var imgCount = $("#slide-image>div").length,
			loopTimer = null,
			windowWidth = $(window).innerWidth(),
			imageWidth = windowWidth,
			imageIndex = 0,
			currentImg = undefined,
			currentCaption = undefined,
			imageHeight = undefined;

		var initialSlide = function(n){
			currentImg = $("#slide-image>div").eq(imageIndex);
			currentCaption = $("#slide-caption>div").eq(imageIndex);

			$("#slide-image>div").eq(imageIndex).siblings().css("left", imageWidth + "px");
			$("#slide-caption>div").eq(imageIndex).siblings().css("left", imageWidth + "px");
			
			imageIndex = n;
		}

		var moveSlide = function(n,x){

			$(currentImg).stop().animate({left: -x + "px"}, 800, "swing");
			currentImg = $("#slide-image>div").eq(n).css("left", x + "px").stop().animate({left: "0"}, 800, "swing");

			$(currentCaption).stop().animate({left: -x + "px"}, 800, "swing");
			currentCaption = $("#slide-caption>div").eq(n).css("left", x + "px").stop().animate({left: "0"}, 800, "swing");

			$(".caption-wrapper").eq(n).hide().delay(500).fadeIn(800);

			imageIndex = n;
		}

		var showSlide = function(n){
			var x = -imageWidth;						//variable if prev button clicked
			if (n > imageIndex) {x = imageWidth; }		//variable if next button clicked

			moveSlide(n,x);
			
		}

		var prevLoop = function(n){
			var x = -imageWidth;

			moveSlide(n,x);
		}

		var nextLoop = function(n){
			var x = imageWidth;
		
			moveSlide(n,x);
		}

		var nextSlide = function(){
			var n = imageIndex + 1;
			if (n == imgCount) {
				n = 0;
				nextLoop(n);
			} else {
				showSlide(n);
			}
		}

		var prevSlide = function(){
			var n = imageIndex - 1;
			if (n < 0) {
				n = imgCount - 1;
				prevLoop(n);
			} else {
				showSlide(n);
			}
		}

		var autoSlide = function(){
			clearInterval(loopTimer);

			loopTimer = setInterval( function() {
				nextSlide();
			}, 10000 );
		}

		var mediaRespond = function(){
			windowWidth = $(window).innerWidth();
			imageWidth  = windowWidth;
			imageHeight = (windowWidth*20)/33;

			$("#slide-show").css("width", windowWidth );
			$("#slide-show").css("height", imageHeight );

			initialSlide(imageIndex);
		}
		
		
		mediaRespond();
		autoSlide();
		
		$(".slide-next").click(nextSlide);
		$(".slide-prev").click(prevSlide);
	
		$("#slide-show").hover(
			function () {
				clearInterval(loopTimer);
			},
			function () {
				autoSlide();
			}
		);

		$(window).resize(function () {
				mediaRespond();
		});

	}()

	return app;
}());
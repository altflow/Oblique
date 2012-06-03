(function(){
	var setUp = function(){
		/*:DOC += <div id="deck">
					<div id="card"></div>
				  </div>
		*/
		this.obliqueData   = Oblique.Data.slice(0);
		this.lineJustify   = $.fn.lineJustify;
		this.swipeListener = $.fn.swipeListener;
	};
	
	var tearDown = function(){
		$("#deck").remove();
		Oblique.Data       = this.obliqueData.slice(0);
		$.fn.lineJustify   = this.lineJustify;
		$.fn.swipeListener = this.swipeListener;
	};
	
	TestCase("ObliqueStrategyCardTest", {
		setUp: setUp,
		tearDown: tearDown,
		
		"test should be object": function(){
			assertObject(Oblique.Card);
		},
		
		"test should have init method": function(){
			assertFunction(Oblique.Card.init);
		},
		
		"test should call swipeListener when init called": function(){
			$.fn.swipeListener = stubFn();
			
			Oblique.Card.init();
			
			assertTrue($.fn.swipeListener.called);
		},
		
		"test should set width and height of card by init": function(){
			$("#deck").height("480px");
			
			Oblique.Card.init();
			
			assertEquals(320*0.8, $("#card").width());
		},
		
		"test should have isOpen method": function(){
			assertFunction(Oblique.Card.isOpen);
		},
		
		"test should isOpen returns boolean": function(){
			assertBoolean(Oblique.Card.isOpen());
		},
		
		"test should have draw method": function(){
			assertFunction(Oblique.Card.draw);
		},
		
		"test should add class name opened when draw called": function(){
			Oblique.Card.draw();
			
			assertClassName("opened", document.getElementById("card"));
		}
	});
	
	TestCase("ObliqueStrategyCardContentsTest", {
		setUp: setUp,
		tearDown: tearDown,
		
		"test should call jquery.lineJustify when card is drawn": function(){
			$.fn.lineJustify = stubFn();
			
			Oblique.Card.draw();
			
			assertTrue($.fn.lineJustify.called);
		},
		
		"test should add text in span tag when draw called": function(){
			Oblique.Data = ["Abandon \n normal \n instruments"];
			
			Oblique.Card.draw();
			
			var element = $("#lj-line0");
			assertEquals("Abandon", element.text());
			assertTagName("span", element[0]);
		},
		
		"test should set font-family for each line": function(){
			Oblique.Data = ["Abandon \n normal \n instruments"];
			
			Oblique.Card.draw();
			
			var font1 = $("#lj-line0").css("font-family");
			var font2 = $("#lj-line1").css("font-family");
			var font3 = $("#lj-line2").css("font-family");
			assertNotEquals("", font1);
			assertNotEquals("", font2);
			assertNotEquals("", font3);
		},
		
		"test should set different font-family for each line": function(){
			Oblique.Data = ["Abandon \n normal \n instruments"];
			
			Oblique.Card.draw();
			
			var font1 = $("#lj-line0").css("font-family");
			var font2 = $("#lj-line1").css("font-family");
			var font3 = $("#lj-line2").css("font-family");
			assertNotSame(font1, font2);
			assertNotSame(font2, font3);
			assertNotSame(font3, font1);
		},
		
		"test should set class name defining color scheme to the card": function(){
			Oblique.Data = ["Accept \n advice"];
			
			Oblique.Card.draw();
			
			var classNames = document.getElementById("card").className;
			assertMatch(/scheme-.+/, classNames);
		}
	});
	
	TestCase("ObliqueStrategyCardSwipeTest", {
		setUp: setUp,
		tearDown: tearDown,
		
		"test should have onSwipe method": function(){
			assertFunction(Oblique.Card.onSwipe);
		},
		
		"test should hide card when opened card is swiped up": function(){
			$("#card").addClass("opened");
			
			Oblique.Card.onSwipe("up");
			
			assertFalse($("#card").hasClass("opened"));
		},
		
		"test should hide card when opened card is swiped down": function(){
			$("#card").addClass("opened");
			
			Oblique.Card.onSwipe("down");
			
			assertFalse($("#card").hasClass("opened"));			
		},
		
		"test should hide card when opened card is swiped left": function(){
			$("#card").addClass("opened");
			
			Oblique.Card.onSwipe("left");
			
			assertFalse($("#card").hasClass("opened"));
		},
		
		"test should hide card when opened card is swiped right": function(){
			$("#card").addClass("opened");
			
			Oblique.Card.onSwipe("right");
			
			assertFalse($("#card").hasClass("opened"));
		},
		
		"test should do nothing if onSwipe called with invalid argument": function(){
			$("#card").addClass("opened");
			
			Oblique.Card.onSwipe();
			
			assertClassName("opened", document.getElementById("card"));
		},
		
		"test should add class name of direction for animation": function(){
			$("#card").addClass("opened");
			
			Oblique.Card.onSwipe("up");
			
			assertClassName("up", document.getElementById("card"));
		}
	});
}());
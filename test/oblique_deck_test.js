(function(){
	TestCase("ObliqueStrategiesDeckTest", {
		setUp: function(){
			/*:DOC += <div id="deck">
					      <div id="card"></div>
					  </div>
			*/
			this.obliqueCard = Oblique.Card;
			Oblique.Deck.init();
		},
		
		tearDown: function(){
			Oblique.Card = this.obliqueCard;
			$("#deck").remove();
		},
		
		"test should be object": function(){
			assertObject(Oblique.Deck);
		},
		
		"test should call draw method of Card when #deck is clicked": function(){
			Oblique.Card.draw = stubFn();
			
			$("#deck").trigger("click");
			
			assertTrue(Oblique.Card.draw.called);
		},
		
		"test should not call method to show card when a card is displayed": function(){
			Oblique.Card.draw = stubFn();
			$("#card").addClass("opened");
			
			$("#deck").trigger("click");
			
			assertFalse(Oblique.Card.draw.called);
		}
	});
}());
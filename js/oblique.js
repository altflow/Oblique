/**
 * dispatch required function when DOM ready
 */
$(document).ready(function(){
	setTimeout(scrollTo(0,1), 500); // scroll to hide address bar
	
	$(applicationCache).bind("updateready", function(oEvent){
		applicationCache.swapCache();
	});
	
	Oblique.Deck.init();
	Oblique.Card.init();
});
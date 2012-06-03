/**
 * Deck object
 * @class Deck
 * @requires jQuery
 * @namespace Oblique
 */

if (!Oblique || typeof Oblique != "object") {
	var Oblique = {};	
}

Oblique.Deck = function(){
	/**
	 * handle event on click the deck
	 * @method onClick
	 * @public
	 * @return {void}
	 */
	var onClick = function(){
		if ( Oblique.Card.isOpen() ) {
			return;
		}
		Oblique.Card.draw();
	};
	
	/**
	 * initialization with assigning event handler
	 * @method init
	 * @public
	 * @return {void}
	 */
	var init = function(){
		$("#deck").bind("click", onClick);
	};
	
	return {
		init: init
	};
}();
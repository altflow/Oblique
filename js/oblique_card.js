/**
 * Card object
 * @class Card
 * @requires Oblique.Data, jQuery, jquery.lineJustify, jquery.swipeListener
 * @namespace Oblique
 */

if (!Oblique || typeof Oblique != "object") {
	var Oblique = {};	
}

Oblique.Card = function(){
	var aFonts   = [
		"'Times New Roman'",
		"'Courier New'",
		"Georgia",
		"Arial",
		"Optima",
		"'American Typewriter'",
		"'Heiti TC'"
	];

	var aColorSchemes = [
		"59477E",
		"6B9E67",
		"E71669",
		"D09C2D",
		"0B7865",
		"FF8000",
		"000000",
		"9644A2",
		"D6D448",
		"F52F4B"
	];
	
	/**
	 * returns random fonts
	 * @method getFonts
	 * @private
	 * @param {number} Num of fonts
	 * @return {array} FontAry
	 */
	var getFonts = function(nFonts) {
		var aFontTmp = aFonts.slice(0);
		var aFontAry = [];
		var nRndIdx  = 0;
		
		nFonts = nFonts <= aFonts.length ? nFonts : aFonts.length;
		
		for (var i=0; i < nFonts; i++) {
			nRndIdx = Math.floor( Math.random() * aFontTmp.length )
			aFontAry.push( aFontTmp[nRndIdx] );
			aFontTmp.splice(nRndIdx,1)
		}
		
		return aFontAry;
	};	
	
	/**
	 * set color and line-height
	 * @method setStyle
	 * @private
	 * @param {object} TargetEl (jQuery object)
	 * @return {void}
	 */
	var setStyle = function(oTargetEl) {
		var nRndIdx      = Math.floor( Math.random() * aColorSchemes.length )
		var sColorScheme = aColorSchemes[nRndIdx];
		
		oTargetEl.addClass("scheme-" + sColorScheme);
		oTargetEl.children().each(function(index, value){
			var oLineEl = $(value)
			if (!oLineEl.text().match(/[gjpy]/)) {
				oLineEl.css("line-height","90%");
			}
		});
	};
	
	/**
	 * remove class name when animation ends
	 * @method resetAnim
	 * @private
	 * @return {void}
	 */
	var resetAnim = function(){
		$("#card").removeClass("up down left right");
	};
	
	/**
	 * adds class name open to the card element
	 * @method draw
	 * @public
	 * @return {void}
	 */
	var draw = function(){
		var sText = Oblique.Data[ Math.floor(Math.random() * Oblique.Data.length) ];
		var oCard = $("#card");
		
		oCard.text(sText).lineJustify( getFonts(3) );
		setStyle(oCard);
		oCard.addClass("opened");
	};
	
	/**
	 * initialization. assigning event listener for swiping card
	 * @method init
	 * @public
	 * @return {void}
	 */
	var init = function(){
		var oDeckEl = $("#deck");
		var nHeight = oDeckEl.height() * 0.8;
		var nWidth  = nHeight / 1.5;
		var oCardEl = $("#card");
		
		oCardEl.width(nWidth).height(nHeight);
		
		oCardEl.swipeListener({
			swipeUp: function() { onSwipe("up"); },
			swipeDown: function() { onSwipe("down"); },
			swipeLeft: function() { onSwipe("left"); },
			swipeRight: function() { onSwipe("right"); }
		});
		
		oCardEl.click(function(event){
			event.stopPropagation();
		});
	};
	
	/**
	 * return true when a card is opened
	 * @method isOpen
	 * @public
	 * @returns {boolean}
	 */
	var isOpen = function(){
		return $("#card").hasClass("opened");
	};
	
	/**
	 * hide card when a user swipe up/down/left/right on the card
	 * @method onSwipe
	 * @public
	 * @param {string} Direction
	 * @return {void}
	 */
	var onSwipe = function(sDirection) {
		if (typeof sDirection != "string" || !sDirection.match(/up|down|left|right/)) {
			return;
		}
		oCardEl = $("#card");
		oCardEl.one("webkitTransitionEnd", resetAnim);
		oCardEl.removeClass().addClass(sDirection);
	};
	
	return {
		draw: draw,
		init: init,
		isOpen: isOpen,
		onSwipe: onSwipe
	};
}();
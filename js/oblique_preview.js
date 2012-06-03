/**
 * Oblique Strategy previewer for tweaking card design
 */

if (!Oblique || typeof Oblique != "object") {
	var Oblique = {};	
}

/**
 * display Oblique.Data in container elements
 * @class Preview
 * @requires jQuery, jquery.lineJustify
 */
Oblique.Preview = function(){
	var oCardEl  = $(".card");
	var nCurrent = 0;
	var nOffset  = 0;
	var aFonts   = [
		"'Times New Roman'",
		"'Courier New'",
		"Georgia",
		"Arial",
		"Optima",
		"'American Typewriter'",
		"'Heiti TC'"
	];
	// color schemes are generatd by http://slayeroffice.com/tools/color_palette/
	// parmalink: http://slayeroffice.com/tools/color_palette/?hex=[base color hex]
	var aColorSchemes = [
		{"base":"#59477E", "bg":"#D5D1DF","col1":"#83759F", "col2":"#ADA4BF"},
		{"base":"#6B9E67", "bg":"#DAE7D9","col1":"#90B78D", "col2":"#B6CFB4"},
		{"base":"#E71669", "bg":"#F9C5D9","col1":"#ED518F", "col2":"#F48BB5"},
		{"base":"#D09C2D", "bg":"#F3E6CA","col1":"#DCB562", "col2":"#E8CE97"},
		{"base":"#0B7865", "bg":"#C2DDD8","col1":"#489A8C", "col2":"#86BCB3"},
		{"base":"#FF8000", "bg":"#FFDFBF","col1":"#FFA040", "col2":"#FFC080"},
		{"base":"#000000", "bg":"#BFBFBF","col1":"#404040", "col2":"#808080"},
		{"base":"#9644A2", "bg":"#E5D0E8","col1":"#B173BA", "col2":"#CBA2D1"},
		{"base":"#D6D448", "bg":"#F5F4D1","col1":"#E1DF76", "col2":"#EBEAA4"},
		{"base":"#F52F4B", "bg":"#FCCBD2","col1":"#F86378", "col2":"#FB98A6"}
	];
	
	/**
	 * set color and line-height
	 * @method setStyle
	 * @param {object} Element
	 * @return {void}
	 */
	var setStyle = function(oElement) {
		var nRndIdx      = Math.floor( Math.random() * aColorSchemes.length )
		var oColorScheme = aColorSchemes[nRndIdx];
		var oTargetEl    = $(oElement);
		
		oTargetEl.css({"background": oColorScheme["bg"], "color":oColorScheme["base"]});
		oTargetEl.children().each(function(index, value){
			var oLineEl = $(value)
			if (!oLineEl.text().match(/[gjpy]/)) {
				oLineEl.css("line-height","90%");
			}
		});
	};
	
	/**
	 * returns random fonts
	 * @method getFonts
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
	 * load cards to the container elements
	 * @method loadCards
	 * @param {number} Offset
	 * @param {number} Num of cards
	 * @return {void}
	 */
	var loadCards = function(nOffset, nNum) {
		nNum     = nNum || 3;
		nCurrent = nOffset;
		
		for (var i=nOffset, l=nOffset+nNum; i<l; i++) {
			var oTargetEl = oCardEl[i%3];
			
			if (!Oblique.Data[i]) {
				$(oTargetEl).text( "(no content)" );
				continue;
			}
			
			$(oTargetEl).text( Oblique.Data[i] ).lineJustify( getFonts(3) );
			setStyle(oTargetEl);
		}
	}
	
	/**
	 * initialization
	 * @method init
	 * @return {void}
	 */
	var init = function() {
		// set width and height to the elements
		var width = $(".four").width();
		oCardEl.width( width );
		oCardEl.height(width * 1.5);
		
		// assign event listener for left and right column
		$("#left").click(function(){
			nOffset = nCurrent >= 3 ? nCurrent - 3 : 0;
			loadCards(nOffset, 3);
		});
		
		$("#right").click(function(){
			nOffset = nCurrent+3 <= Oblique.Data.length ? nCurrent+3 : nCurrent;
			loadCards(nOffset, 3);
		});
		
		loadCards(0,3);
	};
		
	return {
		loadCards: loadCards,
		init: init
	};
}();

$(document).ready(function(){
	Oblique.Preview.init();
});
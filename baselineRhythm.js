jQuery.fn.countLines = function(options) {

  //Merge in all provided options with the defaults
  var settings = $.extend({
    'class-prefix': 'lines-',
    'increments': [2, 3, 5]
  }, options);
  
  settings['class-prefix-increment'] = settings['class-prefix'] + 'mod-',
  
  len = settings.increments.length,
  
  classPattern = new RegExp($.fn.regexEscape(settings['class-prefix']) + "\\S+", ["g"]);


  return this.each(function() { //returning this.each enables chaining
      var 
          $elem = $(this),
          i     = 0,

          oneLineHeight = parseInt($elem.css('line-height'),10),
          currHeight    = $elem.height(),
          currNumLines  = Math.round(currHeight/oneLineHeight);


      if($elem.css('display') === 'inline') {return; }

      //Unset any added classes first. Might need this, e.g., in a responsive/fluid layout where 
      //this function is run on every resize. Then add the class again with the current number.
      $elem.removeClass(function (i, classList) {var old = classList.match(classPattern) || []; return (old.join(' '));});
      $elem.addClass(settings['class-prefix'] + currNumLines);
      
      for(; i<len; i++)
      {
          $elem.addClass(settings['class-prefix-increment'] + settings.increments[i] + '-' + currNumLines % settings.increments[i]);
      }
  });
};

jQuery.fn.regexEscape = function(str) { return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); }
/*
* rwdImageMaps AngularJS Directive v1.0
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
* 
* Original Copyright (c) 2013 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*
* angular-rwdImageMaps.js (by Philip Saa)
* https://github.com/cowglow/
* @cowglow
*/

angular.module('rwdImageMaps',[])
.directive('rwdimgmap', function($window){
	return{
		restrict: 'CA',
		link:function(scope, element, attrs){
			element.bind('load', function() {
				var timer = null;

				var w = $(element).attr('width'),
					h = $(element).attr('height'),
					tempDest = null;

				// Resize map areas	
				function resize(){
					if (!w || !h) {
						var temp = new Image();
						temp.src = $(element).attr('src');
						if(temp.src == undefined)
							temp.src = $(element).attr('ng-src');

						if (!w)
							w = temp.width;
						if (!h)
							h = temp.height;
					}
					
					var wPercent = $(element).width()/100,
						hPercent = $(element).height()/100,
						map = attrs.usemap.replace('#', ''),
						c = 'coords';
					
					angular.element('map[name="' + map + '"]').find('area').each(function(){
						var $this = $(this);
						
						if (!$this.data(c)){
							$this.data(c, $this.attr(c));
						}
							
						var coords = $this.data(c).split(','),
							coordsPercent = new Array(coords.length);
						
						for (var i = 0; i<coordsPercent.length; ++i){
							if (i % 2 === 0){
								coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
							} else {
								coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
							};
						};
						$this.attr(c, coordsPercent.toString());
					});
				}

				// JQuery : Center areas texts on hover
				function setInteractivesAreas() {
					$('area').each(function() {
						var title = $(this).attr('title');
						var coords = $(this).attr('coords');
						var coordsA = coords.split(',');
						var left = parseInt(coordsA[0]);
						var right = parseInt(coordsA[2]);
						var top = parseInt(coordsA[1]);
						var bottom = parseInt(coordsA[3]);
						// Text size
						var width = $(this).width() / 2;
						var height = $(this).height() / 2;
						// Center the text
						var xmid = (left + right) / 2 - width;
						var ymid = (top + bottom) / 2 - height;
						console.log(width);
						$('area[title*="' + title + '"]').css({ top: ymid + 'px', left: xmid + 'px' });
					})
				}
				
				// Wait a little bit
				function resizeAreas() {
					clearTimeout(timer);
					timer = setTimeout(setInteractivesAreas, 200);
				}
				
				// Resize when the location changes or when the site is loading
				var src = angular.element('#img-map').attr('src');

				if (src !== undefined & scope.destination != tempDest) {
					angular.element($window).resize(resize);
					resizeAreas();
					tempDest = scope.destination;
				}
				angular.element($window).resize(resize).trigger('resize');
			});
		}
	};
});

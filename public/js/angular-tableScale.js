REFERENCE_HEIGHT = 907;
REFERENCE_WIDTH = 1680;
BORDER_SPACING_W = 235;
BORDER_SPACING_H = 135;
LEFT = 35;
TOP = 10;
IMG_WIDTH = 240;
IMG_HEIGHT = 225;

//TODO : Find an alternative of border-spacing (or table itself)

angular.module('tableScale', [])
    .directive('board', function($window) {
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {

                element.bind('load', function() {
                    
                    // Resize table attributes
                    function resize() {
                        
                    var w = REFERENCE_WIDTH,
                    h = REFERENCE_HEIGHT;
                        
                        var currentWidth = $(element).width(),
                            currentHeight = $(element).height();

                        /*if (currentWidth === w && currentHeight === h)
                            return;
                        */
                       
                        var wPercent = currentWidth / 100,
                            hPercent = currentHeight / 100;
                        
                        var borderSpacingW = parseInt((BORDER_SPACING_W / w) * 100 * wPercent),
                            borderSpacingH = parseInt((BORDER_SPACING_H / h) * 100 * hPercent),
                            left = parseInt((LEFT / w) * 100 * wPercent),
                            top = parseInt((TOP / h) * 100 * hPercent),
                            imgWidth = parseInt((IMG_WIDTH / w) * 100 * wPercent),
                            imgHeight = parseInt((IMG_HEIGHT / h) * 100 * hPercent);
                        
                        angular.element('table').css({'border-spacing': borderSpacingW + 'px ' + borderSpacingH + 'px', 'left': left + 'px', 'top': top + 'px'});
                        angular.element('table img').css({'width': imgWidth + 'px','height': imgHeight + 'px'});
                        angular.element('.date').css({'width': imgWidth + 'px'});
                    }

                    // Resize when the window size changes
                    angular.element($window).resize(resize).trigger('resize');
                });

                
            }
        };
    });
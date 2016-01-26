/**
 * Bubble directive.
 * ------------------------------------------------------------------------
 * This is a custom directive that shows type labels.
 *
 * Usage:
 * ```
 * <bubble type="typeOfThing" colors="boolean"></bubble>
 * ```
 *
 * ------------------------------------------------------------------------
 * MIT License
 * © 2014 Rachael Shaw & contributors
 */
angular.module('SailsWebsite')

.directive('bubble', [function () {

  // actual directive.
  return {
    template: '<span is="bubble-heart"></span>',
    restrict: 'E',
    // require: 'ngModel',
    scope: {
      type: '@',
      colors: '='
    },
    link: function (scope, element){
      var $bubbleHeart = element.find('[is="bubble-heart"]');

      // Determine if the bubble type has a `?` suffix (if so, it is uncertain)
      var isUncertain;
      if (scope.type.match(/\?$/)) {
        isUncertain = true;
      }

      // Also get the "raw type" (used for class name) by stripping off the `?` suffix
      var rawType = scope.type.replace(/\?$/, '');
      rawType = rawType.toLowerCase();


      // Interpret `object` as `dictionary`
      if ( scope.type.match(/object/i) ) {
        scope.type = 'dictionary';
      }

      // If colors are enabled, add the "colors" class to communicate that little tidbit to styletown.
      if (scope.colors) {
        $bubbleHeart.addClass('colors');
      }

      // If relevant, add the "uncertain" class.
      if (isUncertain) {
        $bubbleHeart.addClass('uncertain');
      }

      // Now dip the bubble's heart into the dye and scratch some text onto it.
      $bubbleHeart.addClass(rawType);
      $bubbleHeart.text(_.capitalize(scope.type));
    }
  };

}]);

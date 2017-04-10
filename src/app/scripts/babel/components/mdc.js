'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MDLTextfieldController = function () {
  function MDLTextfieldController($scope, $element) {
    _classCallCheck(this, MDLTextfieldController);

    this.$element = $element;
    this.mdcComponent = null;
  }

  _createClass(MDLTextfieldController, [{
    key: '$postLink',
    value: function $postLink() {
      this.$element.addClass('mdc-textfield');
      this.mdlComponent = new window.mdc.textfield.MDCTextfield(this.$element[0]);
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      this.mdlComponent.destroy();
    }
  }]);

  return MDLTextfieldController;
}();

angular.module('inOurWorldApp', []).component('mdlTextfield', {
  bindings: {
    'id': '@',
    'label': '@',
    'ngModel': '='
  },
  controller: MDLTextfieldController,
  template: '\n      <div class="mdc-textfield">\n          <input id="lastname" type="text" class="mdc-textfield__input">\n          <label for="lastname" class="mdc-textfield__label">\n            Last Name\n          </label>\n        </div>\n    '
});
//# sourceMappingURL=mdc.js.map

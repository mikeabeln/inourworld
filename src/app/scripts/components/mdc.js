'use strict';

class MDLTextfieldController {
  constructor($scope, $element) {
    this.$element = $element;
    this.mdcComponent = null;
  }
  
  $postLink() {
    this.$element.addClass('mdc-textfield');
    this.mdlComponent = new window.mdc.textfield.MDCTextfield(this.$element[0]);
  }
  
  $onDestroy() {
    this.mdlComponent.destroy();
  }
}

angular.module('inOurWorldApp', [])
  .component('mdlTextfield', {
    bindings: {
      'id': '@',
      'label': '@',
      'ngModel': '='
    },
    controller: MDLTextfieldController,
    template: `
      <div class="mdc-textfield">
          <input id="lastname" type="text" class="mdc-textfield__input">
          <label for="lastname" class="mdc-textfield__label">
            Last Name
          </label>
        </div>
    `
  });
import angular from 'angular';

import template from './costs.html';
import './costs.css';

class CostsController {
  constructor($ngRedux) {
    'ngInject';

    this.store = $ngRedux;
  }

  $onInit() {
    this.unsubscribe = this.store.connect(this.mapStateToThis)(this);
  }

  $onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      name: state.name,
      imageslist: state.imageslist,
      deviceoriginalprice: state.deviceoriginalprice,
      subscriptions: state.subscriptions,
      currentSubscription: state.subscription
    }
  }
}

const CostsComponent = {
  template,
  controller: CostsController,
  controllerAs: 'costsListCtrl'
};

const CostsModule = angular.module('costs', [
  ])
  .component('costs', CostsComponent);

export { CostsModule, CostsComponent, CostsController };

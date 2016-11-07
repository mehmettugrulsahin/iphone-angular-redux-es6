import angular from 'angular';

import template from './costs.html';
import './costs.css';

class CostsController {
  constructor($ngRedux, $scope) {
    'ngInject';

    this.store = $ngRedux;
    this.scope = $scope;
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
      currentSubscription: state.subscription,
      selectedImage: state.imageslist[0]
    }
  }

  getSelectedImage() {
    let defaultUrl = '/assets/img/apple-iphone-6-64gb-silver-front-409.png';

    if (this.scope.selectedImage) {
        return this.scope.selectedImage.url;    
    }
    return defaultUrl;
  }

  onImageSelected(image) {
    this.scope.selectedImage = image;
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

import angular from 'angular';
import template from './subscription-item.html';
import './subscription-item.css';

const SubscriptionItemComponent = {
  bindings: {
    subscription: '<',
    selected: '&'
  },
  template,
  controllerAs: 'subscriptionItemCtrl'
};

const SubscriptionItemModule = angular.module('subscriptionItem', [])
  .component('subscriptionItem', SubscriptionItemComponent);

export default SubscriptionItemModule;

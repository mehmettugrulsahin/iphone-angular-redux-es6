import angular from 'angular';
import SubscriptionItemModule from './subscription-item/subscription-item';

import { SubscriptionsActions } from './subscriptions.state';

import template from './subscriptions.html';
import './subscriptions.css';

class SubscriptionsController {
  constructor($ngRedux, SubscriptionsActions) {
    'ngInject';

    this.store = $ngRedux;
    this.SubscriptionsActions = SubscriptionsActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.SubscriptionsActions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);

    this.getSubscriptions();
  }

  $onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      subscriptions: state.subscriptions,
      currentSubscription: state.subscription
    }
  }

  onSubscriptionSelected(subscription) {
    this.selectSubscription(subscription);
  }

  isCurrentSubscription(subscription) {
    return this.currentSubscription &&
      this.currentSubscription.id === subscription.id;
  }
}

const SubscriptionsComponent = {
  template,
  controller: SubscriptionsController,
  controllerAs: 'subscriptionsListCtrl'
};

const SubscriptionsModule = angular.module('subscriptions', [
      SubscriptionItemModule.name
    ])
    .factory('SubscriptionsActions', SubscriptionsActions)
    .component('subscriptions', SubscriptionsComponent)
  ;

export { SubscriptionsModule, SubscriptionsComponent, SubscriptionsController } ;

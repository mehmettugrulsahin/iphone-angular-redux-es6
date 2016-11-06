import angular from 'angular';
import { SubscriptionsModule } from './subscriptions/subscriptions';

const ComponentsModule = angular.module('app.components', [
    SubscriptionsModule.name
]);

export default ComponentsModule;

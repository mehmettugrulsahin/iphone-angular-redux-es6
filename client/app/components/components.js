import angular from 'angular';
import { SubscriptionsModule } from './subscriptions/subscriptions';
import { CostsModule } from './costs/costs';

const ComponentsModule = angular.module('app.components', [
    SubscriptionsModule.name,
    CostsModule.name
]);

export default ComponentsModule;

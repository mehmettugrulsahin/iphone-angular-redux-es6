//-------------------------------------------------------------------
// Constants
//-------------------------------------------------------------------
export const GET_SUBSCRIPTIONS = 'GET_SUBSCRIPTIONS';
export const GET_CURRENT_SUBSCRIPTION = 'GET_CURRENT_SUBSCRIPTION';

//-------------------------------------------------------------------
// Actions
//-------------------------------------------------------------------
const URLS = {
  FETCH: 'data/subscriptions.json'
};

export const SubscriptionsActions = ($http, $q) => {
  'ngInject';

  const extract = result => result.data;

  const getSubscriptions = () => {
    return (dispatch, getState) => {
      const { subscriptions } = getState();

      if(subscriptions.length) {
        return $q.when(subscriptions)
          .then(() => dispatch({ type: GET_SUBSCRIPTIONS, payload: subscriptions }));
      } else {
        return $http.get(URLS.FETCH)
          .then(extract)
          .then(data => dispatch({ type: GET_SUBSCRIPTIONS, payload: data }));
      }
    }
  };

  const selectSubscription = subscription => {
    return { type: GET_CURRENT_SUBSCRIPTION, payload: subscription };
  };

  return {
    getSubscriptions,
    selectSubscription
  };
};

//-------------------------------------------------------------------
// Reducers
//-------------------------------------------------------------------
export const subscriptions = (state = [], {type, payload}) => {
  switch (type) {
    case GET_SUBSCRIPTIONS:
      return payload || state;
    default:
      return state;
  }
};

export const subscription = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_CURRENT_SUBSCRIPTION:
      return payload || { name: undefined };
    default:
      return state;
  }
};
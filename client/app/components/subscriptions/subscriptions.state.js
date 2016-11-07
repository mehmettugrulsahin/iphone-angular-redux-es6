//-------------------------------------------------------------------
// Constants
//-------------------------------------------------------------------
export const GET_NAME = 'GET_NAME';
export const GET_IMAGES_LIST = 'GET_IMAGES_LIST';
export const GET_DEVICE_ORIGINAL_PRICE = 'GET_DEVICE_ORIGINAL_PRICE';
export const GET_SUBSCRIPTIONS = 'GET_SUBSCRIPTIONS';
export const GET_CURRENT_SUBSCRIPTION = 'GET_CURRENT_SUBSCRIPTION';

//-------------------------------------------------------------------
// Actions
//-------------------------------------------------------------------
const URLS = {
  FETCH: 'data/product.json'
};

export const SubscriptionsActions = ($http, $q) => {
  'ngInject';

  const extract = result => result.data;

  const getProduct = () => {
    return (dispatch, getState) => {
      const { name, imageslist, deviceoriginalprice, subscriptions } = getState();      

      if(subscriptions.length) {
        return $q.when(subscriptions)
          .then(() => {
            dispatch({ type: GET_NAME, payload: name });
            dispatch({ type: GET_IMAGES_LIST, payload: imageslist });
            dispatch({ type: GET_DEVICE_ORIGINAL_PRICE, payload: deviceoriginalprice });
            dispatch({ type: GET_SUBSCRIPTIONS, payload: subscriptions })
          });
      } else {
        return $http.get(URLS.FETCH)
          .then(extract)
          .then(data => {
            dispatch({ type: GET_NAME, payload: data.name });
            dispatch({ type: GET_IMAGES_LIST, payload: data.imageslist });
            dispatch({ type: GET_DEVICE_ORIGINAL_PRICE, payload: data.deviceoriginalprice });            
            dispatch({ type: GET_SUBSCRIPTIONS, payload: data.subscriptions })
          });
      }
    }
  };

  const selectSubscription = subscription => {
    return { type: GET_CURRENT_SUBSCRIPTION, payload: subscription };
  };

  return {
    getProduct,
    selectSubscription
  };
};

//-------------------------------------------------------------------
// Reducers
//-------------------------------------------------------------------
export const name = (state = [], {type, payload}) => {
  switch (type) {
    case GET_NAME:
      return payload || state;
    default:
      return state;
  }
};

export const imageslist = (state = [], {type, payload}) => {
  switch (type) {
    case GET_IMAGES_LIST:
      return payload || state;
    default:
      return state;
  }
};

export const deviceoriginalprice = (state = [], {type, payload}) => {
  switch (type) {
    case GET_DEVICE_ORIGINAL_PRICE:
      return payload || state;
    default:
      return state;
  }
};

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
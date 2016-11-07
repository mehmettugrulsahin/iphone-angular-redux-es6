import { subscriptions, subscription } from './subscriptions.state';

describe('Subscriptions', () => {
  describe('subscriptions reducer', () => {
    const initialState = [
      { id: 0, name: 'Basis Mobiel' },
      { id: 1, name: 'Vooral Internet Instap' }
    ];

    it('should return state with an unknown action', () => {
      const result = subscriptions(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return an empty array for state by default', () => {
      const result = subscriptions(undefined, { type: 'random', payload: {} });
      expect(result).toEqual([]);
    });

    it('should return correct payload on SET_SUBSCRIPTIONS action', () => {
      const result = subscriptions(undefined, { type: 'GET_SUBSCRIPTIONS', payload: initialState });
      expect(result).toBe(initialState);
    });
  });

  describe('subscription reducer', () => {
    const initialState = { id: 0, name: 'Vooral Internet Standard' };

    it('should return state with an unknown action', () => {
      const result = subscription(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return empty object for state by default', () => {
      const result = subscription(undefined, { type: 'random', payload: {} });
      expect(result).toEqual({});
    });

    it('should return correct payload on GET_CURRENT_SUBSCRIPTION action', () => {
      const newSubscription = { id: 1, name: 'Design' },
        result = subscription(initialState, {
          type: 'GET_CURRENT_SUBSCRIPTION',
          payload: newSubscription
        }),
        emptyResult = subscription(initialState, {
          type: 'GET_CURRENT_SUBSCRIPTION',
          payload: undefined
        });

      expect(result).toBe(newSubscription);
      expect(emptyResult.name).toBeUndefined();
    });
  });
});
const MODULE_NAME = 'suggestions';

const getQueryKey = (val) => {
  return [MODULE_NAME, val];
};

const QUERY_KEYS = {
  SUGGESTIONS: getQueryKey('suggestions'),
  MY_EVENTS: getQueryKey('my_events'),
  USERS: getQueryKey('users'),
};

export default QUERY_KEYS;

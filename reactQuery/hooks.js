import QUERY_KEYS from './queries';
import { useQuery } from 'react-query';
import { getAllUsers, getSuggestions, getMyEvents } from './services';

export const useGetSuggestions = (params) => {
  return useQuery(QUERY_KEYS.SUGGESTIONS, () => getSuggestions(params), {
    retry: false,
  });
};

export const useGetAllUsers = (params) => {
  return useQuery(QUERY_KEYS.USERS, () => getAllUsers(params), {
    retry: false,
  });
};

export const useGetMyEvents = (params) => {
  return useQuery(QUERY_KEYS.MY_EVENTS, () => getMyEvents(params), {
    retry: false,
  });
};

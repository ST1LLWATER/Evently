export const getSuggestions = async (params) => {
  const suggestions = await fetch(
    `/api/event/get-suggestions/${params.id}`
  ).then((res) => res.json());
  return suggestions;
};

export const getAllUsers = async (params) => {
  const response = await fetch('/api/users/all');
  const json = await response.json();
  return json;
};

export const getMyEvents = async (params) => {
  const response = await fetch('/api/event/myevents');
  const json = await response.json();
  return json;
};

export const getNotices = async (params) => {
  const response = await fetch(`/api/event/get/notices/${params.event_id}`);
  const json = await response.json();
  return json;
};

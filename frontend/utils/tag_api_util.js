export const fetchAllTags = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/tags',
  });
};

export const createTags = (tags) => {
  return $.ajax({
    method: 'POST',
    url: '/api/tags',
    data: { tags }
  });
};
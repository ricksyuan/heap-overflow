export const searchQuestions = (query) => {

  return $.ajax({
    method: 'GET',
    url: '/api/search',
    data: { query }
  });
};
export const fetchAllQuestions = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/questions',
  });
};
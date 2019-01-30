export const fetchAllQuestions = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/questions',
  });
};

export const createQuestion = (question) => {
  return $.ajax({
    method: 'POST',
    url: '/api/questions',
    data: { question }
  });
};
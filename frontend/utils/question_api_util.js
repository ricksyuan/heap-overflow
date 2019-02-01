export const fetchAllQuestions = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/questions',
  });
};

export const searchQuestions = (query) => {

  return $.ajax({
    method: 'GET',
    url: '/api/search',
    data: { query }
  });
};


export const fetchQuestion = (questionId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/questions/${questionId}`,
  });
};

export const createQuestion = (question) => {
  return $.ajax({
    method: 'POST',
    url: '/api/questions',
    data: { question }
  });
};

export const deleteQuestion = (questionId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/questions/${questionId}`,
  });
};
export const fetchQuestions = (sort, limit, page) => {
  return $.ajax({
    method: 'GET',
    url: '/api/questions',
    data: {
      sort,
      limit,
      page,
    }
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
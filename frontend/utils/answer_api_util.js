export const fetchAllAnswers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/answers',
  });
};

export const fetchAnswer = (answerId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/answers/${answerId}`,
  });
};

export const postAnswer = (questionId, answer) => {
  return $.ajax({
    method: 'POST',
    url: `/api/questions/${questionId}/answers`,
    data: { answer }
  });
};

export const deleteAnswer = (answerId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/answers/${answerId}`,
  });
};
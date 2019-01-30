export const fetchAllAnswers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/answers',
  });
};

export const fetchAnswer = (answerId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/questions/${answerId}`,
  });
};

export const createAnswer = (answer) => {
  return $.ajax({
    method: 'POST',
    url: '/api/questions',
    data: { answer }
  });
};
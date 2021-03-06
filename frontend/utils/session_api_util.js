// create a user
export const postUser = (newUser) => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user: newUser },
  })
);

export const postDemoUser = () => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user: 'demo' },
  })
);


export const postSession = (returningUser) => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user: returningUser }
  })
);

export const deleteSession = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session',
  })
);
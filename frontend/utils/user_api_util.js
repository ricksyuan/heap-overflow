export const fetchUserProfile = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`,
  });
}

export const fetchAllUsers = (pageNum) => {
  return $.ajax({
    method: 'GET',
    url: '/api/users',
    data: { 
      page: pageNum,
     },
  });
}

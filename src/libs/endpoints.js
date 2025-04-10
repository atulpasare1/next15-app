const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  job: {
    searchJobs: '/get-jobs',
    detail: (id) => `/users/${id}`,
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
  },
  posts: {
    list: '/posts',
    create: '/posts',
    detail: (id) => `/posts/${id}`,
  },
};

export default endpoints;

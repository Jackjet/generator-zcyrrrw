import axios from 'axios';

axios.interceptors.request.use(config => config, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => response.data, (error) => {
  return Promise.reject(error);
});

axios.defaults = {
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
  timeout: 2000,
};

function request(options) {
  return axios(options);
}

export default request;


import axios from 'axios';

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
    
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  
  return Promise.reject(error);
});

axios.defaults = {
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
  timeout: 2000
};

function request(options) {
  return axios(options)
}
export default request




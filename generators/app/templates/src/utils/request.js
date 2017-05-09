import axios from 'axios';

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
    alert("出错了！")
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  alert("出错了！")
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




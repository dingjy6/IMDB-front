import axios from 'axios';
import {Message} from 'element-ui';

//默认超时时间
axios.defaults.timeout = 1000000;
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500;
  };
  //跨域请求，允许保存cookie
  axios.defaults.withCredentials = true;

  //http request拦截
axios.interceptors.request.use(config => {
  var connection = localStorage.getItem('connection')
  if(connection == 'mongo'){
    config.url = config.url.replace('mysql','mongo')
    console.log("change url",config.url)
  }
    //config配置，这里暂时没有
    return config
  }, error => {
    return Promise.reject(error)
  });

  //http response 拦截
axios.interceptors.response.use(res => {
    const status = res.data.code || res.status;
    if (status !== 200) {
      Message({
        message: "调用接口错误，请检查服务调用！",
        type: 'error'
      });
      return Promise.reject(new Error())
    }
    return res;
  }, error => {
    return Promise.reject(new Error(error));
  });
  
  export default axios;
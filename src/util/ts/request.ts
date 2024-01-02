//定制请求的实例

//导入axios  npm install axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api'
const token = localStorage.getItem('token');
const instance = axios.create({ baseURL,  headers: { 'Authorization': token  }})
//添加响应拦截器
instance.interceptors.response.use(
  (result) => {
    if (result.status === 200) {
        console.log(result , "result")
        return result.data
    }
    ElMessage.error(result.data.msg?result.data.msg:'服务器异常')
    return Promise.reject(result.data)
  },
  (err) => {
    //如果状态码是401就跳转到登录页
    if (err.response.code === 401) {
      ElMessage.error('请重新登录')
      return router.push('/login')
    }else{
      alert('服务异常')
      return Promise.reject(err) //异步的状态转化成失败的状态
    }

  }
)

export default instance

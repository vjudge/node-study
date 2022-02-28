# axios


### 安装
```shell
npm i axios
```


### 请求方法
* axios.request(config)
* axios.get(url [, config])
* axios.delete(url [, config])
* axios.head(url [, config])
* axios.options(url [, config])
* axios.post(url [, data [, config]])
* axios.put(url [, data [, config]])
* axios.patch(url [, data [, config]])


### 请求配置
```json
{
  url: string, // 用于请求服务 URL
  method: string, // 请求方法，默认 get
  baseURL: string, // 自动加在 url 前面，除非 url 是一个绝对 URL
  headers: { ... }, // headers 被发送的自定义请求头
  params: { ... }, // 与请求一起发送的 URL 参数, 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  paramsSerializer: function(params) { // 负责 params 序列化的函数
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // 
  // 作为请求主体被发送的数据, 适用于请求方法 PUT, POST 和 PATCH
  // 在没有设置 transformRequest 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: { ... }, 
  timeout: 1000, // 指定请求超时的毫秒数(0 表示无超时时间), 如果请求超过了设置的时间，请求将被中断
  withCredentials: false, // 表示跨域请求时是否需要使用凭证，默认是 false
  // 表示应该使用 HTTP 基础验证，并提供凭据
  // 将设置一个 Authorization 头，覆写掉现有的任意使用 headers 设置的自定义 Authorization 头
  auth: {
    username: string,
    password: string
  },
  responseType: 'json', // 表示服务器响应的数据类型，默认 json。可以是 arraybuffer, blob, document, json, text, stream
  responseEncoding: 'utf8', // 默认为 utf8
  maxContentLength: 2000, // 允许的响应内容的最大尺寸
  xsrfCookieName: 'XSRF-TOKEN', // 用作 xsrf token 值的 cookie 名称，默认为 XSRF-TOKEN
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认为 X-XSRF-TOKEN
  maxRedirects: 5, // 在 node.js 中 follow 的最大重定向数目，如果设置为0，将不会 follow 任何重定向，默认为 5
  // 在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理，默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  // 定义代理服务器的主机名称和端口
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: { // 表示 HTTP 基础验证应当用于连接代理，并提供凭据
      username: string,
      password: string
    }
  },
  // 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果返回 true (或者为 null || undefined)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
  // transformRequest 允许在向服务器发送前，修改请求数据
  // 只能用在 PUT, POST 和 PATCH 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    return data; // 对 data 进行任意转换处理
  }],
  // transformResponse 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    return data; // 对 data 进行任意转换处理
  }],
  // 允许自定义处理请求，以使测试更轻松, 返回一个 promise 并应用一个有效的响应
  adapter: function (config) {
    ...
  },
  onUploadProgress: function (progressEvent) { // 为上传处理进度事件
    ...
  },
  onDownloadProgress: function (progressEvent) { // 为下载处理进度事件
    // 对原生进度事件的处理
  },
}
```


### 响应结果
```
{
  status: 200, // 响应的 HTTP 状态码
  statusText: 'OK', // 服务响应的 HTTP 状态信息
  data: {}, // 服务返回的数据结果
  headers: {}, // 服务器响应的头
  config: {}, // 请求提供的配置信息
  request: {},
}
```










# pm2


### 安装
```
npm install -g pm2
```


### pm2 list
查看所有进程状态


### pm2 start
```
pm2 start app.js
```
参数说明：
* -i : 启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目
* -n : --name，应用的名称。查看应用信息的时候可以用到
* -o <path> : --output <path>，标准输出日志文件的路径
* -e <path> : --error <path>，错误输出日志文件的路径
* --watch : 监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件
* --ignore-watch : 排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如--ignore-watch="test node_modules"
* --env <env> : 环境变量



### pm2 restart
重启
```
pm2 restart app.js
```


### pm2 reload
重载服务
```
pm2 reload app_id
pm2 reload all
```


### pm2 stop
停止
```
pm2 stop app_name | app_id
pm2 stop all
```


### pm2 delete
删除
```
pm2 delete app_id
pm2 delete all
```


### pm2 show
显示进程信息
```
pm2 show app_id
```


### pm2 logs
查看实例日志
```
pm2 logs app_id
```



### pm2 monit
查看当前运行的进程的状态





#

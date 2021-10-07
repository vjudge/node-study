# clinic

开箱即用的 Nodejs 应用诊断工具。注意，Node.js >= 8.11.1



### 安装
```
npm install -g clinic
npm install -g autocannon
```



### clinic doctor
```
clinic doctor -- node app.js
```



### clinic flame
生成火焰图
```
clinic flame -- node app.js
# 只收集数据
clinic flame --collect-only --node app.js
# 将数据生成火焰图
clinic flame --visualize-only PID.flamegraph
```



### clinic bubbleprof
```
```

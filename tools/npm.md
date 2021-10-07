# npm



### npm install
安装一个包
```
# 如果本地有 package.json 文件，则会在 package.json 文件中查找针对这个包所约定的语义化版本规则
# 如果本地没有 package.json 文件，那么会安装最新版本的包
npm install express
# 安装包会放到 dependencies
npm install express --save
# 安装包会放到 devDependencies
npm install express --save-dev
# 安装全局包
npm install -g express
```


### npm uninstall
卸载本地安装的包
```
npm uninstall express
# 从 package.json 文件中删除依赖
npm uninstall --save express
```


### npm init
```
# 创建初始化 package.json
npm init
npm init --yes
```


### npm ls
列出安装的包列表


### npm set
```
npm set init.author.email "gradonday@gmail.com"
npm set init.license "MIT"
```


### npm login
登录添加仓库账号
```
npm adduser [--registry=url] [--scope=@orgname] [--always-auth] [--auth-type=legacy]
# 别名
npm adduser
```


### npm publish
发布版本

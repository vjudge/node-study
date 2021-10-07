# nvm
管理不同版本的node



### 安装 nvm
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# 配置 ~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```



### nvm ls
查看安装的 node 版本
```
nvm ls
```



### nvm ls-remote
列出远程服务器上所有的可用版本
```
nvm ls-remote
```



### nvm use
切换不同的 node 版本
```
nvm use 8.9.2
# 切换 8.9.x 中最高版本
nvm use 8.9
# 切换到最新版
nvm use node
```



### nvm install
安装不同版本的 node
```
nvm install 8.9.2
# nvm 会寻找 8.9.x 中最高版本来安装
nvm install 8.9
```



### nvm which
某个版本 node 的路径
```
nvm which 8.9.2
```



### nvm alias
设置别名
```
# 别名设置为 node8
nvm alias node8 8.9.2
nvm use node8

# 设为默认 node 版本
nvm alias default 8.9.2
```



### nvm unalias
取消别名
```
nvm unalias node8
```



### nvm run
运行特定版本的 node
```
nvm run 8.9.2 app.js
```



### nvm exec
在当前终端的子进程中运行特定版本的 node
```
nvm exec 8.9.2 node app.js
```

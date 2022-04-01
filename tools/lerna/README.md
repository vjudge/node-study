# lerna
Lerna 是一种工具，针对 使用 git 和 npm 管理多软件包代码仓库的工作流程进行优化

### 介绍
将大型代码仓库分割成多个独立版本化的 软件包(package)对于代码共享来说非常有用。但是，如果某些更改 跨越了多个代码仓库的话将变得很 麻烦 并且难以跟踪，并且， 跨越多个代码仓库的测试将迅速变得非常复杂

为了解决这些(以及许多其它)问题，某些项目会将 代码仓库分割成多个软件包(package)，并将每个软件包存放到独立的代码仓库中


### 安装
```shell
npm i -g lerna
```

### lerna init
初始化 Lerna 仓库


### lerna bootstrap
在当前 Lerna 仓库中执行引导流程(bootstrap)，安装所有依赖项并链接任何交叉依赖

此命令后，可以在 require() 中直接通过软件包的名称进行加载，就好像已经存在于 node_modules 目录下一样


### lerna ls
列出当前 Lerna 仓库中的所有公共软件包(public packages)


### lerna import <pathToRepo>
将本地路径 <pathToRepo> 中的软件包导入(import) packages/<directory-name> 中并提交 commit


### lerna publish
为已经更新过的软件包创建一个新版本。提示 输入新版本号并更新 git 和 npm 上的所有软件包
```shell
# 使用给定的 npm dist-tag (默认为 latest)发布到 npm
lerna publish --npm-tag [tagname]
# 创建一个 canary 版本
lerna publish --canary/-c
# 不要运行任何 git 命令
lerna publish --skip-git
# 强制发布 
# 指定的一个或多个软件包(以逗号分隔)或使用 * 表示所有软件包(对于修改过的软件包跳过 git diff 检查)
lerna publish --force-publish [packages]
```


### lerna changed
检查自上次发布以来哪些软件包被修改过


### lerna diff [package?]
列出所有或某个软件包自上次发布以来的修改情况


### lerna run [script]
在每一个包含 [script] 脚本的软件包中运行此 npm 脚本












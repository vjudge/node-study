# yarn


### 安装
```
brew install yarn
# 或者
curl -o- -L https://yarnpkg.com/install.sh | bash
```


### 升级
```
brew upgrade yarn
```


### yarn --version
显示版本



### yarn init
初始化 package.json



### yarn install
安装 package.json 中是所有包
```
# 或者
yarn
```



### yarn add
添加依赖
```
yarn add [package]
# 添加到 devDependencies
yarn add [package] --dev
# 添加到 peerDependencies
yarn add [package] --peer
# 添加到 optionalDependencies
yarn add [package] --optional
```



### yarn remove
移除依赖包



### yarn upgrade
升级依赖包
```
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

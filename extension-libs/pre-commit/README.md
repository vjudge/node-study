# 工程化工具


### pre-commit
```shell
npm i pre-commit -S
```
package.json 配置
```json
{
  "scripts": {
    "lint": "tslint -p tsconfig.json",
    "pre-commit": [
      "lint" // lint 命令就是 scripts 的 lint
    ]
  }
}
```














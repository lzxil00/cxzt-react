# 移动端web前端项目dmeo
基于react/react-router/antd-mobile的web前端项目
- create-react-cli方式创建项目
- react-router 做路由
- antd-mobile 做UI处理

## 使用说明
### 安装
- `git clone`
- `yarn install`
- `yarn start`

### 目录结构
```
cxzt-react/
  |--README.md             ----说明
  |--node_modules/         ----node仓库
  |--package.json          ----项目配置
  |--public/               ----公共静态
  |--src/                  ----核心代码
  |--|--component/         ----业务代码
  |--|--img/               ----公用图片
  |--|--system/            ----系统层级代码
  |--|--|--App.css         ----系统样式
  |--|--|--App.js          ----系统入口
  |--|--|--App.test.js     ----系统测试
  |--|--|--Routers.js      ----路由配置
  |--|--|--component/      ----系统组件
  |--|--|--|--Login.js     ----登录页面
  |--|--|--|--NoMatch.js   ----404页面
  |--|--|--|--TabBars.js   ----TabBar配置页面
  |--|--test/              ----测试demo
  |--|--utils/             ----工具类
  |--|--index.css          ----全局样式
  |--|--index.js           ----项目入口
```
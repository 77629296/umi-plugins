# @rainbowfish/umi-plugins-chunks

## 启用方式

安装包后默认注册，如需使用分包功能，需要配置`chunks`，详情见配置。

## 介绍

umi 提供了`chunks`配置，需要使用`chainWebpack`手动配置`optimization`，多个项目重复配置不太友好，后续如果修改，全部工程都要改一波。自定义个插件来实现。

## 使用前后对比

### 修改前

![](https://tva1.sinaimg.cn/large/008i3skNly1gpvnnwkbvrj31hy0u07lx.jpg)

### 修改方案

![](https://tva1.sinaimg.cn/large/008i3skNly1gpvnrom21vj31g00u0nfa.jpg)

### 修改后

![](https://tva1.sinaimg.cn/large/008i3skNly1gpvnthrz6ij31mo0u01ku.jpg) ![](https://tva1.sinaimg.cn/large/008i3skNly1gpvnu2k46uj31n50u01kx.jpg)

## 安装

Using npm:

```bash
$ npm install --save-dev @rainbowfish/umi-plugin-chunks
```

or using yarn:

```bash
$ yarn add @rainbowfish/umi-plugin-chunks --dev
```

## 配置

扩展 umi 配置文件：

```js
// .umirc or config/config.js 等其他umi支持的配置文件
import { defineConfig, utils } from 'umi';

export default defineConfig({
  /**
   * 需要拆分的模块名称
   * 根据webpack打包分析（ANALYZE=1 umi build） 自行判断哪些需要拆分
   * 建议仅配置一下比较大的包，分包的目的是减少单个包体积，并发加载。
   * 如果分的太多反而影响加载速度
   */
  chunks: ['umi', 'rc-', '@sentry', '@umijs', 'lodash', 'antd', '@ant-design'],
});
```

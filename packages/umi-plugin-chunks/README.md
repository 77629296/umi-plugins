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

![](https://tva1.sinaimg.cn/large/008i3skNly1gpvnthrz6ij31mo0u01ku.jpg)  
![](https://tva1.sinaimg.cn/large/008i3skNly1gpvnu2k46uj31n50u01kx.jpg)

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
import { defineConfig } from 'umi';

export default defineConfig({
  /**
   * 需要拆分的模块名称
   * 根据webpack打包分析（ANALYZE=1 umi build） 自行判断哪些需要拆分
   * 建议仅配置一下比较大的包，分包的目的是减少单个包体积，并发加载。
   * 如果分的太多反而影响加载速度
   */
  chunks: ['rc-', '@sentry', '@umijs', 'lodash', 'antd', '@ant-design'],
});
```

## 遇到的问题与解决

###  分包配置后，build 测试正常分包，但是 umi dev 运行，浏览器空白，无报错

配置如下

```js
import { defineConfig } from 'umi';
export default defineConfig({
  chunks: ['rc-', '@sentry', '@umijs', 'lodash', 'antd', '@ant-design'],
});
```

经过排查，umi.js 是打包后的入口文件，像这样  
![](https://tva1.sinaimg.cn/large/008i3skNly1gpvtweoeejj318q09qmyq.jpg)

配置分包后，没有加入'umi'，导致没有入口，什么也不会加载，像这样  
![](https://tva1.sinaimg.cn/large/008i3skNly1gpvtzrgv16j31ci0e4gr1.jpg)

这样就清晰了，`chunks` 中增加'umi'即可，这也是默认值

所以开发插件时，做了处理，配置了 `chunks`，如果数组中没有 umi，则会自动加入，只需配置需要的分包模块即可。😁

```js
import { defineConfig } from 'umi';
export default defineConfig({
  // 增加入口 'umi'
  chunks: ['rc-', '@sentry', '@umijs', 'lodash', 'antd', '@ant-design', 'umi'],
});
```

### 分包报错 chunk of xxx not found

刚开始配置时，遇到下图这样的报错，经过排查，是因为配置的`chunks`和`cacheGroups`中的配置不对应，像图中这个报错，就是`chunks`配置了`dva`，但是`cacheGroups`没有对应的处理，可见配置时需要一一对应，多个项目配置繁琐、易错，这也是开发这个插件的原因。😺

![](https://tva1.sinaimg.cn/large/008i3skNly1gpvx1e3h9tj31ya0tm4jv.jpg)

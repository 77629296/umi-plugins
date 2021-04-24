# @rainbowfish/umi-plugins-chunks

## 启用方式

默认开启。

## 介绍

基于

## 使用

```bash
$ umi-test

# watch mode
$ umi-test -w
$ umi-test --watch

# collect coverage
$ umi-test --coverage

# print debug info
$ umi-test --debug

# test specified package for lerna package
$ umi-test --package name

# don't do e2e test
$ umi-test --no-e2e
```

## 配置

通过 jest.config.js 实现配置的目的，比如：

```js
module.exports = {
  moduleNameMapper: {
    '^umi$': require.resolve('umi'),
  },
};
```

但有时你会希望保留 umi-test 内置的配置，只做扩展，我们也函数的形式，比如：

```js
module.exports = {
  moduleNameMapper(memo) {
    return {
      ...memo,
      '^umi$': require.resolve('umi'),
    };
  },
};
```

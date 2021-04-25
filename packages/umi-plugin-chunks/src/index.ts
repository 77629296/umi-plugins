import { IApi } from 'umi';
import { splitChunksByModuleArray } from './utils';

export default (api: IApi) => {
  api.chainWebpack((config: any) => {
    let { chunks } = api.config;
    const { NODE_ENV } = process.env;
    // 开发环境不分包 使用默认值
    if (NODE_ENV === 'development') {
      api.config.chunks = ['umi'];
      return;
    }
    if (!chunks || (chunks && !chunks.length)) {
      return;
    }
    // chunks中必须包含默认值umi 否则运行时加载包有问题
    if (chunks && !chunks.includes('umi')) {
      chunks.push('umi');
    }

    const { absNodeModulesPath } = api.paths;
    const cacheGroups = splitChunksByModuleArray(chunks, absNodeModulesPath);

    // optimize chunks
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          name: 'vendors',
          maxInitialRequests: Infinity,
          cacheGroups: cacheGroups,
        },
      },
    });
  });
};

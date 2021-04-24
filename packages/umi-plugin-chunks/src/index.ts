import { IApi } from 'umi';
import { splitChunksByModuleArray } from './utils';

export default (api: IApi) => {
  api.chainWebpack((config: any) => {
    const { chunks } = api.config;
    if (!chunks?.length) return;
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

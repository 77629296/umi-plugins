const getModulePackageName = (
  module: { context: string },
  nodeModulesPath: string,
) => {
  if (!module.context) return null;
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }
  let packageName = module.context.substring(nodeModulesPath.length + 1);
  return packageName;
};

const splitChunksByModuleName = (
  moduleName: string,
  nodeModulesPath: string,
) => {
  return {
    name: moduleName,
    test: (module: { context: string }) => {
      const packageName = getModulePackageName(module, nodeModulesPath) || '';
      // 包含或开头都算
      return (
        packageName.includes(moduleName) || packageName.startsWith(moduleName)
      );
    },
    priority: 20,
    chunks: 'initial', // only package third parties that are initially dependent
  };
};

export const splitChunksByModuleArray = (
  moduleArray: string[],
  nodeModulesPath: string,
) => {
  const splitMap: any = {};
  moduleArray.map(
    (moduleName) =>
      (splitMap[moduleName] = splitChunksByModuleName(
        moduleName,
        nodeModulesPath,
      )),
  );
  return splitMap;
};

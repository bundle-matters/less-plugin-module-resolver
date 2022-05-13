import { getAliasFileManager, LessPluginModuleResolverOptions } from './alias-file-manager';

export { LessPluginModuleResolverOptions };

export class LessPluginModuleResolver implements Less.Plugin {
  constructor(private readonly options: LessPluginModuleResolverOptions) {}

  public install(less: LessStatic, pluginManager: Less.PluginManager): void {
    // noop yet
    const AliasFileManager = getAliasFileManager(less);
    pluginManager.addFileManager(new AliasFileManager(this.options));
  }

  public minVersion: [number, number, number] = [2, 1, 1];
}

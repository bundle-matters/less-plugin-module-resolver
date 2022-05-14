import { getAliasFileManager } from './alias-file-manager';
import { LessPluginModuleResolverConfigs } from './interface';

export class LessPluginModuleResolver implements Less.Plugin {
  constructor(private readonly options: LessPluginModuleResolverConfigs) {}

  public install(less: LessStatic, pluginManager: Less.PluginManager): void {
    // noop yet
    const AliasFileManager = getAliasFileManager(less);
    pluginManager.addFileManager(new AliasFileManager(this.options));
  }

  public minVersion: [number, number, number] = [2, 1, 1];
}

export * from './interface';

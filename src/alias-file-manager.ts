import Less from 'less';
import { getOptions } from './normalize-configs';

import { LessPluginModuleResolverConfigs, MatcherTuple } from './interface';

export class AliasFileManager extends Less.FileManager {
  private matchers: MatcherTuple;

  constructor(readonly options: LessPluginModuleResolverConfigs) {
    super();
    this.matchers = getOptions(options);
  }

  public supports(filename: string): boolean {
    return this.matchers.some(([matcher]) => matcher.test(filename));
  }

  public supportsSync(filename: string): boolean {
    return this.supports(filename);
  }

  public loadFile(
    filename: string,
    currentDirectory: string,
    options: Less.LoadFileOptions,
    environment: Less.Environment
  ): Promise<Less.FileLoadResult> {
    const newFilename = this.matchAndReplace(filename);

    return super.loadFile(newFilename, currentDirectory, options, environment);
  }

  loadFileSync(
    filename: string,
    currentDirectory: string,
    options: Less.LoadFileOptions,
    environment: Less.Environment
  ): Less.FileLoadResult | Less.FileLoadError {
    const newFilename = this.matchAndReplace(filename);

    return super.loadFileSync(newFilename, currentDirectory, options, environment);
  }

  private matchAndReplace(filename: string) {
    let newFilename = filename;
    for (const [matcher, replace] of this.matchers) {
      if (matcher.test(newFilename)) {
        newFilename = replace(newFilename);
        break;
      }
    }
    return newFilename;
  }
}

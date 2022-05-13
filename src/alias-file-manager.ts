export interface LessPluginModuleResolverOptions {
  alias: {
    [key: string]: string | ((args: RegExpExecArray) => string);
  };
  root?: string;
}

export function getAliasFileManager(less: LessStatic) {

  return class AliasFileManager extends less.FileManager implements Less.FileManager {
    private matchConfig: Array<[any, any]>;

    constructor(private readonly options: LessPluginModuleResolverOptions) {
      super();
      const { alias } = this.options;
      this.matchConfig = Object.keys(alias)
        .reduce((prev, cur) => {
          const matcher = new RegExp('^' + cur, 'i');
          const currentConfig = alias[cur];
          const converter =typeof currentConfig === 'function'
            ? (filename: string) => currentConfig(matcher.exec(filename))
            : (filename: string) => {
              return filename.replace(matcher, currentConfig);
              // const matched = matcher.exec(filename);
              // if (!matched) {
              //   return;
              // }
              // return `${currentConfig}${matched[1]}`;
            };
          prev.push([matcher, converter]);
          return prev;
        }, []);
    }

    supports(filename: string, currentDirectory: string, options: Less.LoadFileOptions, environment: Less.Environment): boolean {
      let matched = false;
      for (const [matcher] of this.matchConfig) {
        if (matcher.test(filename)) {
          matched = true;
        }
      }

      return matched;
    }

    supportsSync(filename: string, currentDirectory: string, options: Less.LoadFileOptions, environment: Less.Environment): boolean {
    }

    loadFile(filename: string, currentDirectory: string, options: Less.LoadFileOptions, environment: Less.Environment): Promise<Less.FileLoadResult> {
      let newFilename = filename;
      for (const [matcher, converter] of this.matchConfig) {
        if (matcher.test(newFilename)) {
          newFilename = converter(newFilename);
          break;
        }
      }

      return super.loadFile(newFilename, currentDirectory, options, environment);
    }

    loadFileSync(filename: string, currentDirectory: string, options: Less.LoadFileOptions, environment: Less.Environment): Less.FileLoadResult | Less.FileLoadError {
      return this.loadFile(filename, currentDirectory, options, environment);
    }

    private resolve(filename: string, currentDirectory: string) {

    }
  }
}

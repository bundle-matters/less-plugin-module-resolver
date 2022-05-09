export function getAliasFileManager(less: LessStatic) {

  return class AliasFileManager extends less.FileManager implements Less.FileManager {
    constructor(private readonly options: any) {
      super();
    }

    supports(filename: string, currentDirectory: string, options: Less.LoadFileOptions, environment: Less.Environment): boolean {
    }

    supportsSync(filename: string, currentDirectory: string, options: Less.LoadFileOptions, environment: Less.Environment): boolean {
    }

    loadFile(filename: string, currentDirectory: string, options: Less.LoadFileOptions, environment: Less.Environment): Promise<Less.FileLoadResult> {
        
    }

    loadFileSync(filename: string, currentDirectory: string, options: Less.LoadFileOptions, environment: Less.Environment): Less.FileLoadResult | Less.FileLoadError {

    }

    private resolve(filename: string, currentDirectory: string) {

    }
  }
}

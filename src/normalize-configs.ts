import path from 'path';
import { LessPluginModuleResolverConfigs, MatcherTuple } from './interface';
import { escapeRegex } from './utils';

function isRegexString(str: string): boolean {
  return str.startsWith('^') || str.endsWith('$');
}

export function getOptions(options: LessPluginModuleResolverConfigs) {
  const { alias, root } = options;
  return Object.keys(alias).reduce((prev, searchValue) => {
    const searchRegex = isRegexString(searchValue)
      ? new RegExp(searchValue)
      : new RegExp(`^${escapeRegex(searchValue)}(/.*|)$`);

    const replaceConfig = alias[searchValue];

    return prev.concat([[
      searchRegex,
      // intersection type conflict with overloads
      (filename: string) => path.resolve(
        root || '',
        filename.replace(searchValue, replaceConfig as any),
      ),
    ]]);
  }, [] as MatcherTuple);
}

import path from 'path';
import { LessPluginModuleResolverConfigs, MatcherTuple } from './interface';
import { escapeRegex } from './utils';

function isRegexString(str: string): boolean {
  return str.startsWith('^') || str.endsWith('$');
}

export function getOptions(options: LessPluginModuleResolverConfigs) {
  const { alias, rootDir } = options;
  return Object.keys(alias).reduce((prev, searchValue) => {
    const searchRegex = isRegexString(searchValue)
      ? new RegExp(searchValue)
      : new RegExp(`^${escapeRegex(searchValue)}(/?.*|)$`);

    const replacement = alias[searchValue];

    if (typeof replacement === 'string') {
      return prev.concat([
        [
          searchRegex,
          (filename: string) => {
            return path.join(rootDir || '', filename.replace(searchRegex, `${replacement}$1`));
          },
        ],
      ]);
    } else {
      return prev.concat([
        [
          searchRegex,
          (filename: string) => {
            return path.join(rootDir || '', filename.replace(searchRegex, replacement));
          },
        ],
      ]);
    }
  }, [] as MatcherTuple);
}

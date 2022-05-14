/**
 * regexp pattern strings
 * We use RegExpConstructor internally
 * So the normal string escape rules (preceding special characters with \ when included in a string) are necessary.
 *
 * Notes:
 * - /a\/b/.toString() and remove heading / and trailing /
 * - new RegExp('a/b') === new RegExp('a\\/b')
 */
type RegexpPatternString = Extract<Parameters<RegExpConstructor>[0], string>;

/**
 * Specifying a string as a parameter
 * See mdn blog
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
 */
type Replacement = string;

/**
 * Specifying a function as a parameter
 * See mdn blog
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_a_parameter
 */
type StringReplacerFunction = (substring: string, ...args: any[]) => string;

export interface LessPluginModuleResolverConfigs {
  /**
   * @default `process.cwd()`
   */
  root?: string;
  /**
   * The alias config: using regex pattern
   * @link usage docs for `key` [RegexpPatternString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)
   */
  alias: Record<RegexpPatternString, Replacement | StringReplacerFunction>;
}

type ReplacerFunction = (filename: string) => string;

export type MatcherTuple = Array<[RegExp, ReplacerFunction]>;

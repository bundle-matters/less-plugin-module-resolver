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
type StringReplacer = string;

/**
 * Specifying a function as a parameter
 * See mdn blog
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_a_parameter
 */
type FunctionReplacer = (substring: string, ...args: any[]) => string;

export interface LessPluginModuleResolverConfigs {
  /**
   * @default ''
   */
  rootDir?: string;
  /**
   * Alias config: using RegExp pattern
   * - @link usage doc for [`RegexpPatternString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)
   * - @link usage doc for [`RegExp#literal_notation_and_constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp#literal_notation_and_constructor)
   */
  alias: {
    [key: RegexpPatternString]: StringReplacer | FunctionReplacer;
  };
  // alias: Record<RegexpPatternString, Replacement | StringReplacerFunction>;
}

export type MatcherTuple = Array<[RegExp, (filename: string) => string]>;

import { vi, expect, describe, it } from 'vitest';
import less from 'less';

import { LessPluginModuleResolver, LessPluginModuleResolverOptions } from '../src';

function lessc(lessContent: string, pluginOptions: LessPluginModuleResolverOptions = {}) {
  return less.render(lessContent, {
    plugins: [new LessPluginModuleResolver(pluginOptions)],
  });
}

describe('test cases', () => {
  it('basic', async () => {
    const { css } = await lessc(`
      @white: #fff;
    `);
    expect(css).toBe('');
  });
});

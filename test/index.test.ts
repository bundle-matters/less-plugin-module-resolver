import { expect, describe, it } from 'vitest';
import less from 'less';
import path from 'path';
import fs from 'fs';

import { LessPluginModuleResolver, LessPluginModuleResolverOptions } from '../src';

function lessc(filepath: string, pluginOptions: LessPluginModuleResolverOptions) {
  const fileContent = fs.readFileSync(path.resolve(__dirname, 'fixtures/less', filepath), 'utf-8');
  return less.render(fileContent, {
    plugins: [new LessPluginModuleResolver(pluginOptions)],
  });
}

function getCssFilename(filepath: string) {
  return fs.readFileSync(path.resolve(__dirname, 'fixtures/css', filepath), 'utf-8');
}

describe('test cases', () => {
  it('basic', async () => {
    const { css } = await lessc('basic.less', {
      root: './fixtures/less',
      alias: {
        styles: path.resolve(__dirname, 'fixtures/less/styles'),
      },
    });
    expect(css).toBe(getCssFilename('basic.css'));
  });
});

import { expect, describe, it } from 'vitest';
import less from 'less';
import path from 'path';
import fs from 'fs';

import { LessPluginModuleResolver, LessPluginModuleResolverConfigs } from '../src';

async function lessc(filepath: string, pluginOptions: LessPluginModuleResolverConfigs) {
  const fileContent = fs.readFileSync(path.resolve(__dirname, 'fixtures/less', filepath), 'utf-8');
  return less.render(fileContent, {
    plugins: [new LessPluginModuleResolver(pluginOptions)],
  });
}

async function lesscSync(filepath: string, pluginOptions: LessPluginModuleResolverConfigs) {
  const fileContent = fs.readFileSync(path.resolve(__dirname, 'fixtures/less', filepath), 'utf-8');
  return less.render(fileContent, {
    syncImport: true,
    plugins: [new LessPluginModuleResolver(pluginOptions)],
  });
}

function getOutputCss(filepath: string) {
  return fs.readFileSync(path.resolve(__dirname, 'fixtures/css', filepath), 'utf-8');
}

describe('test cases for async', () => {
  describe('use normal string', () => {
    it('string replacement', async () => {
      const { css } = await lessc('basic.less', {
        rootDir: path.resolve(__dirname, 'fixtures'),
        alias: {
          styles: 'less/styles',
          '@mixins': 'less/styles/mixins/index.less',
        },
      });
      expect(css).toBe(getOutputCss('basic.css'));
    });

    it('replacer function', async () => {
      const { css } = await lessc('basic.less', {
        alias: {
          styles: (_, restPath) => path.resolve(__dirname, `fixtures/less/styles${restPath}`),
          '@mixins': () => path.resolve(__dirname, 'fixtures/less/styles/mixins/index.less'),
        },
      });
      expect(css).toBe(getOutputCss('basic.css'));
    });

    it('import from node_modules like webpack', async () => {
      const { css } = await lessc('reset.less', {
        alias: {
          '~': '',
        },
      });
      expect(css).toContain(
        `
body {
  margin: 0;
}`.trim()
      );
    });

    it('more complex imports like webpack', async () => {
      const { css } = await lessc('complex.less', {
        alias: {
          '^~(.+)$': (_, restPath: string) => {
            const re = /^@styles\/(.+)$/;
            if (!re.test(restPath)) {
              // import from node_modules
              return require.resolve(restPath);
            }
            // custom alias
            return restPath.replace(re, path.resolve(__dirname, 'fixtures/less/styles/$1'));
          },
        },
      });
      expect(css).toContain(
        `
body {
  margin: 0;
}`.trim()
      );
      expect(css).toContain(
        `
.dialog {
  color: red;
}`.trim()
      );
    });
  });

  describe('use regex string', () => {
    it('string replacement', async () => {
      const { css } = await lessc('basic.less', {
        rootDir: path.resolve(__dirname, 'fixtures'),
        alias: {
          '^styles(/.+)': 'less/styles',
          '^@mixins$': () => 'less/styles/mixins/index.less',
        },
      });
      expect(css).toBe(getOutputCss('basic.css'));
    });

    it('replacer function', async () => {
      const { css } = await lessc('basic.less', {
        alias: {
          '^styles/(.+)$': (_, restPath) => {
            return path.resolve(__dirname, `fixtures/less/styles/${restPath}`);
          },
          '^@mixins$': () => {
            return path.resolve(__dirname, 'fixtures/less/styles/mixins/index.less');
          },
        },
      });
      expect(css).toBe(getOutputCss('basic.css'));
    });
  });
});

describe('test cases for sync', () => {
  it('string replacement', async () => {
    const { css } = await lesscSync('basic.less', {
      rootDir: path.resolve(__dirname, 'fixtures'),
      alias: {
        styles: 'less/styles',
        '@mixins': 'less/styles/mixins/index.less',
      },
    });
    expect(css).toBe(getOutputCss('basic.css'));
  });

  it('replacer function', async () => {
    const { css } = await lesscSync('basic.less', {
      alias: {
        styles: (_, restPath) => path.resolve(__dirname, `fixtures/less/styles${restPath}`),
        '@mixins': () => path.resolve(__dirname, 'fixtures/less/styles/mixins/index.less'),
      },
    });
    expect(css).toBe(getOutputCss('basic.css'));
  });
});

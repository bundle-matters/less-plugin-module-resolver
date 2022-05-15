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

function getCssFilename(filepath: string) {
  return fs.readFileSync(path.resolve(__dirname, 'fixtures/css', filepath), 'utf-8');
}

describe('test cases for async', () => {
  describe('use normal string', () => {
    it('string replacement', async () => {
      const { css } = await lessc('basic.less', {
        root: path.resolve(__dirname, 'fixtures'),
        alias: {
          styles: 'less/styles',
          '@mixins': 'less/styles/mixins/index.less',
        },
      });
      expect(css).toBe(getCssFilename('basic.css'));
    });

    it('replacer function', async () => {
      const { css } = await lessc('basic.less', {
        alias: {
          styles: (_, restPath) => path.resolve(__dirname, `fixtures/less/styles${restPath}`),
          '@mixins': () => path.resolve(__dirname, 'fixtures/less/styles/mixins/index.less'),
        },
      });
      expect(css).toBe(getCssFilename('basic.css'));
    });
  });

  describe('use regex string', () => {
    it('string replacement', async () => {
      const { css } = await lessc('basic.less', {
        root: path.resolve(__dirname, 'fixtures'),
        alias: {
          '^styles(/.+)': 'less/styles',
          '^@mixins$': () => 'less/styles/mixins/index.less',
        },
      });
      expect(css).toBe(getCssFilename('basic.css'));
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
      expect(css).toBe(getCssFilename('basic.css'));
    });
  });
});

describe('test cases for sync', () => {
  describe('use normal string', () => {
    it('string replacement', async () => {
      const { css } = await lesscSync('basic.less', {
        root: path.resolve(__dirname, 'fixtures'),
        alias: {
          styles: 'less/styles',
          '@mixins': 'less/styles/mixins/index.less',
        },
      });
      expect(css).toBe(getCssFilename('basic.css'));
    });

    it('replacer function', async () => {
      const { css } = await lesscSync('basic.less', {
        alias: {
          styles: (_, restPath) => path.resolve(__dirname, `fixtures/less/styles${restPath}`),
          '@mixins': () => path.resolve(__dirname, 'fixtures/less/styles/mixins/index.less'),
        },
      });
      expect(css).toBe(getCssFilename('basic.css'));
    });
  });

  describe('use regex string', () => {
    it('string replacement', async () => {
      const { css } = await lesscSync('basic.less', {
        root: path.resolve(__dirname, 'fixtures'),
        alias: {
          '^styles(/.+)': 'less/styles',
          '^@mixins$': () => 'less/styles/mixins/index.less',
        },
      });
      expect(css).toBe(getCssFilename('basic.css'));
    });

    it('replacer function', async () => {
      const { css } = await lesscSync('basic.less', {
        alias: {
          '^styles/(.+)$': (_, restPath) => {
            return path.resolve(__dirname, `fixtures/less/styles/${restPath}`);
          },
          '^@mixins$': () => {
            return path.resolve(__dirname, 'fixtures/less/styles/mixins/index.less');
          },
        },
      });
      expect(css).toBe(getCssFilename('basic.css'));
    });
  });
});

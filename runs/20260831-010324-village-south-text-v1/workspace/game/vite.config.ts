import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';

/**
 * Both installation and standalone download must ship the SAME player.
 * Vite still compiles the module graph for development and static analysis,
 * but the released entry point is the canonical, story-bound, fully tested
 * one-file H5 produced by four-heroine-r4/tools/build-preview.mjs.
 *
 * The previous inline-for-file-protocol plugin rebundled a second player.
 * It restored a saved 'hunt' checkpoint as a fresh 'spotlight' on real HTTP,
 * although the underlying localStorage JSON was intact.
 */
function publishAuditedStandalone(): Plugin {
  return {
    name: 'publish-audited-standalone-vn',
    apply: 'build',
    async writeBundle() {
      const directory = path.resolve('.');
      const source = path.join(directory, 'four-heroine-r4', 'play.html');
      const output = path.join(directory, 'dist', 'index.html');
      const html = await readFile(source, 'utf8');
      if (
        !html.includes('name="story-sha256"') ||
        !html.includes('const ADV8_ART_PACK=') ||
        !html.includes('第一夜')
      ) throw new Error('Canonical playable HTML missing or not rebuilt; run npm run verify in four-heroine-r4');
      await writeFile(output, html);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [publishAuditedStandalone()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
  },
});

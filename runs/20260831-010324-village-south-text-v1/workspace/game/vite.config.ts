import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';

function inlineForFileProtocol(): Plugin {
  return {
    name: 'inline-for-file-protocol',
    apply: 'build',
    // Rollup writeBundle runs only after index.html and assets are on disk.
    async writeBundle() {
      const directory = path.resolve('dist');
      const htmlPath = path.join(directory, 'index.html');
      let html = await readFile(htmlPath, 'utf8');
      const scriptMatch = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/);
      if (scriptMatch) {
        const scriptPath = path.join(directory, scriptMatch[1].replace(/^\.\//, ''));
        const script = (await readFile(scriptPath, 'utf8')).replaceAll('</script', '<\\/script');
        html = html.replace(scriptMatch[0], '');
        html = html.replace('</body>', `<script>${script}</script></body>`);
      }
      const styleMatch = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
      if (styleMatch) {
        const stylePath = path.join(directory, styleMatch[1].replace(/^\.\//, ''));
        const style = await readFile(stylePath, 'utf8');
        html = html.replace(styleMatch[0], `<style>${style}</style>`);
      }
      await writeFile(htmlPath, html);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [inlineForFileProtocol()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
  },
});

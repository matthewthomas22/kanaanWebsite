import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    {
      name: 'font-licenses',
      generateBundle() {
        for (const name of ['Cormorant-OFL.txt', 'Inter-OFL.txt']) {
          this.emitFile({
            type: 'asset',
            fileName: `assets/${name}`,
            source: readFileSync(new URL(`./assets/fonts/${name}`, import.meta.url), 'utf8'),
          });
        }
      },
    },
  ],
});

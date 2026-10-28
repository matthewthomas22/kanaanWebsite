import { fileURLToPath } from 'node:url';
import base from '../vite.config.mjs';

export default {
  ...base,
  plugins: [
    ...base.plugins,
    {
      name: 'devotions-test-fixture',
      enforce: 'pre',
      resolveId(source, importer) {
        if (
          source.endsWith('/data/devotions.js') &&
          importer?.includes('/src/')
        ) {
          return fileURLToPath(
            new URL('./fixtures/devotions.js', import.meta.url),
          );
        }
      },
    },
  ],
};

import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import glsl from 'vite-plugin-glsl';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    plugins: [glsl()],
  },
});

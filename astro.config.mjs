import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: 'https://bbag.github.io',
    devToolbar: {
        enabled: false
    },
    integrations: [vue(), mdx()],
    markdown: {
        syntaxHighlight: 'prism'
    }
});
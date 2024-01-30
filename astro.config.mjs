import { defineConfig } from 'astro/config'
import vue from "@astrojs/vue"
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
    site: 'https://bbag.github.io',
    devToolbar: {
        enabled: false
    },
    integrations: [vue(), mdx()],
    markdown: {
        syntaxHighlight: 'shiki',
        shikiConfig: {
            theme: 'material-theme-palenight', // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            langs: [], // https://github.com/shikijs/shiki/blob/main/docs/languages.md
            wrap: true, // Enable word wrap to prevent horizontal scrolling
            transformers: [] // See https://shikiji.netlify.app/guide/transformers and https://shikiji.netlify.app/packages/transformers
        }
    }
})
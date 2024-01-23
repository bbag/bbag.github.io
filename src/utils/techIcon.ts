import {
    IconAstro,
    IconBootstrap,
    IconCss,
    IconHtml,
    IconIllustrator,
    IconInVision,
    IconJavaScript,
    IconLogSnag,
    IconMongoDB,
    IconNode,
    IconNodemailer,
    IconNuxt,
    IconPhotoshop,
    IconPhp,
    IconReact,
    IconSass,
    IconStripe,
    IconTailwind,
    IconTypeScript,
    IconVercel,
    IconVite,
    IconVue,
    IconWordPress,
} from '@/assets/icons/icons'

export function techIcon(icon: string) {
    switch (icon) {
        case 'Astro': return IconAstro
        case 'Bootstrap': return IconBootstrap
        case 'CSS': return IconCss
        case 'HTML': return IconHtml
        case 'Illustrator': return IconIllustrator
        case 'InVision': return IconInVision
        case 'JavaScript': return IconJavaScript
        case 'LogSnag': return IconLogSnag
        case 'MongoDB': return IconMongoDB
        case 'Node.js': return IconNode
        case 'Nodemailer': return IconNodemailer
        case 'Nuxt': return IconNuxt
        case 'Photoshop': return IconPhotoshop
        case 'PHP': return IconPhp
        case 'React': return IconReact
        case 'SASS': return IconSass
        case 'SCSS': return IconSass
        case 'Stripe': return IconStripe
        case 'Tailwind': return IconTailwind
        case 'TypeScript': return IconTypeScript
        case 'Vercel': return IconVercel
        case 'Vite': return IconVite
        case 'Vue': return IconVue
        case 'WordPress': return IconWordPress
        default: return null
    }
}
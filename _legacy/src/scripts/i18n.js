/**
 * I18n — Language management module
 * Handles locale detection, persistence, and content switching.
 */
import { 
    hero, 
    projects, 
    technologies, 
    notes, 
    books, 
    sharedData, 
    metaData, 
    navData, 
    sectionsData, 
    uiData, 
    uiLabels 
} from '../data/index.js';

export const I18n = {
    STORAGE_KEY: 'lang-preference',
    SUPPORTED: ['en', 'pt'],
    DEFAULT: 'en',

    /** Current locale */
    locale: 'en',

    /**
     * Initialize: detect locale, bind switcher, apply.
     */
    init() {
        this.locale = this.detectLocale();
        this.bindSwitcher();
        this.applyLocale();
    },

    /**
     * Detect locale from: localStorage → browser language → default.
     */
    detectLocale() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved && this.SUPPORTED.includes(saved)) return saved;

        const browserLang = navigator.language || navigator.userLanguage || '';
        if (browserLang.startsWith('pt')) return 'pt';

        return this.DEFAULT;
    },

    /**
     * Get the current locale.
     */
    getLocale() {
        return this.locale;
    },

    /**
     * Get merged data for current locale.
     * Reconstructs the legacy siteData structure expected by Components.init().
     */
    getData() {
        const lang = this.locale;
        
        const about = {
            bio: lang === 'pt' 
                ? "Comecei em infraestrutura de TI, gerenciando servidores e redes em instituições como o INPE e a Faculdade Canção Nova. Nos últimos 4+ anos, venho fazendo a transição para engenharia de software — construindo sistemas modulares, plataformas SaaS e landing pages com pensamento arquitetural real."
                : "I started in IT infrastructure, managing servers and networks at institutions like INPE and Faculdade Canção Nova. Over the past 4+ years I've been transitioning into software engineering — building modular systems, SaaS platforms, and landing pages with real architectural thinking.",
            highlights: lang === 'pt'
                ? ["15+ anos em infraestrutura de TI", "Em transição para engenharia de software", "Focado em arquitetura e sistemas de produto"]
                : ["15+ years in IT infrastructure", "Transitioning to software engineering", "Focused on architecture and product systems"],
            skillsTitle: lang === 'pt' ? "Habilidades & Ferramentas" : "Skills & Tools",
            skills: [
                "HTML / CSS / JavaScript",
                "TypeScript",
                "Next.js / React",
                "Node.js / Fastify",
                "Prisma / Postgres",
                "Docker / CI-CD",
                "SEO & Accessibility",
                "Design Systems",
            ],
        };

        const contact = {
            heading: lang === 'pt' ? "Vamos conversar sobre o seu próximo projeto." : "Let's talk about your next project.",
            description: lang === 'pt' ? "Estou disponível para trabalhos freelance e parcerias. Respondo em até 48 horas úteis." : "I'm available for freelance work and partnerships. I respond within 48 business hours.",
            emailLabel: lang === 'pt' ? "Enviar email" : "Send email",
            resumeLabel: lang === 'pt' ? "Currículo" : "Resume",
        };

        const localeData = {
            meta: metaData[lang],
            nav: navData[lang],
            hero: hero[lang],
            sections: sectionsData[lang],
            technologies: technologies[lang],
            projects: projects[lang],
            notes: notes[lang],
            reading: books[lang],
            about,
            contact,
            ui: uiLabels[lang],
            ...uiData[lang]
        };

        return { ...localeData, shared: sharedData };
    },

    /** Callback for when language changes */
    onChange: null,

    /**
     * Switch to a new locale. Re-renders everything without page reload.
     */
    setLocale(lang) {
        if (!this.SUPPORTED.includes(lang)) return;
        this.locale = lang;
        localStorage.setItem(this.STORAGE_KEY, lang);
        this.applyLocale();
        if (this.onChange) this.onChange();
    },

    /**
     * Toggle between supported locales.
     */
    toggle() {
        const next = this.locale === 'en' ? 'pt' : 'en';
        this.setLocale(next);
    },

    /**
     * Apply locale to the DOM (html lang, meta tags).
     */
    applyLocale() {
        const data = this.getData();
        const htmlLang = this.locale === 'pt' ? 'pt-BR' : 'en';
        document.documentElement.setAttribute('lang', htmlLang);

        // Update document title
        document.title = data.meta.title;

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', data.meta.description);

        // Update og:locale
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) ogLocale.setAttribute('content', data.meta.locale);

        // Update og:title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', data.meta.title);

        // Update og:description
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', data.meta.description);

        // Update skip link
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) skipLink.textContent = data.skipLink;

        // Update lang switcher button text
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            langBtn.textContent = data.switchLang;
            langBtn.setAttribute(
                'aria-label',
                this.locale === 'en' ? 'Mudar para Português' : 'Switch to English'
            );
        }

        // Update section headers (static HTML)
        this.updateSectionHeaders(data);
    },

    /**
     * Update static section headers from data.
     */
    updateSectionHeaders(data) {
        const sections = data.sections;
        if (!sections) return;

        const mapping = {
            projects: { eyebrow: '#projects .eyebrow', title: '#projects-title' },
            technologies: { eyebrow: '#technologies .eyebrow', title: '#technologies-title' },
            notes: { eyebrow: '#notes .eyebrow', title: '#notes-title' },
            reading: { eyebrow: '#reading .eyebrow', title: '#reading-title' },
            about: { eyebrow: '#about .eyebrow', title: '#about-title' },
        };

        for (const [key, selectors] of Object.entries(mapping)) {
            if (!sections[key]) continue;
            const eyebrow = document.querySelector(selectors.eyebrow);
            const title = document.querySelector(selectors.title);
            if (eyebrow) eyebrow.textContent = sections[key].eyebrow;
            if (title) title.textContent = sections[key].title;
        }
    },

    /**
     * Bind the language switcher button.
     */
    bindSwitcher() {
        const btn = document.getElementById('lang-toggle');
        if (!btn) return;
        btn.addEventListener('click', () => this.toggle());
    },
};

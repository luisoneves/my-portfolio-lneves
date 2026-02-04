/**
 * Main JS
 * - Constants
 * - Navigation
 * - Theme
 * - Schema
 * - Init
 */

const Constants = {
    DOM: {
        navigation: {
            toggle: '.nav-toggle',
            nav: '.site-nav',
            header: '.site-header',
            links: '.site-nav a'
        },
        theme: {
            toggle: '#dark-mode-toggle',
            logo: '#logo-navbar',
            metaThemeColor: 'meta[name="theme-color"]'
        },
        schema: {
            scriptContainer: 'head'
        }
    },
    STORAGE_KEYS: {
        theme: 'theme-preference'
    },
    RESOURCE_PATHS: {
        logo: {
            light: './images/logo-LN_ligthmode.png',
            dark: './images/logo-LN_darkmode.png'
        }
    },
    KEYBOARD: {
        toggleTheme: {
            ctrl: true,
            shift: true,
            key: 'D'
        },
        closeMenu: {
            key: 'Escape'
        }
    },
    THEMES: {
        LIGHT: 'light',
        DARK: 'dark'
    }
};

const Navigation = {
    init() {
        this.cacheDOM();
        if (!this.validateElements()) return;
        this.bindEvents();
        this.isOpen = false;
    },

    cacheDOM() {
        this.toggle = document.querySelector(Constants.DOM.navigation.toggle);
        this.nav = document.querySelector(Constants.DOM.navigation.nav);
        this.header = document.querySelector(Constants.DOM.navigation.header);
        this.links = document.querySelectorAll(Constants.DOM.navigation.links);
    },

    validateElements() {
        return this.toggle && this.nav && this.header;
    },

    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleMenu());
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Bind methods for listeners to maintain scope/reference if needed, 
        // or use arrow functions in addEventListener
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    },

    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    },

    openMenu() {
        this.isOpen = true;
        this.nav.classList.add('is-open');
        this.toggle.setAttribute('aria-expanded', 'true');
        this.toggle.setAttribute('aria-label', 'Fechar menu');
        document.body.style.overflow = 'hidden';

        document.addEventListener('keydown', this.handleKeydown);
        document.addEventListener('click', this.handleClickOutside);
    },

    closeMenu() {
        this.isOpen = false;
        this.nav.classList.remove('is-open');
        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';

        document.removeEventListener('keydown', this.handleKeydown);
        document.removeEventListener('click', this.handleClickOutside);
    },

    handleKeydown(event) {
        if (event.key === Constants.KEYBOARD.closeMenu.key) {
            this.closeMenu();
        }
    },

    handleClickOutside(event) {
        if (!this.nav.contains(event.target) && !this.toggle.contains(event.target)) {
            this.closeMenu();
        }
    }
};

const Theme = {
    init() {
        this.cacheDOM();
        if (!this.validateElements()) return;
        this.bindEvents();
        this.loadPreference();
        this.watchSystemTheme();
    },

    cacheDOM() {
        // Handle ID selectors by removing '#' if needed, dependent on how we query
        const toggleId = Constants.DOM.theme.toggle.replace('#', '');
        const logoId = Constants.DOM.theme.logo.replace('#', '');

        this.toggleBtn = document.getElementById(toggleId);
        this.logo = document.getElementById(logoId);
        this.metaThemeColor = document.querySelector(Constants.DOM.theme.metaThemeColor);
        this.html = document.documentElement;
    },

    validateElements() {
        if (!this.toggleBtn) {
            console.warn('Theme: Missing toggle button');
            return false;
        }
        return true;
    },

    bindEvents() {
        this.toggleBtn.addEventListener('click', () => {
            const isDark = this.html.classList.contains('dark');
            this.setTheme(isDark ? Constants.THEMES.LIGHT : Constants.THEMES.DARK);
        });

        document.addEventListener('keydown', (e) => {
            const shortcut = Constants.KEYBOARD.toggleTheme;
            if (e.ctrlKey === shortcut.ctrl && e.shiftKey === shortcut.shift && e.key === shortcut.key) {
                const isDark = this.html.classList.contains('dark');
                this.setTheme(isDark ? Constants.THEMES.LIGHT : Constants.THEMES.DARK);
            }
        });
    },

    watchSystemTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem(Constants.STORAGE_KEYS.theme)) {
                this.setTheme(e.matches ? Constants.THEMES.DARK : Constants.THEMES.LIGHT);
            }
        });
    },

    loadPreference() {
        const savedTheme = localStorage.getItem(Constants.STORAGE_KEYS.theme);
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemDark) {
            this.setTheme(Constants.THEMES.DARK);
        } else {
            this.setTheme(Constants.THEMES.LIGHT);
        }
    },

    setTheme(theme) {
        const isDark = theme === Constants.THEMES.DARK;

        if (isDark) {
            this.html.classList.add('dark');
        } else {
            this.html.classList.remove('dark');
        }

        this.updateLogo(isDark);
        this.updateMetaColor(isDark);
        localStorage.setItem(Constants.STORAGE_KEYS.theme, theme);
    },

    updateLogo(isDark) {
        if (!this.logo) return;
        this.logo.src = isDark ? Constants.RESOURCE_PATHS.logo.dark : Constants.RESOURCE_PATHS.logo.light;
    },

    updateMetaColor(isDark) {
        if (this.metaThemeColor) {
            this.metaThemeColor.setAttribute('content', isDark ? '#1a1a1a' : '#d76f30');
        }
    }
};

const Schema = {
    init() {
        try {
            if (document.querySelector('script[type="application/ld+json"]')) return;
            const data = this.generate();
            this.inject(data);
        } catch (error) {
            console.error('Schema: Failed to inject', error);
        }
    },

    generate() {
        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": "https://www.luisneves.dev/#website",
                    "url": "https://www.luisneves.dev/",
                    "name": "Luis Neves | Portfólio",
                    "inLanguage": "pt-BR",
                    "publisher": { "@id": "https://www.luisneves.dev/#person" }
                },
                {
                    "@type": "ProfilePage",
                    "@id": "https://www.luisneves.dev/#profile",
                    "url": "https://www.luisneves.dev/",
                    "name": "Luis Neves | Desenvolvedor Fullstack e Front-end",
                    "inLanguage": "pt-BR",
                    "isPartOf": { "@id": "https://www.luisneves.dev/#website" },
                    "about": { "@id": "https://www.luisneves.dev/#person" }
                },
                {
                    "@type": "Person",
                    "@id": "https://www.luisneves.dev/#person",
                    "name": "Luis Neves",
                    "jobTitle": "Desenvolvedor Fullstack e Front-end",
                    "url": "https://www.luisneves.dev/",
                    "description": "Desenvolvedor fullstack especializado em interfaces web performáticas, acessíveis e bem estruturadas.",
                    "image": "https://www.luisneves.dev/images/og-image.png",
                    "sameAs": [
                        "https://www.linkedin.com/in/luisneves-dev/",
                        "https://github.com/luisoneves"
                    ],
                    "knowsAbout": ["HTML", "CSS", "JavaScript", "TypeScript", "SEO técnico", "Acessibilidade"]
                }
            ]
        };
    },

    inject(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data, null, 2);
        document.head.appendChild(script);
    }
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    Theme.init();
    Schema.init();

    console.log(
        '%cLuis Neves | Developer',
        'background: #d76f30; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
    );
});

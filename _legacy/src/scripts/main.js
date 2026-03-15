/**
 * Main JS
 * - Constants
 * - Navigation (with scroll spy for aria-current)
 * - Theme
 * - Schema
 * - Init (I18n → Components → Navigation → Theme → Schema → Parallax)
 */
import { I18n } from './i18n.js';
import { Components } from './components.js';
import { Parallax } from './parallax.js';

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
    },

    rebindLinks() {
        this.links = document.querySelectorAll(Constants.DOM.navigation.links);
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    },

    validateElements() {
        return this.toggle && this.nav && this.header;
    },

    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleMenu());

        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        // Scroll spy for aria-current
        this._scrollSpyTicking = false;
        window.addEventListener('scroll', () => this.onScrollSpy(), { passive: true });
    },

    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    },

    openMenu() {
        this.isOpen = true;
        this.nav.classList.add('is-open');
        this.toggle.setAttribute('aria-expanded', 'true');

        const data = I18n.getData();
        this.toggle.setAttribute('aria-label', data.menuClose);
        this.toggle.textContent = data.menuClose;
        document.body.style.overflow = 'hidden';

        document.addEventListener('keydown', this.handleKeydown);
        document.addEventListener('click', this.handleClickOutside);
    },

    closeMenu() {
        this.isOpen = false;
        this.nav.classList.remove('is-open');
        this.toggle.setAttribute('aria-expanded', 'false');

        const data = I18n.getData();
        this.toggle.setAttribute('aria-label', data.menuOpen);
        this.toggle.textContent = 'Menu';
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
    },

    /** Scroll spy — sets aria-current on the closest section link */
    onScrollSpy() {
        if (this._scrollSpyTicking) return;
        this._scrollSpyTicking = true;

        requestAnimationFrame(() => {
            const links = document.querySelectorAll(Constants.DOM.navigation.links);
            const sections = document.querySelectorAll('main > section[id]');
            const scrollY = window.scrollY + 120;

            let currentId = '';
            sections.forEach(section => {
                if (section.offsetTop <= scrollY) {
                    currentId = section.id;
                }
            });

            links.forEach(link => {
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });

            this._scrollSpyTicking = false;
        });
    },
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
        this.toggleBtn = document.getElementById('experimental-theme-toggle');
        this.icon = document.getElementById('theme-icon');
        this.logo = document.getElementById('logo-navbar');
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
            const current = this.html.getAttribute('data-theme') || 'light';
            this.setTheme(current === 'dark' ? 'light' : 'dark');
        });

        document.addEventListener('keydown', (e) => {
            const shortcut = Constants.KEYBOARD.toggleTheme;
            if (e.ctrlKey === shortcut.ctrl && e.shiftKey === shortcut.shift && e.key === shortcut.key) {
                const current = this.html.getAttribute('data-theme') || 'light';
                this.setTheme(current === 'dark' ? 'light' : 'dark');
            }
        });
    },

    watchSystemTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem(Constants.STORAGE_KEYS.theme)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    },

    loadPreference() {
        const savedTheme = localStorage.getItem(Constants.STORAGE_KEYS.theme);
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemDark) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    },

    setTheme(theme) {
        this.html.classList.remove('dark');
        this.html.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            this.html.classList.add('dark');
            if (this.icon) this.icon.textContent = '◑';
        } else {
            if (this.icon) this.icon.textContent = '☼';
        }

        const isDark = theme === 'dark';
        this.updateLogo(isDark);
        this.updateMetaColor(isDark);
        localStorage.setItem(Constants.STORAGE_KEYS.theme, theme);
    },

    updateLogo(isDark) {
        if (!this.logo) return;
        this.logo.src = isDark ? Constants.RESOURCE_PATHS.logo.dark : Constants.RESOURCE_PATHS.logo.light;
    },

    updateMetaColor(isDark) {
        if (!this.metaThemeColor) return;
        this.metaThemeColor.setAttribute('content', isDark ? '#1a1a1a' : '#d76f30');
    }
};

const Schema = {
    init() {
        try {
            // Remove existing schema (for re-renders on lang switch)
            const existing = document.querySelector('script[type="application/ld+json"]');
            if (existing) existing.remove();

            const data = this.generate();
            this.inject(data);
        } catch (error) {
            console.error('Schema: Failed to inject', error);
        }
    },

    generate() {
        const locale = I18n.getLocale();
        const langData = I18n.getData();
        const inLanguage = locale === 'pt' ? 'pt-BR' : 'en';

        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": "https://www.luisneves.dev/#website",
                    "url": "https://www.luisneves.dev/",
                    "name": langData.meta.title,
                    "inLanguage": inLanguage,
                    "publisher": { "@id": "https://www.luisneves.dev/#person" }
                },
                {
                    "@type": "ProfilePage",
                    "@id": "https://www.luisneves.dev/#profile",
                    "url": "https://www.luisneves.dev/",
                    "name": langData.meta.title,
                    "inLanguage": inLanguage,
                    "isPartOf": { "@id": "https://www.luisneves.dev/#website" },
                    "about": { "@id": "https://www.luisneves.dev/#person" }
                },
                {
                    "@type": "Person",
                    "@id": "https://www.luisneves.dev/#person",
                    "name": "Luis Neves",
                    "jobTitle": locale === 'pt' ? 'Engenheiro de Software' : 'Software Engineer',
                    "url": "https://www.luisneves.dev/",
                    "description": langData.meta.description,
                    "image": "https://www.luisneves.dev/images/og-image.png",
                    "sameAs": [
                        "https://www.linkedin.com/in/luisneves-dev/",
                        "https://github.com/luisoneves"
                    ],
                    "knowsAbout": ["HTML", "CSS", "JavaScript", "TypeScript", "Software Architecture", "SaaS", "SEO"]
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
    // 1. I18n — detect locale, bind switcher
    I18n.init();

    // 2. Render components with locale data
    Components.init(I18n.getData());

    // 3. Navigation (after nav links are rendered)
    Navigation.init();
    Navigation.rebindLinks();

    // Setup I18n callback to re-render when language changes
    I18n.onChange = () => {
        Components.init(I18n.getData());
        Navigation.rebindLinks();
    };

    // 4. Theme & Schema
    Theme.init();
    Schema.init();

    // 5. Parallax watermark
    Parallax.init();

    console.log(
        '%cLuis Neves | Software Engineer',
        'background: #d76f30; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
    );
});

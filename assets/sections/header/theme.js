/**
 * Theme Manager Module
 * Handles light/dark mode toggling, persistence, system preferences, and accessible theme switching.
 */
import { DOM_SELECTORS, STORAGE_KEYS, RESOURCE_PATHS, KEYBOARD_SHORTCUTS, THEMES, A11Y_ATTRS } from '../../scripts/constants.js';

export class ThemeManager {
    constructor() {
        this.toggleBtn = document.getElementById(DOM_SELECTORS.theme.toggle.replace('#', ''));
        this.html = document.documentElement;
        this.logo = document.getElementById(DOM_SELECTORS.theme.logo.replace('#', ''));
        this.metaThemeColor = document.querySelector(DOM_SELECTORS.theme.metaThemeColor);
    }

    /**
     * Valida se os elementos DOM necessários existem
     * @returns {boolean}
     */
    validateElements() {
        if (!this.toggleBtn) {
            console.warn('ThemeManager: Missing toggle button element');
            return false;
        }
        return true;
    }

    init() {
        if (!this.validateElements()) return;

        this.loadPreference();
        this.bindEvents();

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem(STORAGE_KEYS.theme)) {
                this.setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
            }
        });
    }

    bindEvents() {
        this.toggleBtn.addEventListener('click', () => {
            const isDark = this.html.classList.contains('dark');
            this.setTheme(isDark ? THEMES.LIGHT : THEMES.DARK);
        });

        // Keyboard shortcut (Ctrl+Shift+D)
        document.addEventListener('keydown', (e) => {
            const shortcut = KEYBOARD_SHORTCUTS.toggleTheme;
            if (e.ctrlKey === shortcut.ctrl && e.shiftKey === shortcut.shift && e.key === shortcut.key) {
                const isDark = this.html.classList.contains('dark');
                this.setTheme(isDark ? THEMES.LIGHT : THEMES.DARK);
            }
        });
    }

    loadPreference() {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemDark) {
            this.setTheme(THEMES.DARK);
        } else {
            this.setTheme(THEMES.LIGHT);
        }
    }

    setTheme(theme) {
        const isDark = theme === THEMES.DARK;

        if (isDark) {
            this.html.classList.add('dark');
        } else {
            this.html.classList.remove('dark');
        }

        this.updateLogo(isDark);
        this.updateMetaColor(isDark);
        localStorage.setItem(STORAGE_KEYS.theme, theme);
    }

    updateLogo(isDark) {
        if (!this.logo) return;
        this.logo.src = isDark ? RESOURCE_PATHS.logo.dark : RESOURCE_PATHS.logo.light;
    }

    updateMetaColor(isDark) {
        if (this.metaThemeColor) {
            this.metaThemeColor.setAttribute('content', isDark ? '#1a1a1a' : '#d76f30');
        }
    }
}

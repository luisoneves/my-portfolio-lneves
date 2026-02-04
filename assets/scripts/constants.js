/**
 * Constantes globais do projeto
 * Centraliza seletores DOM, paths, storage keys e atalhos de teclado
 */

// Seletores DOM para facilitar manutenção
export const DOM_SELECTORS = {
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
};

// Chaves de armazenamento local
export const STORAGE_KEYS = {
    theme: 'theme-preference'
};

// Paths para recursos (imagens, etc)
export const RESOURCE_PATHS = {
    logo: {
        light: './assets/images/logo-LN_ligthmode.png', // Arquivo tem typo no nome original
        dark: './assets/images/logo-LN_darkmode.png'
    }
};

// Atalhos de teclado
export const KEYBOARD_SHORTCUTS = {
    toggleTheme: {
        ctrl: true,
        shift: true,
        key: 'D'
    },
    closeMenu: {
        key: 'Escape'
    }
};

// Temas disponíveis
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

// Atributos de acessibilidade
export const A11Y_ATTRS = {
    ariaExpanded: 'aria-expanded',
    ariaLabel: 'aria-label',
    ariaHidden: 'aria-hidden'
};

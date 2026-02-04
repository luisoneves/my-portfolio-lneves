/**
 * Mobile Menu Toggle Module
 * Handles mobile menu interactions, focus management, keyboard navigation, and accessibility.
 */
import { DOM_SELECTORS, A11Y_ATTRS } from '../../scripts/constants.js';

export class MobileMenuToggle {
    constructor() {
        this.toggle = document.querySelector(DOM_SELECTORS.navigation.toggle);
        this.nav = document.querySelector(DOM_SELECTORS.navigation.nav);
        this.header = document.querySelector(DOM_SELECTORS.navigation.header);
        this.links = document.querySelectorAll(DOM_SELECTORS.navigation.links);

        this.isOpen = false;
        this.boundHandleKeydown = this.handleKeydown.bind(this);
        this.boundHandleClickOutside = this.handleClickOutside.bind(this);
    }

    /**
     * Valida se os elementos DOM necessários existem
     * @returns {boolean}
     */
    validateElements() {
        const missing = [];
        if (!this.toggle) missing.push('nav-toggle');
        if (!this.nav) missing.push('site-nav');
        if (!this.header) missing.push('site-header');

        if (missing.length > 0) {
            console.warn(`MobileMenuToggle: Missing DOM elements: ${missing.join(', ')}`);
            return false;
        }
        return true;
    }

    init() {
        if (!this.validateElements()) return;
        this.bindEvents();
    }

    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleMenu());

        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.nav.classList.add('is-open'); // Updated class name per plan
        this.toggle.setAttribute('aria-expanded', 'true');
        this.toggle.setAttribute('aria-label', 'Fechar menu');

        document.body.style.overflow = 'hidden'; // Prevent scrolling
        document.addEventListener('keydown', this.boundHandleKeydown);
        document.addEventListener('click', this.boundHandleClickOutside);
    }

    closeMenu() {
        this.isOpen = false;
        this.nav.classList.remove('is-open');
        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.setAttribute('aria-label', 'Abrir menu');

        document.body.style.overflow = '';
        document.removeEventListener('keydown', this.boundHandleKeydown);
        document.removeEventListener('click', this.boundHandleClickOutside);
    }

    handleKeydown(event) {
        if (event.key === 'Escape') {
            this.closeMenu();
        }
    }

    handleClickOutside(event) {
        if (!this.nav.contains(event.target) && !this.toggle.contains(event.target)) {
            this.closeMenu();
        }
    }
}

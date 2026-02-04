/**
 * Main Application Entry Point
 * Orchestrates the initialization of all modules with centralized configuration.
 */
import { MobileMenuToggle } from '../sections/header/navigation.js';
import { ThemeManager } from '../sections/header/theme.js';
import { StructuredDataInjector } from '../sections/meta/schema.js';

class App {
    constructor() {
        this.mobileMenu = new MobileMenuToggle();
        this.theme = new ThemeManager();
        this.structuredData = new StructuredDataInjector();
    }

    init() {
        // Initialize Mobile Menu
        try {
            this.mobileMenu.init();
        } catch (error) {
            console.error('App: Failed to initialize MobileMenuToggle', error);
        }

        // Initialize Theme Manager
        try {
            this.theme.init();
        } catch (error) {
            console.error('App: Failed to initialize ThemeManager', error);
        }

        // Initialize Structured Data
        try {
            this.structuredData.init();
        } catch (error) {
            console.error('App: Failed to initialize StructuredDataInjector', error);
        }

        this.logSignature();
    }

    logSignature() {
        console.log(
            '%cLuis Neves | Developer',
            'background: #d76f30; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
        );
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

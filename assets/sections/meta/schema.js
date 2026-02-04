/**
 * Structured Data Injector Module
 * Generates and injects JSON-LD structured data for SEO optimization.
 */
import { DOM_SELECTORS } from '../../scripts/constants.js';

export class StructuredDataInjector {
    init() {
        try {
            const schemaData = this.generateSchema();
            this.injectSchema(schemaData);
        } catch (error) {
            console.error('StructuredDataInjector: Failed to inject schema', error);
        }
    }

    generateSchema() {
        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": "https://www.luisneves.dev/#website",
                    "url": "https://www.luisneves.dev/",
                    "name": "Luis Neves | Portfólio",
                    "inLanguage": "pt-BR",
                    "publisher": {
                        "@id": "https://www.luisneves.dev/#person"
                    }
                },
                {
                    "@type": "ProfilePage",
                    "@id": "https://www.luisneves.dev/#profile",
                    "url": "https://www.luisneves.dev/",
                    "name": "Luis Neves | Desenvolvedor Fullstack e Front-end",
                    "inLanguage": "pt-BR",
                    "isPartOf": {
                        "@id": "https://www.luisneves.dev/#website"
                    },
                    "about": {
                        "@id": "https://www.luisneves.dev/#person"
                    }
                },
                {
                    "@type": "Person",
                    "@id": "https://www.luisneves.dev/#person",
                    "name": "Luis Neves",
                    "jobTitle": "Desenvolvedor Fullstack e Front-end",
                    "url": "https://www.luisneves.dev/",
                    "description": "Desenvolvedor fullstack especializado em interfaces web performáticas, acessíveis e bem estruturadas.",
                    // Updated path to assets
                    "image": "https://www.luisneves.dev/assets/images/og-image.png",
                    "sameAs": [
                        "https://www.linkedin.com/in/luisneves-dev/",
                        "https://github.com/luisoneves"
                    ],
                    "knowsAbout": [
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "TypeScript",
                        "SEO técnico",
                        "Acessibilidade"
                    ]
                }
            ]
        };
    }

    injectSchema(data) {
        // Check if schema already exists to prevent duplicates
        const existingSchema = document.querySelector('script[type="application/ld+json"]');
        if (existingSchema) {
            console.warn('StructuredDataInjector: Schema already injected, skipping');
            return;
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data, null, 2);
        document.head.appendChild(script);
    }
}

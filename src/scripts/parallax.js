/**
 * Parallax — Lightweight scroll-based watermark movement
 * Uses requestAnimationFrame for smooth, performant animation.
 * Respects prefers-reduced-motion.
 */

export const Parallax = {
    FACTOR: 0.08,
    element: null,
    ticking: false,

    init() {
        this.element = document.querySelector('.watermark');
        if (!this.element) return;

        // Respect reduced motion preference
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReduced.matches) {
            this.element.style.transform = 'translate(-50%, -50%)';
            return;
        }

        // Watch for changes to reduced motion preference
        prefersReduced.addEventListener('change', (e) => {
            if (e.matches) {
                this.element.style.transform = 'translate(-50%, -50%)';
                window.removeEventListener('scroll', this.onScroll);
            } else {
                this.bindScroll();
            }
        });

        this.bindScroll();
    },

    bindScroll() {
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener('scroll', this.onScroll, { passive: true });
    },

    onScroll() {
        if (this.ticking) return;
        this.ticking = true;

        requestAnimationFrame(() => {
            const scrollY = window.scrollY || window.pageYOffset;
            const offset = scrollY * this.FACTOR;
            this.element.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
            this.ticking = false;
        });
    },
};

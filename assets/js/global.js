(function () {
    const nav = document.querySelector('.top-nav');
    if (!nav) {
        return;
    }

    const navLinks = nav.querySelector('.nav-links');
    const toggle = nav.querySelector('.nav-toggle');

    const updateNavElevation = () => {
        if (window.scrollY > 12) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }
    };

    updateNavElevation();
    window.addEventListener('scroll', updateNavElevation, { passive: true });

    if (toggle && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        };

        toggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 880px)').matches) {
                    closeMenu();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (!window.matchMedia('(max-width: 880px)').matches) {
                closeMenu();
            }
        });

        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && navLinks.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }
})();


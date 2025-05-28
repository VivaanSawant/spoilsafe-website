document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-title', {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out'
    });

    // Step animations
    const steps = gsap.utils.toArray('.step');
    
    steps.forEach((step, i) => {
        const disc = step.querySelector('.step-disc');
        const title = step.querySelector('.step-title');
        const bullets = step.querySelectorAll('.bullet');

        // Step container animation
        gsap.to(step, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: step,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });

        // Title animation (slide in + glow)
        gsap.to(title, {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        // Disc rotation and glow
        gsap.to(disc, {
            rotationY: 180,
            duration: 1.5,
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
                end: "top 30%",
                scrub: 0.5
            }
        });

        // Bullet checkmarks (sequential animation)
        bullets.forEach((bullet, j) => {
            ScrollTrigger.create({
                trigger: bullet,
                start: "top 80%",
                onEnter: () => bullet.classList.add('active'),
                once: true
            });
        });

        // Final disc color shift
        if (i === 2) {
            gsap.to(disc, {
                borderColor: '#00ff95',
                boxShadow: '0 0 20px rgba(0, 255, 149, 0.4)',
                scrollTrigger: {
                    trigger: step,
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            });
        }
    });

    // Background parallax effect
    gsap.to('.hero::before', {
        backgroundPosition: '50% 20%',
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
});
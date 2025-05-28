// vision.js - Scroll-triggered animations for SpoilSafe Vision Page
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero elements on load
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

    // Scroll-triggered animations for steps
    const steps = gsap.utils.toArray('.step');
    
    steps.forEach((step, i) => {
        const disc = step.querySelector('.step-disc');
        
        // Step fade-in + slide-up animation
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

        // Disc rotation and glow intensity
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

        // Pulsing ring effect (different timing per disc)
        gsap.to(disc, {
            scale: 1.05,
            boxShadow: `0 0 30px rgba(0, 247, 255, 0.5)`,
            duration: 2,
            repeat: -1,
            yoyo: true,
            delay: i * 0.3
        });

        // Color shift for final disc
        if (i === 2) {
            gsap.to(disc, {
                borderColor: '#00ff95',
                boxShadow: `0 0 20px rgba(0, 255, 149, 0.4)`,
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

    // Hover effects for step titles
    document.querySelectorAll('.step-title').forEach(title => {
        title.addEventListener('mouseenter', () => {
            gsap.to(title, {
                textShadow: '0 0 15px var(--glow-primary)',
                duration: 0.3
            });
        });
        title.addEventListener('mouseleave', () => {
            gsap.to(title, {
                textShadow: 'none',
                duration: 0.3
            });
        });
    });
});
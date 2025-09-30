document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                    
                    // Start typing animation if it's the description element
                    if (entry.target.id === 'typewriter' && !entry.target.dataset.typed) {
                        entry.target.dataset.typed = 'true';
                        typeText(entry.target);
                    }
                });
            }
        });
    }, {
        threshold: 0.1,  // Reduced threshold to trigger earlier
        rootMargin: '50px'  // Added margin to trigger before element is fully in view
    });

    // Observe all steps and the description
    document.querySelectorAll('.step, .description').forEach((element) => {
        observer.observe(element);
    });

    function typeText(element) {
        const text = `SpoilSafe is a smart sensor system designed to revolutionize how we monitor food freshness. By tracking gas concentrations and key environmental factors like temperature and humidity, SpoilSafe can detect early signs of spoilage. Our goal is to prevent food waste at the source — whether in homes, restaurants, or large-scale supply chains — by delivering actionable insights before spoilage happens.`;
        let i = 0;
        element.textContent = '';

        function typeNextChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeNextChar, 15);
            }
        }

        typeNextChar();
    }
}); 
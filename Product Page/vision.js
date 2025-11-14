document.addEventListener('DOMContentLoaded', () => {
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

  // Exploded View Animation
  class ExplodedAnimation {
    constructor() {
      this.totalFrames = 61;
      this.container = document.getElementById('exploded-container');
      this.images = [];
      this.currentFrame = 0;
      this.section = document.querySelector('.exploded-section');
      this.scrollTrigger = null;
      this.init();
    }

    init() {
      this.loadImages();
      this.createScrollTrigger();
      window.addEventListener('resize', () => {
        if (this.scrollTrigger) {
          this.scrollTrigger.refresh();
        }
      });
    }

    loadImages() {
      if (!this.container) {
        console.warn('[ExplodedAnimation] #exploded-container not found; skipping frame load');
        return;
      }
      const basePath = 'Casing_Advika_v33_frames';
      for (let i = 0; i < this.totalFrames; i++) {
        const img = document.createElement('img');
        img.src = `${basePath}/Casing_Advika v33_${String(i + 1).padStart(4, '0')}.jpg`;
        img.alt = `Exploded Frame ${i + 1}`;
        img.className = 'exploded-image';
        img.loading = 'lazy';
        if (i === 0) img.classList.add('active');
        this.container.appendChild(img);
        this.images.push(img);
      }
    }

    createScrollTrigger() {
      if (!this.section || !this.images.length || typeof ScrollTrigger === 'undefined') return;

      const animationContainer = document.querySelector('.exploded-animation-container');
      if (!animationContainer) return;

      this.scrollTrigger = ScrollTrigger.create({
        trigger: this.section,
        start: 'top top',
        end: 'bottom bottom',
        pin: animationContainer,
        pinSpacing: false,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const frameIndex = Math.min(
            this.totalFrames - 1,
            Math.floor(progress * this.totalFrames)
          );
          this.updateFrame(frameIndex);
        }
      });
    }

    updateFrame(frameIndex) {
      if (frameIndex === this.currentFrame || !this.images.length) return;
      const previousImage = this.images[this.currentFrame];
      previousImage?.classList.remove('active');
      const nextImage = this.images[frameIndex];
      nextImage?.classList.add('active');
      this.currentFrame = frameIndex;
    }
  }

  new ExplodedAnimation();

  // Overlay text animations
  function setupExplodedText() {
    const section = document.querySelector('.exploded-section');
    if (!section) return;

    const steps = [
      { id: "#exploded-step1", progressStart: 0, progressEnd: 0.33 },
      { id: "#exploded-step2", progressStart: 0.33, progressEnd: 0.66 },
      { id: "#exploded-step3", progressStart: 0.66, progressEnd: 1.0 }
    ];

    steps.forEach((step) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: ({ progress }) => {
          const element = document.querySelector(step.id);
          if (!element) return;
          
          if (progress >= step.progressStart && progress <= step.progressEnd) {
            const localProgress = (progress - step.progressStart) / (step.progressEnd - step.progressStart);
            const opacity = Math.min(1, localProgress * 3);
            const translateY = Math.max(0, 30 - (localProgress * 30));
            element.style.opacity = opacity;
            element.style.transform = `translateY(${translateY}px)`;
          } else if (progress > step.progressEnd) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
          } else {
            element.style.opacity = 0;
            element.style.transform = 'translateY(30px)';
          }
        }
      });
    });
  }


  setupExplodedText();
});

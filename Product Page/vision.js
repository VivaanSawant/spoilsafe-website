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
      this.startOffset = 0;
      this.endOffset = 0;
      this.init();
    }

    init() {
      this.loadImages();
      this.calculateOffsets();
      window.addEventListener('scroll', () => this.handleScroll());
      window.addEventListener('resize', () => this.calculateOffsets());
    }  

    loadImages() {
      for (let i = 0; i < this.totalFrames; i++) {
        const img = document.createElement('img');
        img.src = `casing_advika_v33_frames/Casing_Advika v33_${String(i + 1).padStart(4, '0')}.jpg`;
        img.alt = `Exploded Frame ${i + 1}`;
        img.className = 'exploded-image';
        if (i === 0) img.classList.add('active');
        this.container.appendChild(img);
        this.images.push(img);
      }
    }

    calculateOffsets() {
      this.startOffset = this.section.offsetTop;
      this.endOffset = this.startOffset + this.section.offsetHeight - window.innerHeight;
    }

    handleScroll() {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max((scrollY - this.startOffset) / (this.endOffset - this.startOffset), 0), 1);
      const frameIndex = Math.min(this.totalFrames - 1, Math.floor(progress * this.totalFrames));
      if (frameIndex !== this.currentFrame) {
        this.images[this.currentFrame].classList.remove('active');
        this.images[frameIndex].classList.add('active');
        this.currentFrame = frameIndex;
      }
    }
  }

  new ExplodedAnimation();

  // Overlay text animations
  function setupExplodedText() {
  const steps = [
    { id: "#exploded-step1", start: "top center" },
    { id: "#exploded-step2", start: "top center+=300" },
    { id: "#exploded-step3", start: "top center+=600" }
  ];

  steps.forEach((step) => {
    gsap.to(step.id, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".exploded-section",
        start: step.start,
        toggleActions: "play none none none", // fade in only
        scrub: false
      }
    });
  });
}


  setupExplodedText();
});

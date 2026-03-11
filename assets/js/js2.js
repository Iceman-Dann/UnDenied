// Hero Animations
window.addEventListener('load', () => {
    if (prefersReducedMotion) {
        gsap.set('.hero-label-text, .hero-cta, .hero-privacy', { opacity: 1 });
        gsap.set('.denied-stamp', { opacity: 1, scale: 1 });
        return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Nav reveal
    tl.fromTo('.nav-left', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1 }, 0.2);

    // Label reveal
    tl.to('.hero-label-line', { width: 40, duration: 0.8 }, 0);
    tl.to('.hero-label-text', { opacity: 1, duration: 0.8 }, 0.8);

    // Headline SplitType
    const heroLines = new SplitType('.hero-headline .line', { types: 'chars' });
    tl.from(heroLines.chars, {
        y: 80, opacity: 0, rotateX: -90, transformOrigin: "0% 50% -50",
        stagger: 0.02, duration: 0.8, ease: "back.out(1.7)"
    }, 0.3);

    // Subheadline SplitType
    const subLines = new SplitType('.hero-subheadline', { types: 'lines' });
    tl.from(subLines.lines, { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, 1.4);

    // CTA & Privacy
    tl.to('.hero-cta', { opacity: 1, duration: 0.8 }, 1.8);
    tl.to('.hero-privacy', { opacity: 1, duration: 0.8 }, 2.0);

    // Stamp Reveal
    tl.fromTo('.denied-stamp',
        { scale: 2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.12, ease: "power4.out" }, 2.2
    );
    tl.to('.denied-stamp', { boxShadow: "0 0 0 1px rgba(139,26,26,0.2), 0 0 40px rgba(139,26,26,0.5)", duration: 0.3, yoyo: true, repeat: 1 }, 2.32);
});

// Magnetic Button Effect
if (!prefersReducedMotion && window.innerWidth > 768) {
    const magneticButtons = document.querySelectorAll('.magnetic');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.4, y: y * 0.4,
                duration: 0.6, ease: "power3.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0, y: 0,
                duration: 0.8, ease: "elastic.out(1, 0.4)"
            });
        });
    });
}

// Hero Letter 3D Tilt & Parallax
if (!prefersReducedMotion && window.innerWidth > 768) {
    const heroRight = document.querySelector('.hero-right');
    const letterWrapper = document.querySelector('.letter-wrapper');

    heroRight.addEventListener('mousemove', (e) => {
        const rect = heroRight.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(letterWrapper, {
            rotateY: x * 16, rotateX: -y * 16,
            duration: 0.6, ease: "power2.out", transformOrigin: "center center"
        });
    });

    heroRight.addEventListener('mouseleave', () => {
        gsap.to(letterWrapper, {
            rotateY: 0, rotateX: 0,
            duration: 1.2, ease: "elastic.out(1, 0.5)"
        });
    });

    gsap.to(letterWrapper, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: "body", start: "top top", end: "bottom top", scrub: true
        }
    });
}

// Hero Letter Crack & Shatter on CTA interaction
if (!prefersReducedMotion) {
    const heroCta = document.querySelector('.hero-cta');
    const crack = document.querySelector('.letter-crack');
    const letterWrapper = document.querySelector('.letter-wrapper');

    heroCta.addEventListener('mouseenter', () => {
        gsap.to(crack, { opacity: 0.5, duration: 0.5 });
    });
    heroCta.addEventListener('mouseleave', () => {
        gsap.to(crack, { opacity: 0 });
    });
    /* Shatter effect left to user implementation constraints - simplified for basic requirements */
}

// Scroll Indicator Yoyo
if (!prefersReducedMotion) {
    gsap.to('.scroll-indicator', {
        y: 10, duration: 1.2, ease: "power1.inOut", yoyo: true, repeat: -1
    });

    ScrollTrigger.create({
        trigger: "body",
        start: "top -10",
        onUpdate: () => gsap.to('.scroll-indicator', { opacity: 0, duration: 0.3 })
    });
}

// Horizontal Stats Pin
if (!prefersReducedMotion && window.innerWidth > 768) {
    const statsContainer = document.querySelector('.stats');
    const statsStrip = document.querySelector('.stats-strip');

    gsap.to(statsStrip, {
        x: () => -(statsStrip.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: statsContainer,
            pin: true, scrub: 1, end: () => "+=" + statsStrip.scrollWidth
        }
    });

    const updateCounter = (element, endValue) => {
        gsap.to(element, {
            innerHTML: endValue,
            duration: 2,
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: element.closest('.stat-panel'), containerAnimation: (gsap.getTweensOf(statsStrip)[0] || null), start: "left center", toggleActions: "play none none reverse"
            }
        });
    };

    const statPanels = document.querySelectorAll('.stat-panel');
    statPanels.forEach((panel, i) => {
        const content = panel.querySelector('.stat-content');
        const divider = panel.querySelector('.stat-divider');
        const numbers = [7, 80, 80, 200];

        gsap.to(content, {
            opacity: 1, duration: 0.5,
            scrollTrigger: {
                trigger: panel, containerAnimation: (gsap.getTweensOf(statsStrip)[0] || null), start: "left 75%", toggleActions: "play none none reverse"
            }
        });

        gsap.to(divider, {
            height: 60, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
                trigger: panel, containerAnimation: (gsap.getTweensOf(statsStrip)[0] || null), start: "left 75%", toggleActions: "play none none reverse"
            }
        });

        updateCounter(panel.querySelector('.stat-number'), numbers[i]);
    });
} else if (window.innerWidth <= 768) {
    // Mobile fallback for stats
    const statPanels = document.querySelectorAll('.stat-panel');
    statPanels.forEach((panel, i) => {
        const content = panel.querySelector('.stat-content');
        gsap.to(content, {
            opacity: 1, duration: 0.8,
            scrollTrigger: { trigger: panel, start: "top 80%" }
        });
        const num = panel.querySelector('.stat-number');
        num.innerHTML = [7, 80, 80, "200M"][i]; // Simple static assignment for mobile
    });
}

// How It Works
if (!prefersReducedMotion) {
    gsap.to('.how .section-label', {
        clipPath: "inset(0 0% 0 0)", duration: 0.8,
        scrollTrigger: { trigger: ".how", start: "top 80%" }
    });

    if (window.innerWidth > 768) {
        gsap.to('.how-dot', {
            x: () => document.querySelector('.how-connector').offsetWidth,
            ease: "none",
            scrollTrigger: { trigger: ".how", start: "top center", end: "bottom center", scrub: 1 }
        });
    }

    const howCards = document.querySelectorAll('.how-card');
    howCards.forEach((card, i) => {
        gsap.to(card, {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: i * 0.2,
            scrollTrigger: { trigger: ".how", start: "top 60%" }
        });

        const svgPaths = card.querySelectorAll('svg path, svg rect, svg circle, svg line');
        gsap.to(svgPaths, {
            strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut",
            scrollTrigger: { trigger: card, start: "top 75%" }
        });
    });
} else {
    gsap.set('.how-card, .how .section-label', { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" });
    gsap.set('.how-icon svg path, .how-icon svg rect, .how-icon svg circle, .how-icon svg line', { strokeDashoffset: 0 });
}

// Document Types
if (!prefersReducedMotion) {
    const docTitleChars = new SplitType('.docs-title', { types: 'chars' });
    gsap.from(docTitleChars.chars, {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.03,
        scrollTrigger: { trigger: ".docs-header", start: "top 80%" }
    });

    const docCards = document.querySelectorAll('.doc-card');
    docCards.forEach((card, i) => {
        const row = Math.floor(i / 3);
        gsap.from(card, {
            y: 50, opacity: 0, duration: 0.8, ease: "power2.out", delay: (i % 3) * 0.1 + row * 0.2,
            scrollTrigger: { trigger: ".docs-grid", start: "top 75%" }
        });
    });
} else {
    gsap.set('.docs-title, .doc-card', { opacity: 1, y: 0 });
}

// Privacy Pin
if (!prefersReducedMotion) {
    const pContainer = document.querySelector('.privacy');

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: pContainer, start: "top top", end: "bottom bottom", scrub: 1
        }
    });

    const promises = document.querySelectorAll('.privacy-line');
    promises.forEach((p, i) => {
        tl.to(p, { opacity: 1, y: 0, duration: 1 }, i * 2);
        if (i > 0) tl.to(promises[i - 1], { opacity: 0.3, duration: 0.5 }, i * 2);
    });
    tl.to(promises, { color: "var(--brass)", duration: 1, textShadow: "0 0 20px rgba(154,123,79,0.5)" }, "+=1");
    tl.to('.privacy-desc', { opacity: 1, duration: 1 }, "-=0.5");
} else {
    gsap.set('.privacy, .privacy-inner', { height: 'auto', position: 'relative' });
    gsap.set('.privacy-line, .privacy-desc', { opacity: 1, y: 0, position: 'relative' });
}

// Marquee
if (!prefersReducedMotion) {
    const marqueeInner = document.querySelector('.marquee-inner');
    const marqueeTl = gsap.to(marqueeInner, {
        xPercent: -33.33, duration: 30, ease: "none", repeat: -1
    });

    document.querySelector('.marquee').addEventListener('mouseenter', () => marqueeTl.timeScale(0.33));
    document.querySelector('.marquee').addEventListener('mouseleave', () => marqueeTl.timeScale(1));

    if (lenis) {
        lenis.on('scroll', ({ velocity }) => {
            gsap.to(marqueeTl, { timeScale: velocity > 0 ? 1 : -1, duration: 0.5 });
        });
    }
}

// Mission Strip
if (!prefersReducedMotion) {
    const missionLines = new SplitType('.mission-text', { types: 'lines' });
    gsap.from(missionLines.lines, {
        clipPath: "inset(0 100% 0 0)", duration: 1, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: ".mission", start: "top 60%" }
    });
} else {
    gsap.set('.mission-text', { clipPath: "inset(0 0% 0 0)" });
}

// Final CTA
if (!prefersReducedMotion) {
    const finalChars = new SplitType('.final-title', { types: 'chars' });
    gsap.from(finalChars.chars, {
        y: 60, opacity: 0, rotateX: -90, transformOrigin: "0% 50% -50",
        stagger: 0.02, duration: 0.8, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".final", start: "top 80%" }
    });

    gsap.to('.final-sub', {
        y: 0, opacity: 1, duration: 0.8, delay: 0.4,
        scrollTrigger: { trigger: ".final", start: "top 80%" }
    });
} else {
    gsap.set('.final-title .char, .final-sub', { opacity: 1, y: 0, rotateX: 0 });
}

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

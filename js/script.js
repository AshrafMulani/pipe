document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const navLink = document.querySelector(`.nav-menu a[href="#${section.id}"]`);

            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });

        lastScroll = currentScroll;
    });

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-nav .dot');
    const prevArrow = document.querySelector('.arrow-prev');
    const nextArrow = document.querySelector('.arrow-next');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startSlideTimer() {
        stopSlideTimer();
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideTimer() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    if (slides.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                startSlideTimer();
            });
        });

        if (prevArrow) prevArrow.addEventListener('click', () => {
            prevSlide();
            startSlideTimer();
        });

        if (nextArrow) nextArrow.addEventListener('click', () => {
            nextSlide();
            startSlideTimer();
        });

        const hero = document.querySelector('.hero');

        if (hero) {
            hero.addEventListener('mouseenter', stopSlideTimer);
            hero.addEventListener('mouseleave', startSlideTimer);

            let touchStartX = 0;
            let touchEndX = 0;

            hero.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
                stopSlideTimer();
            }, { passive: true });

            hero.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) nextSlide();
                    else prevSlide();
                }

                startSlideTimer();
            }, { passive: true });
        }

        startSlideTimer();
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.counter, .stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (!target) return;

            const current = parseInt(counter.innerText);
            if (current >= target) return;

            const increment = Math.ceil(target / 80);

            const updateCounter = () => {
                const currentVal = parseInt(counter.innerText);

                if (currentVal < target) {
                    counter.innerText = Math.min(currentVal + increment, target);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    }

    const statsSection = document.querySelector('.stats-counter');
    const heroStats = document.querySelector('.hero-stats');
    let countersAnimated = false;

    function checkCounterVisibility() {
        if (countersAnimated) return;

        [statsSection, heroStats].forEach(el => {
            if (!el) return;

            const rect = el.getBoundingClientRect();

            if (rect.top < window.innerHeight - 100) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }

    setTimeout(checkCounterVisibility, 500);
    window.addEventListener('scroll', checkCounterVisibility);

    const testCards = document.querySelectorAll('.testimonial-card');
    const testDots = document.querySelectorAll('.test-dots .dot');
    const testPrev = document.querySelector('.testimonials-nav .prev');
    const testNext = document.querySelector('.testimonials-nav .next');
    let currentTestimonial = 0;
    let testInterval;

    function showTestimonial(index) {
        if (index < 0) index = testCards.length - 1;
        if (index >= testCards.length) index = 0;

        testCards.forEach(card => card.classList.remove('active'));
        testDots.forEach(dot => dot.classList.remove('active'));

        testCards[index].classList.add('active');
        testDots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }

    function prevTestimonial() {
        showTestimonial(currentTestimonial - 1);
    }

    function startTestTimer() {
        stopTestTimer();
        testInterval = setInterval(nextTestimonial, 4000);
    }

    function stopTestTimer() {
        if (testInterval) {
            clearInterval(testInterval);
            testInterval = null;
        }
    }

    if (testCards.length > 0) {
        testDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                startTestTimer();
            });
        });

        if (testPrev) testPrev.addEventListener('click', () => {
            prevTestimonial();
            startTestTimer();
        });

        if (testNext) testNext.addEventListener('click', () => {
            nextTestimonial();
            startTestTimer();
        });

        const testSlider = document.querySelector('.testimonials-slider');

        if (testSlider) {
            testSlider.addEventListener('mouseenter', stopTestTimer);
            testSlider.addEventListener('mouseleave', startTestTimer);
        }

        startTestTimer();
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - navbar.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.pageYOffset > 500);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    console.log('✅ SIMMC Website initialized successfully!');
});
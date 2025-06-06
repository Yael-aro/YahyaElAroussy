 // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Dynamic skill cards animation on hover
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Project cards interactive hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotateX(5deg)';
                this.style.boxShadow = '0 25px 35px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
                this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            });
        });

        // Contact items interactive effects
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });

        // Add typing effect to hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing effect after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const heroTitle = document.querySelector('.hero h1');
                const originalText = heroTitle.textContent;
                typeWriter(heroTitle, originalText, 100);
            }, 1000);
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Add click ripple effect to buttons
        document.querySelectorAll('.cta-button, .skill-card, .project-card').forEach(element => {
            element.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Mobile menu toggle (for future enhancement)
        function createMobileMenu() {
            const nav = document.querySelector('.nav-container');
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.style.cssText = `
                display: none;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--primary-color);
            `;
            
            // Add mobile menu button
            nav.appendChild(mobileMenuBtn);
            
            // Mobile responsive behavior
            function checkMobile() {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.style.display = 'block';
                } else {
                    mobileMenuBtn.style.display = 'none';
                }
            }
            
            window.addEventListener('resize', checkMobile);
            checkMobile();
        }

        // Initialize mobile menu
        createMobileMenu();

        // Add smooth reveal animation for sections
        function revealOnScroll() {
            const sections = document.querySelectorAll('.section');
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionVisible = 150;
                
                if (sectionTop < window.innerHeight - sectionVisible) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });
        }

        window.addEventListener('scroll', revealOnScroll);

        // Add floating action button for contact
        function createFloatingActionButton() {
            const fab = document.createElement('div');
            fab.innerHTML = '💬';
            fab.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: var(--primary-color);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: var(--shadow);
                z-index: 1000;
                transition: all 0.3s ease;
                animation: float-fab 3s ease-in-out infinite;
            `;
            
            fab.addEventListener('click', () => {
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth'
                });
            });
            
            fab.addEventListener('mouseenter', () => {
                fab.style.transform = 'scale(1.1)';
                fab.style.background = 'var(--accent-color)';
            });
            
            fab.addEventListener('mouseleave', () => {
                fab.style.transform = 'scale(1)';
                fab.style.background = 'var(--primary-color)';
            });
            
            document.body.appendChild(fab);
        }

        // Add floating animation for FAB
        const fabStyle = document.createElement('style');
        fabStyle.textContent = `
            @keyframes float-fab {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(fabStyle);

        // Initialize floating action button
        createFloatingActionButton();

        // Add loading animation
        function showLoadingAnimation() {
            const loader = document.createElement('div');
            loader.id = 'loader';
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--gradient);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            `;
            
            loader.innerHTML = `
                <div style="
                    color: white;
                    text-align: center;
                    font-size: 1.5rem;
                    font-weight: 600;
                ">
                    <div style="
                        width: 50px;
                        height: 50px;
                        border: 4px solid rgba(255,255,255,0.3);
                        border-top: 4px solid white;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 1rem;
                    "></div>
                    Chargement du portfolio...
                </div>
            `;
            
            document.body.appendChild(loader);
            
            // Hide loader after page load
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.remove();
                    }, 500);
                }, 1000);
            });
        }

        // Add spinner animation
        const spinnerStyle = document.createElement('style');
        spinnerStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinnerStyle);

        // Initialize loading animation
        if (document.readyState === 'loading') {
            showLoadingAnimation();
        }

        // Add scroll progress indicator
        function createScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: var(--gradient);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }

        // Initialize scroll progress
        createScrollProgress();

        // Add easter egg - Konami code
        let konamiCode = [];
        const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            konamiCode = konamiCode.slice(-10);
            
            if (konamiCode.join(',') === konami.join(',')) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s infinite';
                
                const easterEgg = document.createElement('div');
                easterEgg.innerHTML = '🎉 Code Konami activé! Développeur passionné détecté! 🎉';
                easterEgg.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--gradient);
                    color: white;
                    padding: 2rem;
                    border-radius: 15px;
                    font-size: 1.2rem;
                    text-align: center;
                    z-index: 10000;
                    animation: bounce 1s infinite;
                `;
                
                document.body.appendChild(easterEgg);
                
                setTimeout(() => {
                    easterEgg.remove();
                    document.body.style.animation = '';
                }, 3000);
            }
        });

        // Add rainbow and bounce animations
        const easterEggStyle = document.createElement('style');
        easterEggStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
                40% { transform: translate(-50%, -50%) translateY(-10px); }
                60% { transform: translate(-50%, -50%) translateY(-5px); }
            }
        `;
        document.head.appendChild(easterEggStyle);

        console.log('🚀 Portfolio de Yahya El Arousy chargé avec succès!');
        console.log('💡 Astuce: Essayez le code Konami (↑↑↓↓←→←→BA) pour une surprise!');
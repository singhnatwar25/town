// JavaScript for Coworking Town Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href*="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const hashIndex = href.indexOf('#');
            if (hashIndex !== -1) {
                const targetId = href.substring(hashIndex + 1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            const hashIndex = href.indexOf('#');
            if (hashIndex !== -1) {
                const sectionId = href.substring(hashIndex + 1);
                if (sectionId === current) {
                    item.classList.add('active');
                }
            }
        });
    });

    // Form submission handling
    const tourForm = document.getElementById('tourForm');
    if (tourForm) {
        tourForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.date) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Show success message
            showNotification('Tour booked successfully! We will contact you soon.', 'success');
            
            // Reset form
            tourForm.reset();
            
            // Log form data (in real app, this would be sent to server)
            console.log('Tour booking:', formData);
        });
    }

    // Book Tour button in hero section
    const bookTourBtn = document.getElementById('heroBookTour');
    if (bookTourBtn) {
        bookTourBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Learn More button
    const learnMoreBtn = document.getElementById('heroLearnMore');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const offsetTop = servicesSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .hero-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            e.target.value = value;
        });
    }

    // Set minimum date for tour booking to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic year in footer
    const yearElements = document.querySelectorAll('footer .text-center p');
    yearElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', new Date().getFullYear());
        }
    });
});

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn-close float-end';
    closeBtn.setAttribute('data-bs-dismiss', 'alert');
    notification.appendChild(closeBtn);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Handle close button click
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

// Add loading state to buttons
function addLoadingState(button, originalText) {
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
    
    setTimeout(() => {
        button.disabled = false;
        button.textContent = originalText;
    }, 2000);
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.gallerySwiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
    });
    // Font Settings removed (init function removed)
});

// If templates are injected after DOM content loaded, ensure font panel initializes
document.addEventListener('templates:injected', function() {
    // Font panel removed; no init call
});

// Fonting tool removed: No related functions present.

// Gallery Modal Functions
function openImageModal(imageSrc, title, description) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modal && modalImage && modalTitle && modalDescription) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

function bookTour() {
    closeImageModal();
    // Scroll to contact section or open booking form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function downloadImage() {
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        const link = document.createElement('a');
        link.href = modalImage.src;
        link.download = modalImage.src.split('/').pop() || 'workspace-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Initialize gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const galleryItem = this.closest('.gallery-item');
            const image = galleryItem.querySelector('.gallery-image');
            const title = galleryItem.querySelector('h3, h4')?.textContent || 'Workspace Image';
            const description = galleryItem.querySelector('p')?.textContent || 'Premium workspace at Coworking Town';
            
            if (image) {
                openImageModal(image.src, title, description);
            }
        });
    });
    
    // Close modal on background click
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeImageModal();
            }
        });
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
    
    // Tour buttons (if they exist)
    const tourButtons = document.querySelectorAll('.tour-btn');
    tourButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            bookTour();
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    setupMobileMenu();
    setupSymptomChecker();
    setupSmoothScrolling();
    setupFormSubmissions();
    setupProviderSearch();
    setupScrollEffects();
    setupHeroButtons();
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = navMenu.style.display === 'flex';
            if (isExpanded) {
                navMenu.style.display = 'none';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '1rem';
                navMenu.style.gap = '1rem';
                navMenu.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
        document.addEventListener('click', function(event) {
            if (navMenu.style.display === 'flex' && 
                !navContainer.contains(event.target) && 
                event.target !== menuToggle) {
                navMenu.style.display = 'none';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

function setupSymptomChecker() {
    const analyzeButton = document.querySelector('.analyze-btn');
    const symptomInput = document.querySelector('.symptom-input');
    const resultsContainer = document.getElementById('analysis-results');
    if (analyzeButton && symptomInput && resultsContainer) {
        analyzeButton.addEventListener('click', function() {
            const symptoms = symptomInput.value.trim();
            if (symptoms) {
                showLoadingState(resultsContainer);
                setTimeout(() => {
                    simulateAnalysis(symptoms, resultsContainer);
                }, 2000);
            } else {
                showError('Please describe your symptoms first.', resultsContainer);
            }
        });
    }
}

function showLoadingState(container) {
    container.innerHTML = `
        <div class="text-center py-8">
            <i class="fas fa-spinner spin text-blue-600 text-3xl mb-4"></i>
            <p>Analyzing your symptoms with AI...</p>
        </div>
    `;
}

function showError(message, container) {
    container.innerHTML = `
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <i class="fas fa-exclamation-circle text-red-600 text-2xl mb-2"></i>
            <p class="text-red-700">${message}</p>
        </div>
    `;
}

function getPossibleConditions(symptoms) {
    const conditions = [];
    const symptomLower = symptoms.toLowerCase();
    if (symptomLower.includes('headache') || symptomLower.includes('head')) {
        conditions.push({
            name: 'Possible tension headache',
            description: 'Common condition often related to stress, muscle tension, or dehydration.',
            recommendations: ['Rest in a quiet room', 'Apply cold compress', 'Stay hydrated', 'Consider over-the-counter pain relief']
        });
    }
    if (symptomLower.includes('fever') || symptomLower.includes('temperature')) {
        conditions.push({
            name: 'Possible viral infection',
            description: 'Fever is often a sign of viral or bacterial infection.',
            recommendations: ['Rest and stay hydrated', 'Monitor temperature', 'Consider fever-reducing medication', 'Contact doctor if fever persists']
        });
    }
    if (symptomLower.includes('cough') || symptomLower.includes('throat')) {
        conditions.push({
            name: 'Possible respiratory infection',
            description: 'Cough and throat symptoms can indicate respiratory issues.',
            recommendations: ['Stay hydrated', 'Use throat lozenges', 'Avoid irritants', 'Consider cough suppressants if needed']
        });
    }
    if (conditions.length === 0) {
        conditions.push({
            name: 'General symptoms analysis',
            description: 'Based on your description, it appears to be a mild condition.',
            recommendations: ['Rest and monitor symptoms', 'Stay hydrated', 'Contact healthcare provider if symptoms worsen']
        });
    }
    return conditions;
}

function simulateAnalysis(symptoms, container) {
    const conditions = getPossibleConditions(symptoms);
    let conditionsHTML = conditions.map(condition => `
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <div class="flex items-center mb-3">
                <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span class="font-semibold text-gray-800">${condition.name}</span>
            </div>
            <p class="text-sm text-gray-600 mb-3 ml-6">${condition.description}</p>
            <div class="ml-6">
                <h6 class="font-semibold text-sm text-gray-700 mb-2">Recommended:</h6>
                <ul class="text-sm text-gray-600 space-y-1">
                    ${condition.recommendations.map(rec => `<li>• ${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
    container.innerHTML = `
        <div class="fade-in">
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h4 class="font-semibold text-blue-800 mb-2">AI Analysis Complete</h4>
                <p class="text-sm text-blue-600">Based on your symptoms description</p>
            </div>
            <div class="space-y-4">
                <h5 class="font-semibold text-gray-800 mb-3">Possible Conditions:</h5>
                ${conditionsHTML}
            </div>
            <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h5 class="font-semibold text-yellow-800 mb-2">Important Notice</h5>
                <p class="text-sm text-yellow-700">
                    This analysis is for informational purposes only and does not replace professional medical advice. 
                    Please consult a healthcare provider for proper diagnosis and treatment.
                </p>
            </div>
            <div class="mt-4 text-center">
                <button class="text-blue-600 text-sm hover:underline" onclick="resetSymptomForm()">
                    Start New Analysis
                </button>
            </div>
        </div>
    `;
}

function resetSymptomForm() {
    const symptomInput = document.querySelector('.symptom-input');
    const resultsContainer = document.getElementById('analysis-results');
    if (symptomInput) symptomInput.value = '';
    resultsContainer.innerHTML = `
        <div class="results-placeholder">
            <i class="fas fa-stethoscope"></i>
            <p>Enter your symptoms to get AI-powered analysis</p>
        </div>
    `;
}

function setupProviderSearch() {
    const findProvidersBtn = document.querySelector('.find-providers-btn');
    const locationBtn = document.querySelector('.location-btn');
    if (findProvidersBtn) {
        findProvidersBtn.addEventListener('click', function() {
            const specialty = document.querySelector('.providers-form select').value;
            const location = document.querySelector('.providers-form input').value;
            if (!location) {
                alert('Please enter a location to find healthcare providers.');
                return;
            }
            simulateProviderSearch(specialty, location);
        });
    }
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            simulateGetCurrentLocation();
        });
    }
}

function simulateProviderSearch(specialty, location) {
    alert(`Searching for ${specialty} providers near ${location}...\n\nThis would connect to Google Maps API and healthcare provider databases in a real application.`);
}

function simulateGetCurrentLocation() {
    alert('Getting your current location...\n\nIn a real application, this would use the browser\'s Geolocation API with proper user permissions.');
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                const navMenu = document.querySelector('.nav-menu');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (navMenu && navMenu.style.display === 'flex') {
                    navMenu.style.display = 'none';
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function setupFormSubmissions() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission would be handled here in a real application.');
        });
    });
}

function setupScrollEffects() {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
}

function setupHeroButtons() {
    const symptomBtn = document.querySelector('.primary-btn');
    const doctorsBtn = document.querySelector('.secondary-btn');
    if (symptomBtn) {
        symptomBtn.addEventListener('click', function() {
            document.querySelector('#symptom-checker').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    if (doctorsBtn) {
        doctorsBtn.addEventListener('click', function() {
            document.querySelector('#providers').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.querySelectorAll('.feature-card, .tech-card, .future-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);erve(section);
});


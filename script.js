// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const icon = themeToggle.querySelector('i');
  
  if (body.classList.contains('dark-theme')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Typing effect
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100;

    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init typing effect
document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.typing-text');
  const words = ['Microsites'];
  const wait = 3000;
  new TypeWriter(txtElement, words, wait);
}

// Glitch effect on name text
const glitchText = document.querySelector('.glitch');
function createGlitchEffect() {
  const text = glitchText.innerText;
  const glitchCharIndex = Math.floor(Math.random() * text.length);
  const newChar = Math.random() > 0.5 ? '1' : '0';
  const glitched = text.slice(0, glitchCharIndex) + newChar + text.slice(glitchCharIndex + 1);
  glitchText.dataset.text = glitched;
}
setInterval(createGlitchEffect, 200);

// Parallax effect for floating elements
document.addEventListener('mousemove', (e) => {
  const floatItems = document.querySelectorAll('.float-item');
  floatItems.forEach(item => {
    const speed = item.dataset.speed;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    item.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// Animate numbers in stat cards when visible
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.target, 10);
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    function update() {
      current += increment;
      if (current < target) {
        stat.textContent = Math.round(current);
        requestAnimationFrame(update);
      } else {
        stat.textContent = target;
      }
    }
    update();
  });
}

// IntersectionObserver for stats
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
});
document.querySelectorAll('.stats-container').forEach(el => statsObserver.observe(el));

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true
});

// Animate skill progress bars
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
  progressBars.forEach(progress => {
    const targetWidth = progress.parentElement.dataset.progress || '0%';
    progress.style.width = targetWidth;
  });
}

const progressObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.skills-grid').forEach(grid => progressObserver.observe(grid));

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name')?.value || '',
    email: document.getElementById('email')?.value || '',
    message: document.getElementById('message')?.value || ''
  };

  console.log('Form submitted:', formData);

  setTimeout(() => {
    contactForm.reset();
    alert('Message sent successfully!');
  }, 1000);
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Timeline items animation
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

const timelineObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, timelineObserverOptions);

timelineItems.forEach(item => timelineObserver.observe(item));

// Individual skill cards animation
document.addEventListener('DOMContentLoaded', () => {
  const skillCards = document.querySelectorAll('.skill-card');
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.querySelector('.progress');
        const targetWidth = progress.parentElement.dataset.progress || '0%';
        progress.style.width = targetWidth;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillCards.forEach(card => cardObserver.observe(card));
});

// Submit button animation
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', function() {
    this.classList.add('loading');
    setTimeout(() => {
      this.classList.remove('loading');
    }, 2000);
  });
}
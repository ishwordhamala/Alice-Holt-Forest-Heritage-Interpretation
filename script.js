document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slides img');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  // Initialize
  let currentIndex = 0;
  let slideInterval;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  // Navigation function
  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }
  
  // Update dots
  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  // Auto-slide
  function startSlider() {
    slideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    goToSlide(currentIndex - 1);
    startSlider();
  });
  
  nextBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    goToSlide(currentIndex + 1);
    startSlider();
  });
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', startSlider);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      clearInterval(slideInterval);
      goToSlide(currentIndex - 1);
      startSlider();
    } else if (e.key === 'ArrowRight') {
      clearInterval(slideInterval);
      goToSlide(currentIndex + 1);
      startSlider();
    }
  });
  
  // Initialize
  goToSlide(0);
  startSlider();
});
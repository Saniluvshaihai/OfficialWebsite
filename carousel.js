function initCarousel(container) {
    const slider = container.querySelector(".slider");
    const slides = container.querySelectorAll(".slide");
    const sliderNav = container.querySelector(".slider-nav");
    const prevBtn = container.querySelector(".slider-arrow.prev");
    const nextBtn = container.querySelector(".slider-arrow.next");
 
    let currentSlide = 0;
    const slideCount = slides.length;
    let intervalId = null;

    
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("nav-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        sliderNav.appendChild(dot);
    });

    const dots = sliderNav.querySelectorAll(".nav-dot");

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    function resetAnimation(slide) {
        const content = slide.querySelector(".slide-content");
        if (content) {
            const clone = content.cloneNode(true);
            content.parentNode.replaceChild(clone, content);
        }
    }

    function goToSlide(index) {
        currentSlide = (index + slideCount) % slideCount;
        slider.style.transform = `translateX(-${currentSlide * 400}px)`;
        resetAnimation(slides[currentSlide]);
        updateDots();
    }

    function startAutoAdvance() {
        if (!intervalId) {
            intervalId = setInterval(() => goToSlide(currentSlide + 1), 5000);
        }
    }

    function stopAutoAdvance() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function handleNext() {
        stopAutoAdvance();
        goToSlide(currentSlide + 1);
        startAutoAdvance();
    }

    function handlePrev() {
        stopAutoAdvance();
        goToSlide(currentSlide - 1);
        startAutoAdvance();
    }

    prevBtn.addEventListener("click", handlePrev);
    nextBtn.addEventListener("click", handleNext);
    slider.addEventListener("mouseenter", stopAutoAdvance);
    slider.addEventListener("mouseleave", startAutoAdvance);

    startAutoAdvance();
}

document.querySelectorAll(".slider-container").forEach(initCarousel);



// Hero Carousel Section Script
document.addEventListener("DOMContentLoaded", () => {
  const heroCarousel = document.querySelector(".hero-carousel")
  if (!heroCarousel) return

  // Get carousel images from data attribute or use defaults
  let heroImages = []
  try {
    heroImages = JSON.parse(heroCarousel.dataset.images || "[]")
  } catch (e) {
    console.error("Error parsing hero images:", e)
    // Fallback images
    heroImages = [
      {
        src: "/assets/images/heroimage.png",
        alt: "Mountain landscape with turquoise alpine lake surrounded by steep slopes",
      },
      {
        src: "/assets/images/placeholder.svg",
        alt: "Person hiking in nature with sustainable hygiene products",
      },
      {
        src: "/assets/images/placeholder.svg",
        alt: "Close-up of biodegradable bamboo wipes in natural setting",
      },
    ]
  }

  if (heroImages.length === 0) return

  // Create carousel HTML
  let carouselHTML = ""
  heroImages.forEach((image, index) => {
    carouselHTML += `
      <div class="hero-slide ${index === 0 ? "active" : ""}">
        <img src="${image.src}" alt="${image.alt}" class="hero-image">
      </div>
    `
  })

  // Add overlay
  carouselHTML += '<div class="hero-overlay"></div>'

  // Add navigation controls
  carouselHTML += `
    <div class="carousel-controls">
      <button class="carousel-control prev" id="hero-prev" aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="carousel-control next" id="hero-next" aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
    <div class="carousel-indicators">
      ${heroImages
        .map(
          (_, index) => `
        <button class="carousel-indicator ${index === 0 ? "active" : ""}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
      `,
        )
        .join("")}
    </div>
  `

  heroCarousel.innerHTML = carouselHTML

  // Set up carousel functionality
  const slides = heroCarousel.querySelectorAll(".hero-slide")
  const indicators = heroCarousel.querySelectorAll(".carousel-indicator")
  const prevButton = heroCarousel.querySelector("#hero-prev")
  const nextButton = heroCarousel.querySelector("#hero-next")
  let currentIndex = 0
  let interval
  let isAutoPlaying = true

  function goToSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"))
    indicators.forEach((indicator) => indicator.classList.remove("active"))

    slides[index].classList.add("active")
    indicators[index].classList.add("active")
    currentIndex = index
  }

  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length
    goToSlide(newIndex)
  }

  function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length
    goToSlide(newIndex)
  }

  // Add event listeners
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide()
      pauseAutoPlay()
    })
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide()
      pauseAutoPlay()
    })
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index)
      pauseAutoPlay()
    })
  })

  // Auto-rotate slides
  function startAutoPlay() {
    isAutoPlaying = true
    interval = setInterval(nextSlide, 5000)
  }

  function pauseAutoPlay() {
    isAutoPlaying = false
    clearInterval(interval)

    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => {
      if (!isAutoPlaying) {
        startAutoPlay()
      }
    }, 10000)
  }

  startAutoPlay()

  // Pause on hover
  heroCarousel.addEventListener("mouseenter", pauseAutoPlay)
  heroCarousel.addEventListener("mouseleave", startAutoPlay)
})


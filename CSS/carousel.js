const carousel = document.querySelector(".carousel");

if (carousel) {
  // Récupère les diapositives, les indicateurs et les commandes du carrousel.
  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const indicators = Array.from(
    carousel.querySelectorAll(".carousel-indicators button"),
  );
  const previousButton = carousel.querySelector(".carousel-previous");
  const nextButton = carousel.querySelector(".carousel-next");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  let activeIndex = slides.findIndex((slide) =>
    slide.classList.contains("is-active"),
  );
  let timer;

  const showSlide = (index) => {
    // Le modulo permet de revenir à la dernière ou à la première diapositive.
    activeIndex = (index + slides.length) % slides.length;

    // Met à jour l'affichage ainsi que les états accessibles.
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    indicators.forEach((indicator, indicatorIndex) => {
      const isActive = indicatorIndex === activeIndex;
      indicator.classList.toggle("is-active", isActive);
      indicator.setAttribute("aria-pressed", String(isActive));
    });
  };

  const stopAutoplay = () => {
    window.clearInterval(timer);
  };

  const startAutoplay = () => {
    stopAutoplay();
    // N'avance pas automatiquement si l'utilisateur préfère moins d'animations,
    // si l'onglet est masqué ou s'il interagit avec le carrousel.
    if (
      !prefersReducedMotion.matches &&
      !document.hidden &&
      !carousel.matches(":hover") &&
      !carousel.contains(document.activeElement)
    ) {
      timer = window.setInterval(() => {
        showSlide(activeIndex + 1);
      }, 5000);
    }
  };

  previousButton.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startAutoplay();
  });

  nextButton.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startAutoplay();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      startAutoplay();
    });
  });

  // Met en pause pendant le survol ou l'interaction clavier.
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      startAutoplay();
    }
  });
  document.addEventListener("visibilitychange", startAutoplay);
  prefersReducedMotion.addEventListener("change", startAutoplay);

  startAutoplay();
}

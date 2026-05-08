document.addEventListener("DOMContentLoaded", async function () {
  const slider = document.querySelector("[data-hero-slider]");

  if (!slider) return;

  const slides = await getHomepageSliders();

  if (!slides.length) {
    console.warn("No homepage slider data found from Strapi.");
    return;
  }

  function createSlide(item, index) {
    const slide = item.attributes || item;
    const imageUrl = getMediaUrl(slide.hero_image || slide.image);

    return `
      <section class="hero-slide ${index === 0 ? "is-active" : ""}" data-hero-slide>
        <div class="hero-slide__content">
          <p class="hero-slide__eyebrow">${slide.small_heading || ""}</p>

          <h1>${slide.main_heading || ""}</h1>

          <p class="hero-slide__text">${slide.description || ""}</p>

          <div class="hero-slide__tags">
            ${slide.tag_1 ? `<span>${slide.tag_1}</span>` : ""}
            ${slide.tag_2 ? `<span>${slide.tag_2}</span>` : ""}
            ${slide.tag_3 ? `<span>${slide.tag_3}</span>` : ""}
          </div>

          ${
            slide.button_text
              ? `<a class="button" href="${slide.button_link || "#"}">${slide.button_text}</a>`
              : ""
          }
        </div>

        <div class="hero-slide__media">
          ${
            imageUrl
              ? `<img src="${imageUrl}" alt="${slide.main_heading || "KC Fixit"}">`
              : ""
          }
        </div>
      </section>
    `;
  }

  slider.innerHTML = slides.map((item, index) => createSlide(item, index)).join("");

  let currentSlide = 0;
  const allSlides = slider.querySelectorAll("[data-hero-slide]");

  if (allSlides.length <= 1) return;

  setInterval(() => {
    allSlides[currentSlide].classList.remove("is-active");
    currentSlide = (currentSlide + 1) % allSlides.length;
    allSlides[currentSlide].classList.add("is-active");
  }, 3500);
});

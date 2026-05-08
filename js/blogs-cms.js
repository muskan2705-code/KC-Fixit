document.addEventListener("DOMContentLoaded", async function () {
  const grid = document.querySelector(".blog-grid");

  if (!grid || typeof getBlogs !== "function") return;

  const blogs = await getBlogs();

  if (!blogs.length) return;

  const fallbackImages = {
    "Tile Adhesive Guide": "tile-adhesive-hero.jpeg",
    "Waterproofing Guide": "waterproofing-solutions.jpg",
    "Grout Comparison": "epoxy-grouting-system.jpg",
    "Tile Fixing": "tile-adhesive-hero.jpeg",
    "Joint Finish": "tile-joint-filler-grouts.jpg",
    Waterproofing: "waterproofing-solutions.jpg"
  };

  grid.innerHTML = blogs
    .map((blog) => {
      const imageUrl = getMediaUrl(blog.image) || fallbackImages[blog.category] || "tile-adhesive-hero.jpeg";
      const slug = blog.slug || "";

      return `
        <a class="blog-card" href="blog-${slug}.html">
          <div class="blog-card__media">
            <img src="${imageUrl}" alt="${blog.title || "KC Fixit blog"}">
          </div>
          <div class="blog-card__body">
            <span class="blog-card__meta">${blog.category || "KC Fixit"}</span>
            <h3>${blog.title || ""}</h3>
            <p class="blog-card__excerpt">${blog.excerpt || blog.seoDescription || ""}</p>
            <span class="blog-card__cta">Open article</span>
          </div>
        </a>
      `;
    })
    .join("");
});

document.addEventListener("DOMContentLoaded", async function () {
  const catalogue = document.querySelector("[data-product-catalogue]");

  if (!catalogue) return;

  const products = await getProducts();

  if (!products.length) {
    console.warn("No products found from Strapi.");
    return;
  }

  const panels = {
    all: document.querySelector('[data-product-panel="all"] .product-gallery-grid'),
    fixing: document.querySelector('[data-product-panel="fixing"] .product-gallery-grid'),
    grouting: document.querySelector('[data-product-panel="grouting"] .product-gallery-grid'),
    waterproofing: document.querySelector('[data-product-panel="waterproofing"] .product-gallery-grid'),
    support: document.querySelector('[data-product-panel="support"] .product-gallery-grid'),
  };

  Object.values(panels).forEach((panel) => {
    if (panel) panel.innerHTML = "";
  });

  function getCategoryKey(category) {
    const value = (category || "").toLowerCase();

    if (value.includes("tile") || value.includes("stone")) return "fixing";
    if (value.includes("grout") || value.includes("epoxy")) return "grouting";
    if (value.includes("waterproof")) return "waterproofing";
    if (value.includes("surface") || value.includes("masonry")) return "support";

    return "all";
  }

  function createProductCard(item) {
    const product = item.attributes || item;
    const categoryName = product.category?.name || product.category || "";
    const imageUrl = getMediaUrl(product.image) || getMediaUrl(product.images);
    const productName = product.name || product.product_name || "";

    return `
      <article class="product-gallery-card">
        <a class="product-gallery-card__media" href="product-detail.html?product=${product.slug}">
          ${
            imageUrl
              ? `<img class="product-gallery-card__image" src="${imageUrl}" alt="${productName}">
              `
              : ""
          }
        </a>

        <div class="product-gallery-card__body">
          <span class="product-gallery-card__family">${categoryName}</span>
          <h3>${productName}</h3>
        </div>

        <a class="product-gallery-card__action" href="product-detail.html?product=${product.slug}">
          View Product
        </a>
      </article>
    `;
  }

  products.forEach((item) => {
    const product = item.attributes || item;
    const card = createProductCard(item);
    const categoryKey = getCategoryKey(product.category?.name || product.category);

    if (panels.all) {
      panels.all.innerHTML += card;
    }

    if (panels[categoryKey] && categoryKey !== "all") {
      panels[categoryKey].innerHTML += card;
    }
  });
});

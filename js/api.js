const STRAPI_URL = (
  window.KC_FIXIT_CMS_URL ||
  document.querySelector('meta[name="kc-fixit-cms-url"]')?.content ||
  "http://localhost:1337"
).replace(/\/$/, "");

function normalizeStrapiItem(item) {
  return item?.attributes ? { id: item.id, documentId: item.documentId, ...item.attributes } : item;
}

function getMediaUrl(media) {
  const mediaItem = Array.isArray(media) ? media[0] : media;
  const url = mediaItem?.url || mediaItem?.data?.attributes?.url;

  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

async function getProducts() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/products?populate=category,image,images&sort=name:asc`);
    if (!response.ok) throw new Error(`Products request failed with ${response.status}`);
    const result = await response.json();
    return (result.data || []).map(normalizeStrapiItem);
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

async function getBlogs() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blogs?populate=image&sort=createdAt:desc`);
    if (!response.ok) throw new Error(`Blogs request failed with ${response.status}`);
    const result = await response.json();
    return (result.data || []).map(normalizeStrapiItem);
  } catch (error) {
    console.error("Error loading blogs:", error);
    return [];
  }
}

async function getHomepageSliders() {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/homepage-sliders?populate=*&sort=sort_order:asc`
    );
    if (!response.ok) throw new Error(`Homepage slider request failed with ${response.status}`);
    const result = await response.json();
    return (result.data || []).map(normalizeStrapiItem);
  } catch (error) {
    console.error("Error loading homepage sliders:", error);
    return [];
  }
}

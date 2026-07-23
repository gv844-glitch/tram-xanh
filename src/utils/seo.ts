interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const DEFAULT_TITLE = 'Trạm Xanh — Tạp chí Tin tức Môi trường & Lối sống xanh';
const DEFAULT_DESCRIPTION = 'Trạm Xanh: Điểm dừng để hiểu hơn, sống xanh hơn. Tạp chí điện tử tin tức môi trường, công nghệ xanh, giải pháp bền vững và hỏi đáp AI Trạm Trưởng cho cộng đồng Việt Nam.';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80';

export function updateSEO({ title, description, image, url, type = 'website' }: SeoOptions = {}) {
  const fullTitle = title ? `${title} | Trạm Xanh` : DEFAULT_TITLE;
  const fullDescription = description || DEFAULT_DESCRIPTION;
  const fullImage = image || DEFAULT_IMAGE;
  const fullUrl = url || window.location.href;

  // Document Title
  document.title = fullTitle;

  // Update or create meta tags
  const setMeta = (selector: string, attr: string, value: string) => {
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      const [key, val] = selector.replace('meta[', '').replace(']', '').split('=');
      element.setAttribute(key, val.replace(/['"]/g, ''));
      document.head.appendChild(element);
    }
    element.setAttribute(attr, value);
  };

  // Standard Meta
  setMeta('meta[name="description"]', 'content', fullDescription);

  // Open Graph
  setMeta('meta[property="og:title"]', 'content', fullTitle);
  setMeta('meta[property="og:description"]', 'content', fullDescription);
  setMeta('meta[property="og:image"]', 'content', fullImage);
  setMeta('meta[property="og:url"]', 'content', fullUrl);
  setMeta('meta[property="og:type"]', 'content', type);
  setMeta('meta[property="og:site_name"]', 'content', 'Trạm Xanh');

  // Twitter Card
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'content', fullTitle);
  setMeta('meta[name="twitter:description"]', 'content', fullDescription);
  setMeta('meta[name="twitter:image"]', 'content', fullImage);

  // Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);
}

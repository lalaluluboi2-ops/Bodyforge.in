// Cloudflare Worker handler for BODYFORGE
// Guarantees /sitemap.xml and /robots.txt are served with pristine XML and TXT content-types,
// preventing any fallback to index.html SPA routing.

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage: Calisthenics, Motion Demos & Holistic Wellness Engine -->
  <url>
    <loc>https://bodyforge-in.lalaluluboi2.workers.dev/</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Complete Calisthenics Workout Library & Vector Motion Engine -->
  <url>
    <loc>https://bodyforge-in.lalaluluboi2.workers.dev/library</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Holistic Wellness Hub, Posture Protocols & Longevity -->
  <url>
    <loc>https://bodyforge-in.lalaluluboi2.workers.dev/wellness</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Metabolic Nutrition & High-Protein Meal Architecture -->
  <url>
    <loc>https://bodyforge-in.lalaluluboi2.workers.dev/nutrition</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Periodized Seasonal Training Programs -->
  <url>
    <loc>https://bodyforge-in.lalaluluboi2.workers.dev/seasonal</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Facial Fitness, Postural Alignment & Skin Vitality -->
  <url>
    <loc>https://bodyforge-in.lalaluluboi2.workers.dev/facial</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Joint Pain Relief & Functional Mobility Protocols -->
  <url>
    <loc>https://bodyforge-in.lalaluluboi2.workers.dev/pain-library</loc>
    <lastmod>2026-10-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

const ROBOTS_TXT = `# BODYFORGE robots.txt
# https://bodyforge-in.lalaluluboi2.workers.dev/

User-agent: *
Allow: /
Allow: /sitemap.xml
Allow: /assets/
Disallow: /api/
Disallow: /progress

# Sitemap index reference
Sitemap: https://bodyforge-in.lalaluluboi2.workers.dev/sitemap.xml
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Explicitly return raw XML for sitemap.xml with Content-Type: application/xml; charset=utf-8
    if (url.pathname === '/sitemap.xml') {
      return new Response(SITEMAP_XML, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
          'X-Robots-Tag': 'all'
        }
      });
    }

    // Explicitly return raw text for robots.txt with Content-Type: text/plain; charset=utf-8
    if (url.pathname === '/robots.txt') {
      return new Response(ROBOTS_TXT, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, must-revalidate'
        }
      });
    }

    // Serve static assets or fallback to index.html if env.ASSETS is configured
    if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return fetch(request);
  }
};

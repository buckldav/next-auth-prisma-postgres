---
title: Astro Template Standards
date: "2023-04-25T16:04:44.000Z"
author: David Buckley
summary: Standards for developing SpringMicroHost templates using astro.build.
---

Develop SpringMicroHost templates using [astro.build](https://astro.build). See an example template at [https://github.com/SpringMicro1/smhost-template-base](https://github.com/SpringMicro1/smhost-template-base).

## Standards

- Name repos `smhost-template-*`
- `src/config.ts` - see format defined below
- Blog (markdown) - disabled until blog feature is built
- Tailwind Config
- Astro SEO in `src/layouts/Layout.astro`
- Accessibility: tab navigation tab-index, [https://www.w3.org/WAI/standards-guidelines/aria/](https://www.w3.org/WAI/standards-guidelines/aria/)
- RWD
- robots.txt
- `npm run enable` and `npm run disable` and `disabled.json` for turing pages on/off.

### src/config.ts format

`BASE` is required. Pages (example: `PAGE_OR_SECTION`) have `TEXT`, `LINKS`, and `IMAGES`.

```tsx
const config = {
  BASE: {
    META_TITLE: "title",
    META_DESCRIPTION: "description",
    OPENGRAPH_TITLE: "title",
    OPENGRAPH_IMAGE_ALT_TEXT: "alternate text",
    KEY: "value",
  },
  PAGE_OR_SECTION: {
    TEXT: {
      KEY: "value",
    },
    LINKS: {
      KEY: {
        href: "https://example.com",
        content: "text",
      },
    },
    IMAGES: {
      KEY: {
        src: "https://example.com",
        alt: "alternate text",
      },
    },
  },
};
export const BASE = config.BASE;
export const PAGE_OR_SECTION = config.HOME;
```

## Future

- eCommerce - eCommerce specific templates
- Contact forms - included here but not operational
- Email subscriptions
- Public ratings/testimonials
- Blog comments
- Share on social media
- Markdown/rich text editor injection on config fields, https://www.npmjs.com/package/dompurify
- Ads
- Media uploads - static file server
- Dark mode theming optional

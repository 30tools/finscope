# Unstory

Unstory is a modern, static-first finance blog built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **MDX**. It is designed for high performance, maximum SEO, and seamless deployment on **Cloudflare Pages**.

## 🚀 Features

-   **Static Site Generation (SSG)**: Pre-rendered pages for lightning-fast load times.
-   **MDX Support**: Write content in Markdown with embedded React components.
-   **SEO Optimized**: Dynamic metadata, JSON-LD schema, and sitemap generation.
-   **Responsive Design**: Built with Tailwind CSS v4 (alpha/beta) concepts.
-   **Client-Side Interactive Elements**: Table of Contents, Breadcrumbs, etc.
-   **AdSense Ready**: Placeholder slots for strategic ad placement.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Content**: MDX (via `next-mdx-remote`)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 🏃‍♂️ Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn or pnpm or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/finscope.git
    cd finscope
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📝 Content Management

Content is managed via MDX files located in the `content/` directory.

### Directory Structure
```
content/
├── credit-cards/
│   ├── best-student-cards.mdx
│   └── axis-magnus-review.mdx
├── personal-loans/
└── ...
```

### Frontmatter Schema
Each MDX file must start with the following frontmatter:

```yaml
---
title: "Article Title"
slug: "url-friendly-slug"
description: "Short description for SEO."
category: "credit-cards" # Must match directory name
author: "Author Name"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
keywords:
  - "keyword 1"
  - "keyword 2"
---
```

## 🚢 Deployment

This project is configured for **Cloudflare Pages**.

1.  **Build**:
    ```bash
    npm run build
    ```
    This generates a static `out/` directory.

2.  **Deploy (Manual)**:
    ```bash
    npx wrangler pages deploy out --project-name finscope
    ```

3.  **CI/CD**: Connect your GitHub repository to Cloudflare Pages for automatic deployments on push.

## 📄 License

This project is licensed under the MIT License.

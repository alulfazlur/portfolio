import type { Messages } from "../types";

export const en: Messages = {
  meta: {
    title: "Fazlur Rahman (Alul) — Frontend Engineer",
    description:
      "Fazlur Rahman (Alul) is a frontend engineer from Indonesia building scalable web products with Next.js and GraphQL.",
    caseStudy: "Case study",
  },
  nav: {
    label: "Main",
    skipToContent: "Skip to content",
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
    language: "Language",
    theme: "Toggle light or dark mode",
  },
  languages: {
    en: "English",
    id: "Bahasa Indonesia",
  },
  profile: {
    location: "Jember, East Java, Indonesia",
    tagline:
      "I build scalable, high-performance web products with Next.js and GraphQL, from the first commit to production.",
    about: [
      "I'm a frontend engineer with 5+ years of experience building web applications and SaaS products from the ground up. Most of my work lives where complex business logic meets everyday users: omnichannel dashboards, low-code page builders, and e-commerce platforms.",
      "I studied Statistics at Institut Teknologi Sepuluh Nopember, then moved into software through Alterra Academy's full-stack bootcamp. I care about clean code, feature-based architecture, and user experiences that stay fast as the data grows.",
    ],
    facts: {
      location: { label: "Based in", value: "Jember, East Java, Indonesia" },
      experience: { label: "Experience", value: "5+ years" },
      current: {
        label: "Currently",
        value: "Associate Software Engineer at ICUBE",
      },
      education: { label: "Education", value: "S.Stat. (Statistics), ITS" },
    },
    contactBlurb:
      "I'm open to frontend engineering roles and freelance projects. Email is the fastest way to reach me.",
  },
  hero: {
    label: "Introduction",
    stats: [{ value: "5+", label: "years of experience" }],
    viewProjects: "View Projects",
    downloadCv: "Download CV",
  },
  sections: {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
  },
  about: {
    photoAlt: "Portrait of {{name}}",
  },
  skills: {
    core: "Core",
    styling: "Styling & UI",
    data: "Data & State",
    also: "Also",
  },
  experience: {
    present: "Present",
    stack: "Tech stack",
    items: {
      icube: {
        highlights: [
          "Led the 0-to-1 development of Belanjaku, a proprietary e-commerce ecosystem, from initial architectural design to full production launch.",
          "Engineered a low-code drag-and-drop Page Builder and an integrated Menu Builder so merchants can customize their storefronts dynamically.",
          "Built a full-scale Affiliate Management System from scratch, with automated tracking and commission performance monitoring.",
          "Introduced a modular feature-based architecture to keep the platform scalable and maintainable.",
        ],
      },
      "icube-sirclo": {
        highlights: [
          "Developed an omnichannel sales aggregator that syncs inventory and orders across Shopee, Lazada, TikTok, and Tokopedia.",
          "Architected a centralized management dashboard that automates the e-commerce lifecycle, including order processing and returns.",
          "Optimized large-scale data fetching with Apollo Client, improving how complex product catalogs and real-time updates are handled.",
        ],
      },
      bit: {
        highlights: [
          "Developed and launched KlikDiabetes, a React Native health-tracking app available on the Play Store and App Store.",
          "Integrated Google Fit SDK and GPS services to monitor real-time activity and health metrics such as steps and blood glucose.",
          "Turned Figma designs into high-fidelity iOS and Android interfaces.",
          "Managed complex application state with Redux and integrated RESTful APIs for reliable data sync.",
        ],
      },
    },
  },
  projects: {
    comingSoon: "Coming soon",
    groups: {
      belanjaku: {
        name: "Belanjaku",
        description:
          "ICUBE's own e-commerce ecosystem: seller tools, storefronts, affiliates, and a creator platform, built from zero.",
      },
      swift: {
        name: "SWIFT",
        description:
          "Omnichannel commerce tools that keep products, stock, and orders in sync for brands and small sellers.",
      },
      other: {
        name: "Other work",
        description:
          "A freelance learning platform and the mobile app where my career started.",
      },
    },
    types: {
      work: "Work",
      freelance: "Freelance",
    },
    coverAlt: "Illustration for {{title}}",
    stack: "Tech stack",
    items: {
      "belanjaku-seller-dashboard": {
        title: "Belanjaku Seller Dashboard",
        summary:
          "A multi-tenant seller dashboard with a low-code page builder, built from zero to production for ICUBE's own e-commerce ecosystem.",
        role: "Frontend lead (0 to 1)",
        problem:
          "ICUBE wanted its own e-commerce ecosystem where merchants could sign up, run their store, and sell across channels without depending on a third-party platform. The seller dashboard had to serve many merchants and partner brands from one codebase.",
        whatIDid: [
          "Led the frontend from the initial architecture to the production launch, using a modular feature-based structure so the platform stays maintainable as it grows.",
          "Built seller onboarding end to end: account registration, phone verification, and KYC.",
          "Shipped white-label support driven by configuration, so customers can run the same dashboard under their own name, logo, and domain.",
          "Built store operations: orders with in-store pickup, promotions, loyalty, income journal, and seller withdrawals.",
          "Engineered a drag-and-drop Page Builder on GrapesJS, with custom commerce plugins (product showcases, banner carousels, video), reusable sections, and custom templates with thumbnail previews.",
          "Built a Menu Builder for headers and footers, so merchants control their storefront navigation without a developer.",
          "Added a marketing suite with survey forms and appointment booking.",
        ],
        result:
          "Belanjaku went from first architecture sketch to a live production platform at belanjaku.id. The dashboard has since been white-labeled by several customers for their own brands.",
      },
      "belanjaku-storefront": {
        title: "Belanjaku Storefront",
        summary:
          "The storefront engine that turns pages built in the Belanjaku Page Builder into live, shoppable merchant sites.",
        role: "Frontend engineer, top contributor",
        problem:
          "Pages that merchants design in the builder have to go live as fast, shareable storefronts, on a Belanjaku address or on the merchant's own custom domain, without a developer deploying anything.",
        whatIDid: [
          "Built multi-tenant routing that serves each merchant's store by vendor code or custom domain, with server-side caching for fast loads.",
          "Built the shopping flow: product showcases, product detail pages with stock validation and multi-image galleries, cart, and abandoned-cart recovery in the mini cart.",
          "Rendered builder widgets and templates on the storefront, including banner carousels, custom headers and footers from the Menu Builder, custom fonts, favicon, and head scripts.",
          "Added appointment booking on product and landing pages, maintenance mode, and a password gate for stores still in development.",
        ],
        result:
          "Whatever a merchant designs in the builder is published as a working storefront, including on their own domain.",
      },
      "belanjaku-creator": {
        title: "Belanjaku Creator",
        summary:
          "A creator platform where developers and designers build plugins and templates for Belanjaku storefronts, visually or in code.",
        role: "Frontend engineer",
        problem:
          "Merchants want more widgets and page templates than one internal team can build. Belanjaku needed a way for outside creators to build them safely, without touching the production dashboard, storefront, or plugin service.",
        whatIDid: [
          "Set up the creator dashboard foundation: a core override system, Apollo GraphQL, i18n, and partner theming.",
          "Built creator sign-in with an auth guard and contributor codes, plus a GraphQL proxy that only serves signed-in creators.",
          "Built the app shell and a shared component library (buttons, fields, modals, list pages, toasts, and loaders).",
          "Connected the template builder to the plugin GraphQL API, with thumbnail saving and publish feedback, and started a marketplace listing module.",
        ],
        result:
          "Coming soon. Creators can already build widgets visually with GrapesJS or in code against the real plugin SDK, preview them on a storefront, and export them for upload.",
      },
      swiftoms: {
        title: "SwiftOMS — Omnichannel Order Management",
        summary:
          "An omnichannel back office that keeps products, stock, and orders in sync across major Indonesian marketplaces.",
        role: "Primary frontend engineer",
        problem:
          "Brands selling on Shopee, Lazada, TikTok, and Tokopedia at the same time had to manage stock and orders in each marketplace separately, which led to overselling and slow fulfillment.",
        whatIDid: [
          "Owned a large share of the frontend as the largest contributor to the codebase since 2021.",
          "Built the marketplace channel product management: master products, channel products, variants, bulk updates, and price management per warehouse.",
          "Worked on the order lifecycle: seller orders, returns (RMA), credit memos, print labels, and pick-and-pack with a barcode scanner.",
          "Built the UI for order allocation rules and a virtual stock system that helps prevent overselling across online and offline channels.",
          "Added promotions and product bundles, third-party app integrations with webhook validation, full multi-language support, and optimized Apollo Client data fetching for large catalogs.",
        ],
        result:
          "One dashboard handles inventory, orders, and returns across every connected sales channel. Its codebase also became the foundation for SWIFT Hub and the Belanjaku seller dashboard.",
      },
      "swift-hub": {
        title: "SWIFT Hub",
        summary:
          "A multi-tenant seller hub built on the SwiftOMS codebase, so small businesses can run marketplace operations from one place.",
        role: "Frontend engineer, top contributor",
        problem:
          "Small businesses selling on several marketplaces juggle different notifications, stock screens, and order trackers. They need something simpler than a full enterprise OMS, and resellers of the platform need it under their own brand.",
        whatIDid: [
          "Turned the SwiftOMS codebase into a multi-tenant MVP with a clean, mobile-friendly seller UI.",
          "Aggregated multi-platform notifications and order tracking into a single view.",
          "Built white-label support by configuration, so each tenant gets its own branding and settings.",
          "Added account registration, multi-seller channel management, page and menu builders, income journal, and order flows for in-store pickup.",
        ],
        result:
          "Sellers manage stock, channels, and orders from one dashboard, and the product has been white-labeled by several customers.",
      },
      "belanjaku-affiliate": {
        title: "Belanjaku Affiliate",
        summary:
          "A full affiliate program dashboard with automated tracking and commission monitoring.",
        role: "Frontend engineer",
        problem:
          "Merchants wanted to grow sales through affiliates, but tracking referrals and paying the right commission by hand did not scale.",
        whatIDid: [
          "Built the affiliate dashboard from scratch, with a domain-aware setup so it can be deployed under a customer's own brand.",
          "Built automated tracking and commission performance monitoring.",
          "Connected affiliate commissions to seller balances so payouts stay consistent with sales.",
        ],
        result:
          "Merchants can run an affiliate program with tracking and commission reporting built in, and the dashboard is already white-labeled for customers.",
      },
      "waves-ssi": {
        title: "WAVES-SSI Learning Platform",
        summary:
          "A bilingual learning website where pre-service biology teachers investigate a real plastic-pollution case.",
        role: "Freelance, sole developer",
        problem:
          "A research team from the Western Australia–East Java Universities Consortium needed a website that guides student groups through a six-stage investigation of microplastics at Pancer Beach and Puger fish market in Jember.",
        whatIDid: [
          "Built the whole website, from the landing pages to the guided learning flow.",
          "Built the six investigation stages with rich-text answers, a diagram editor for mapping how microplastics move, and PDF export of student work.",
          "Added sign-in, group progress storage with Supabase, and Indonesian/English language switching.",
          "Embedded 360° video and augmented reality content so students can observe the field site remotely.",
        ],
        result:
          "The platform is live and used as part of the consortium's research on sustainability education.",
      },
      klikdiabetes: {
        title: "KlikDiabetes",
        summary:
          "A React Native app that helps people with diabetes track activity, blood glucose, and medication.",
        role: "Junior frontend engineer",
        problem:
          "People managing diabetes need to log many daily metrics and remember medication, which is hard to keep up with without a dedicated tool.",
        whatIDid: [
          "Turned Figma designs into high-fidelity iOS and Android screens.",
          "Integrated Google Fit SDK and GPS to track daily steps and physical activity.",
          "Built alerts and reminders for medication, blood glucose logging, and blood pressure monitoring.",
          "Managed app state with Redux and integrated RESTful APIs for reliable data sync.",
        ],
        result: "The app launched on both the Play Store and the App Store.",
      },
    },
  },
  caseStudy: {
    back: "All projects",
    role: "Role",
    stack: "Stack",
    workplace: "Workplace",
    live: "Live site",
    source: "Source code",
    problem: "Problem",
    whatIDid: "What I did",
    result: "Result",
    gallery: "Gallery",
    screenshotAlt: "{{title}} screenshot {{number}}",
    moreProjects: "More projects",
    previous: "Previous",
    next: "Next",
  },
  contact: {
    heading: "Let's build something",
    headingAccent: "great together.",
    location: "Jember, Indonesia · UTC+7",
    email: "Email",
    send: "Send email",
    copy: "Copy email",
    copied: "Copied!",
    cv: "Resume",
    cvAction: "Download PDF",
  },
  footer: {
    builtWith: "Built with Next.js",
  },
  notFound: {
    title: "This page doesn't exist.",
    back: "Back to home",
  },
};

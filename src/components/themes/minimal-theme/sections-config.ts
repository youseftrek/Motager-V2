/**
 * Configuration for section inputs to improve UI/UX in EditSectionSheet
 *
 * This file provides enhanced configuration for section inputs, including:
 * - Grouping related inputs
 * - Setting display order
 * - Adding descriptions and help text
 */

export type SectionInputConfig = {
  group?: string;
  order?: number;
  description?: string;
  helpText?: string;
  advanced?: boolean;
};

export type SectionConfig = {
  [sectionName: string]: {
    title: string;
    description?: string;
    inputs: {
      [inputName: string]: SectionInputConfig;
    };
    groups?: {
      [groupName: string]: {
        title: string;
        description?: string;
        order?: number;
        expanded?: boolean;
      };
    };
  };
};

export const SECTIONS_CONFIG: SectionConfig = {
  Hero: {
    title: "Hero Section",
    description:
      "A full-width banner section with image background, heading, and call-to-action buttons.",
    groups: {
      content: {
        title: "Content",
        order: 1,
        expanded: true,
      },
      appearance: {
        title: "Appearance",
        order: 2,
      },
      buttons: {
        title: "Buttons",
        order: 3,
      },
    },
    inputs: {
      title: {
        group: "content",
        order: 1,
      },
      subtitle: {
        group: "content",
        order: 2,
      },
      imgUrl: {
        group: "appearance",
        order: 1,
        description: "Background image for the hero section",
      },
      overlayColor: {
        group: "appearance",
        order: 2,
        description: "Color overlay on top of the background image",
      },
      overlayOpacity: {
        group: "appearance",
        order: 3,
        helpText: "0 means no overlay, 100 means fully opaque overlay",
      },
      button1Text: {
        group: "buttons",
        order: 1,
        description: "Primary call-to-action button",
      },
      button2Text: {
        group: "buttons",
        order: 2,
        description: "Secondary call-to-action button",
      },
    },
  },

  NewsletterSignup: {
    title: "Newsletter Signup",
    description: "A section to collect email subscriptions from visitors.",
    groups: {
      content: {
        title: "Content",
        order: 1,
        expanded: true,
      },
      appearance: {
        title: "Appearance",
        order: 2,
      },
    },
    inputs: {
      title: {
        group: "content",
        order: 1,
      },
      description: {
        group: "content",
        order: 2,
      },
      buttonText: {
        group: "content",
        order: 3,
      },
      backgroundColor: {
        group: "appearance",
        order: 1,
      },
    },
  },

  ImageWithText: {
    title: "Image with Text",
    description:
      "A versatile section displaying an image alongside text content in various layouts.",
    groups: {
      content: {
        title: "Content",
        order: 1,
        expanded: true,
      },
      layout: {
        title: "Layout & Style",
        order: 2,
      },
      image: {
        title: "Image Settings",
        order: 3,
      },
    },
    inputs: {
      title: {
        group: "content",
        order: 1,
      },
      description: {
        group: "content",
        order: 2,
      },
      ctaText: {
        group: "content",
        order: 3,
      },
      ctaUrl: {
        group: "content",
        order: 4,
      },
      imageUrl: {
        group: "image",
        order: 1,
      },
      layout: {
        group: "layout",
        order: 1,
        description: "Choose how the image and text are arranged",
      },
      aspectRatio: {
        group: "image",
        order: 2,
      },
      imageObjectFit: {
        group: "image",
        order: 3,
      },
      roundedCorners: {
        group: "layout",
        order: 2,
      },
      imageBorderWidth: {
        group: "layout",
        order: 3,
      },
      darkOverlay: {
        group: "image",
        order: 4,
      },
      overlayOpacity: {
        group: "image",
        order: 5,
      },
      variant: {
        group: "layout",
        order: 4,
        description: "Color scheme for the section",
      },
    },
  },

  About: {
    title: "About Section",
    description:
      "A simple section to display information about your business or brand.",
    inputs: {
      title: {
        order: 1,
      },
      description: {
        order: 2,
      },
      backgroundColor: {
        order: 3,
      },
      textColor: {
        order: 4,
      },
      showDivider: {
        order: 5,
      },
      alignment: {
        order: 6,
      },
    },
  },

  Footer: {
    title: "Footer",
    description:
      "Site footer with customizable columns, links, and newsletter signup.",
    groups: {
      main: {
        title: "Main Content",
        order: 1,
        expanded: true,
      },
      newsletter: {
        title: "Newsletter",
        order: 2,
      },
      appearance: {
        title: "Appearance",
        order: 3,
      },
      links: {
        title: "Links & Social",
        order: 4,
      },
    },
    inputs: {
      companyName: {
        group: "main",
        order: 1,
      },
      description: {
        group: "main",
        order: 2,
      },
      logoUrl: {
        group: "main",
        order: 3,
      },
      showNewsletter: {
        group: "newsletter",
        order: 1,
      },
      newsletterTitle: {
        group: "newsletter",
        order: 2,
      },
      newsletterPlaceholder: {
        group: "newsletter",
        order: 3,
      },
      newsletterButtonText: {
        group: "newsletter",
        order: 4,
      },
      backgroundColor: {
        group: "appearance",
        order: 1,
      },
      textColor: {
        group: "appearance",
        order: 2,
      },
      accentColor: {
        group: "appearance",
        order: 3,
      },
      copyrightText: {
        group: "main",
        order: 4,
      },
      columns: {
        group: "links",
        order: 1,
      },
      socialLinks: {
        group: "links",
        order: 2,
      },
    },
  },

  FeaturedCollections: {
    title: "Featured Collections",
    description: "Showcase your product collections with images and text.",
    inputs: {
      title: {
        order: 1,
      },
      description: {
        order: 2,
      },
      overlayColor: {
        order: 3,
      },
      overlayOpacity: {
        order: 4,
      },
    },
  },

  SingleProduct: {
    title: "Single Product",
    description:
      "Detailed view of a single product with images, description, and purchase options.",
    groups: {
      basicInfo: {
        title: "Basic Information",
        order: 1,
        expanded: true,
      },
      pricing: {
        title: "Pricing",
        order: 2,
      },
      media: {
        title: "Media",
        order: 3,
      },
      details: {
        title: "Details & Reviews",
        order: 4,
      },
    },
    inputs: {
      name: {
        group: "basicInfo",
        order: 1,
      },
      description: {
        group: "basicInfo",
        order: 2,
      },
      price: {
        group: "pricing",
        order: 1,
      },
      originalPrice: {
        group: "pricing",
        order: 2,
      },
      inStock: {
        group: "basicInfo",
        order: 3,
      },
      images: {
        group: "media",
        order: 1,
      },
      rating: {
        group: "details",
        order: 1,
      },
      reviewCount: {
        group: "details",
        order: 2,
      },
      reviews: {
        group: "details",
        order: 3,
      },
      shippingInfo: {
        group: "details",
        order: 4,
      },
      variants: {
        group: "basicInfo",
        order: 4,
      },
    },
  },

  BestSellers: {
    title: "Best Sellers",
    description: "Showcase your best-selling products in a slider format.",
    groups: {
      content: {
        title: "Content",
        order: 1,
        expanded: true,
      },
      appearance: {
        title: "Appearance",
        order: 2,
      },
      slider: {
        title: "Slider Settings",
        order: 3,
      },
    },
    inputs: {
      title: {
        group: "content",
        order: 1,
      },
      cardStyle: {
        group: "appearance",
        order: 1,
      },
      swipeSpeed: {
        group: "slider",
        order: 1,
      },
      bulletColor: {
        group: "appearance",
        order: 2,
      },
      showBullets: {
        group: "slider",
        order: 2,
      },
      showNavigation: {
        group: "slider",
        order: 3,
      },
      showRating: {
        group: "content",
        order: 2,
      },
      showAddToCart: {
        group: "content",
        order: 3,
      },
      showLikeButton: {
        group: "content",
        order: 4,
      },
      showSaleTag: {
        group: "content",
        order: 5,
      },
      effect: {
        group: "slider",
        order: 4,
      },
      backgroundColor: {
        group: "appearance",
        order: 3,
      },
      textColor: {
        group: "appearance",
        order: 4,
      },
    },
  },
};

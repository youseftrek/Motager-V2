// Sample product data for testing
export const sampleProduct = {
  name: "Nike Air Max 270",
  description:
    "The Nike Air Max 270 is the first Air Max designed specifically for all-day comfort. The shoe features a large heel Air unit and a sleek, running-inspired upper for casual, modern style.",
  published: true,
  startPrice: 150.0,
  main_image_url:
    "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-2V5C4p.png",
  images_url: [
    "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/poo67sq8qjetvrr5dymb/air-max-270-shoes-2V5C4p.png",
    "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/xkh1zz0mjfjiwde5lybr/air-max-270-shoes-2V5C4p.png",
    "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/rpnwib3trdm7qqxbka8p/air-max-270-shoes-2V5C4p.png",
  ],
  category: {
    id: 1,
    slug: "athletic-shoes",
  },
  skus: [
    {
      stock: 45,
      price: 150.0,
      compare_at_price: 170.0,
      cost_per_item: 85.0,
      profit: 65.0,
      margin: 43.33,
      image_url:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-2V5C4p.png",
      variants: [
        {
          name: "Color",
          value: "Black/White",
        },
        {
          name: "Size",
          value: "US 9",
        },
      ],
    },
    {
      stock: 32,
      price: 150.0,
      compare_at_price: 170.0,
      cost_per_item: 85.0,
      profit: 65.0,
      margin: 43.33,
      image_url:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/poo67sq8qjetvrr5dymb/air-max-270-shoes-2V5C4p.png",
      variants: [
        {
          name: "Color",
          value: "Black/White",
        },
        {
          name: "Size",
          value: "US 10",
        },
      ],
    },
    {
      stock: 28,
      price: 160.0,
      compare_at_price: 180.0,
      cost_per_item: 90.0,
      profit: 70.0,
      margin: 43.75,
      image_url:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/xkh1zz0mjfjiwde5lybr/air-max-270-shoes-2V5C4p.png",
      variants: [
        {
          name: "Color",
          value: "University Red/Black",
        },
        {
          name: "Size",
          value: "US 10",
        },
      ],
    },
  ],
};

// Function to populate the form with sample data
export const populateFormWithSampleData = (updateFormData) => {
  // Basic info
  updateFormData({
    name: sampleProduct.name,
    description: sampleProduct.description,
    published: sampleProduct.published,
    startPrice: sampleProduct.startPrice,
    main_image_url: sampleProduct.main_image_url,
    images_url: sampleProduct.images_url,
    category: sampleProduct.category,
    has_variants: true,
  });

  // Return the rest of the data for variants and SKUs
  return {
    variants: [
      {
        name: "Color",
        values: ["Black/White", "University Red/Black"],
      },
      {
        name: "Size",
        values: ["US 9", "US 10"],
      },
    ],
    skus: sampleProduct.skus,
  };
};

"use server";

import { Theme } from "@/types/theme";

export async function getTheme(themeId: string) {
  // TODO: API call to get theme by ID
  console.log("themeId: ", themeId);

  const theme: Theme = {
    id: "43bc1e99-89c8-4393-9ad9-01f789c3e786",
    name: "Minimal Theme",
    img: "/themes/minimal-theme.png",
    locPath: "minimal-theme/sections",
    pages: [
      {
        name: "Home",
        sections: [
          "Hero",
          "About",
          "FeaturedCategories",
          "BestSellers",
          "NewsletterSignup",
          "Footer",
        ],
        initialValues: [],
        body: [
          {
            id: "5c0eacaf-a77d-4bcb-822b-6895a6ffa063",
            type: "Hero",
            name: "Hero",
            data: {
              title: "Heading🔥",
              subtitle: "Subtitle",
              button1Text: "Shop",
              button2Text: "Know more",
              imgUrl:
                "https://images.pexels.com/photos/30537429/pexels-photo-30537429.jpeg",
            },
          },
        ],
      },
    ],
  };

  return theme;
}

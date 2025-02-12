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
          "FeaturedCollections",
          "ImageWithText",
          "BestSellers",
          "NewsletterSignup",
          "Footer",
        ],
        initialValues: [],
        body: [
          {
            id: "33ff42bc-47dc-41dc-a039-44a2cab43c16",
            type: "Hero",
            name: "Hero",
            data: {
              title: "Tesx🚀",
              subtitle: "This ih hero title",
              imgUrl:
                "https://images.pexels.com/photos/7836165/pexels-photo-7836165.jpeg?auto=compress&cs=tinysrgb&w=3000",
            },
          },
          {
            id: "33ff42bc-47dc-41dc-a039-44a2cab43c22",
            type: "Hero",
            name: "Hero",
            data: {
              title: "Testttttttttt🔥",
              subtitle: "This ih hero title",
              imgUrl:
                "https://images.pexels.com/photos/7836165/pexels-photo-7836165.jpeg?auto=compress&cs=tinysrgb&w=3000",
            },
          },
        ],
      },
    ],
  };

  return theme;
}

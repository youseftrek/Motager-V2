import { getRandId } from "@/lib/utils";
import { Theme } from "@/types/theme";

export const MINIMAL_THEME: Theme = {
  id: getRandId(),
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
      initialValues: [
        {
          id: getRandId(),
          type: "Hero",
          name: "Hero Section",
          data: {
            title: "Starter Hero Title🔥🔥",
            subtitle: "Starter Hero Subtitle🔥🔥",
          },
        },
      ],

      body: [],
    },
  ],
};

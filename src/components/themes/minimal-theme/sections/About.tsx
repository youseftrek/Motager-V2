export type AboutProps = {
  title: string;
  description: string;
  backgroundColor?: string;
  textColor?: string;
};

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Title",
      placeholder: "About Us",
    },
    description: {
      type: "textarea" as const,
      label: "Description",
      placeholder:
        "We are passionate about delivering the best products to our customers with a focus on quality, sustainability, and customer satisfaction.",
    },
    backgroundColor: {
      type: "color" as const,
      label: "Background Color",
      default: "#212121",
    },
    textColor: {
      type: "color" as const,
      label: "Text Color",
      default: "#ffffff",
    },
  },
};

export default function About({
  title = "About Us",
  description = "We are passionate about delivering the best products to our customers with a focus on quality, sustainability, and customer satisfaction.",
  backgroundColor = "#212121",
  textColor = "#ffffff",
}: AboutProps) {
  return (
    <section
      className="px-4 py-12 text-center"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="mx-auto container">
        <h2 className="mb-4 font-bold text-3xl">{title}</h2>
        <p className="opacity-90 text-lg">{description}</p>
      </div>
    </section>
  );
}

type Props = {
  title: string;
  description?: string;
};

const DashboardPageHeader = ({ title, description }: Props) => {
  return (
    <div className="mb-2 pb-2 border-b">
      <h1 className="font-semibold text-2xl lg:text-3xl">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

export default DashboardPageHeader;

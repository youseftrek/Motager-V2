type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const DashboardPageHeader = ({ title, description, children }: Props) => {
  return (
    <div className="mb-2 pb-2 border-b">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl lg:text-3xl">{title}</h1>
        {children}
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

export default DashboardPageHeader;

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Eye, PencilRuler } from "lucide-react";
import Image from "next/image";

const CurrentThemeTab = () => {
  return (
    <TabsContent
      value="currentTheme"
      className="gap-4 grid grid-cols-1 ltr:lg:grid-cols-[auto_1fr] rtl:lg:grid-cols-[1fr_auto] m-0 w-full h-full"
    >
      <div className="order-1 rtl:order-2 w-fit">
        <Image
          src="/themes/focus-theme.png"
          alt="Theme Preview"
          width={500}
          height={800}
          className="shadow-sm border rounded-lg object-cover"
        />
      </div>
      <div className="order-2 rtl:order-1 rtl:text-right">
        <h3 className="text-muted-foreground text-sm">Your Current Theme:</h3>
        <p className="font-semibold text-3xl">Minimal</p>
        <p className="mt-4 text-muted-foreground text-sm">
          created at: 2024-01-01
        </p>
        <p className="text-muted-foreground text-sm">
          last updated at: 2025-01-01
        </p>
        <div className="flex rtl:flex-row-reverse items-center gap-2 mt-4">
          <Button
            size="sm"
            className="flex rtl:flex-row-reverse items-center gap-2 w-[150px]"
          >
            <PencilRuler />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex rtl:flex-row-reverse items-center gap-2 w-[150px]"
          >
            <Eye />
            View
          </Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default CurrentThemeTab;

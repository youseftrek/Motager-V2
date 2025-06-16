import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";
import AiBasicInfoForm from "./AI/AiBasicInfoForm";
import AiVariantsForm from "./AI/AiVariantsForm";
import AiSkusForm from "./AI/AiSkusForm";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  currStep: 0 | 1 | 2 | 3;
  isModelReady: boolean;
};

const AiDialogForm = ({ currStep, isModelReady = false }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handler for closing dialog after successful generation
  const handleGenerationSuccess = () => {
    toast.success("AI data has been applied to the form");
    // Close the dialog after a short delay for better UX
    setTimeout(() => {
      setIsDialogOpen(false);
    }, 1000);
  };

  // Define dialog content based on current step
  const renderDialogContent = () => {
    switch (currStep) {
      case 0:
        return (
          <AiBasicInfoForm onGenerationSuccess={handleGenerationSuccess} />
        );
      case 1:
        return <AiVariantsForm onGenerationSuccess={handleGenerationSuccess} />;
      case 2:
        return <AiSkusForm onGenerationSuccess={handleGenerationSuccess} />;
      case 3:
        return (
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground text-sm text-center">
              AI assistance is not available in the review step.
              <br />
              Please review your product details manually.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Get dialog title based on current step
  const getDialogTitle = () => {
    switch (currStep) {
      case 0:
        return "AI Basic Information";
      case 1:
        return "AI Variants Generator";
      case 2:
        return "AI SKUs Generator";
      case 3:
        return "AI Help";
      default:
        return "AI Help";
    }
  };

  // Get dialog description based on current step
  const getDialogDescription = () => {
    switch (currStep) {
      case 0:
        return "Upload product images to get AI-generated product name and description.";
      case 1:
        return "Upload product images to automatically detect variants like colors and sizes.";
      case 2:
        return "Generate SKU prices and inventory levels for your product variants.";
      case 3:
        return "AI assistance for product creation.";
      default:
        return "Fill in the form below to get AI assistance in creating your product.";
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild disabled={!isModelReady}>
        <Button variant="softPrimary" size="icon">
          <Bot size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90%] overflow-y-auto">
        <DialogHeader className="ltr:text-left rtl:text-right">
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription className="ltr:text-left rtl:text-right">{getDialogDescription()}</DialogDescription>
        </DialogHeader>

        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AiDialogForm;

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

type Props = {
  currStep: 0 | 1 | 2 | 3;
};

const AiDialogForm = ({ currStep }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="softPrimary" size="icon">
          <Bot size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>AI Help</DialogTitle>
          <DialogDescription>
            Fill in the form below to get AI assistance in creating your
            product.
          </DialogDescription>
        </DialogHeader>

        {currStep === 0 && (
          <div className="space-y-4">
            <AiBasicInfoForm />
          </div>
        )}

        {currStep === 1 && (
          <div className="space-y-4">
            <AiVariantsForm />
          </div>
        )}

        {currStep === 2 && (
          <div className="space-y-4">
            <p>SKUs</p>
          </div>
        )}

        {currStep === 3 && (
          <div className="space-y-4">
            <p>Review</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiDialogForm;

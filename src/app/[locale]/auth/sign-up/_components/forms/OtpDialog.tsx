import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {
  open: boolean;
};

const OtpDialog = ({ open }: Props) => {
  return (
    <Dialog open={open}>
      <DialogTrigger className="hidden">Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Verify your email</DialogTitle>
          <DialogDescription className="text-center">
            Check your email for the OTP code.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center mb-4">
          <InputOTP maxLength={6} className="mb-4">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex flex-col items-center">
          <Button className="w-full max-w-[150px]">Verify</Button>
          <Button className="w-full max-w-[150px]" variant="link">
            Resend OTP
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;

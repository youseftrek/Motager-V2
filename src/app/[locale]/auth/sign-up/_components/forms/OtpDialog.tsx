/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "@/i18n/routing";

type Props = {
  open: boolean;
  email: string;
  // onClose: () => void;
};

const OtpDialog = ({ open, email }: Props) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }

    setLoading(true);
    try {
      console.log(email, otp);

      const res = await axios.post("http://localhost:8080/user/verify-email", {
        email,
        otp,
      });

      if (res.status === 200) {
        toast.success("Email verified successfully");
        // onClose();
        router.push("/auth/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:8080/resend-otp", { email });
      toast.success("OTP resent successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger className="hidden">Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Verify your email</DialogTitle>
          <DialogDescription className="text-center">
            Check your Whatsapp for the OTP code.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center mb-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            className="mb-4"
          >
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
        <div className="flex flex-col items-center gap-2">
          <Button
            className="w-full max-w-[150px]"
            onClick={handleVerify}
            loading={loading}
          >
            Verify
          </Button>
          <Button
            className="w-full max-w-[150px]"
            variant="link"
            onClick={handleResend}
          >
            Resend OTP
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;

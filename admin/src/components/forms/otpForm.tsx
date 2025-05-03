"use client";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import AnimatedButton from "../global/globalButton";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function OtpForm() {
  const [otp, setotp] = useState("");
  const {otpMutation,otpPending}=useAuth()
  return (
    <div className="w-full h-full p-2 flex flex-col justify-center gap-y-2 items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          otpMutation(otp);
        }}
        className=" h-full p-2 flex flex-col justify-center gap-y-2 items-center"
      >
        <h1 className="text-center">OTP</h1>
        <InputOTP
          value={otp}
          onChange={(e) => setotp(e)}
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <AnimatedButton
          type="submit"
          disabled={otp.length < 6}
          className="mt-2"
          text="verify"
          loadingText="verifying..."
          isLoading={otpPending}
        />
      </form>
    </div>
  );
}

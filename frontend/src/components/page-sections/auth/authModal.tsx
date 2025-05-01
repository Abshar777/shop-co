"use client";
import { SignupForm } from "@/components/forms/signUpForm";
import { LoginForm } from "@/components/forms/loginForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const AuthModal = ({
  isOpen,
  closeModal,
  nowProp = "login",
}: {
  isOpen: boolean;
  closeModal: () => void;
  nowProp: "login" | "signup";
}) => {
  const [now, setNow] = useState<"login" | "signup">(nowProp);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle className="text-center text-2xl">
            {now === "login" ? "Login" : "Signup"}
          </DialogTitle>
          <DialogDescription className="text-center">
            please enter your email and password to{" "}
            {now === "login" ? "login" : "signup"} to your account
          </DialogDescription>
          {now === "login" ? <LoginForm /> : <SignupForm />}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>

          <div className="grid gap-4 ">
      

            <Button variant="outline" className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-5"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>

          <div className="text-center text-sm text-muted-foreground mt-4">
            {now === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}
            <a
              onClick={() => setNow(now === "login" ? "signup" : "login")}
              className="text-primary cursor-pointer font-medium hover:underline"
            >
              {now === "login" ? "Sign Up" : "Login"}
            </a>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

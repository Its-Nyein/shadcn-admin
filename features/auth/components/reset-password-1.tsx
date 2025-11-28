"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, KeyRound, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  emailSchema,
  EmailSchema,
  otpSchema,
  OtpSchema,
  passwordSchema,
  PasswordSchema,
} from "../utils/reset-password-schema";

const steps = [
  {
    id: 1,
    title: "Verify Email",
    description: "Enter your account email",
    icon: Mail,
  },
  {
    id: 2,
    title: "Enter OTP",
    description: "Enter the 6-digit code sent to your email",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "New Password",
    description: "Create a new secure password",
    icon: KeyRound,
  },
];

export default function ResetPassword1() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const emailForm = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const passwordForm = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleEmailSubmit = async (data: EmailSchema) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setEmail(data.email);
      setCurrentStep(2);
      toast.success("Verification code sent to your email!");
    } catch {
      toast.error("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (data: OtpSchema) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("OTP verified:", data.otp);
      setCurrentStep(3);
      toast.success("Email verified successfully!");
    } catch {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (data: PasswordSchema) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password reset:", data.password);
      toast.success("Password reset successfully!");
      window.location.href = "/sign-in";
    } catch {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen w-full lg:grid-cols-2">
      {/* Left Column - Steps Info */}
      <div className="relative hidden overflow-hidden bg-zinc-950 lg:block">
        <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 via-transparent to-cyan-600/20" />
        <div className="absolute inset-0 bg-linear-to-tr from-fuchsia-600/10 via-transparent to-amber-600/10 animate-pulse" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 opacity-20 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 opacity-20 blur-3xl animate-[pulse_5s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 right-1/3 h-64 w-64 rounded-full bg-linear-to-r from-amber-500 to-orange-500 opacity-10 blur-3xl animate-[pulse_6s_ease-in-out_infinite_2s]" />

        <div className="absolute top-20 right-20 h-20 w-20 rotate-45 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm animate-[bounce_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-32 left-20 h-16 w-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-[bounce_5s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 left-1/4 h-12 w-12 rotate-12 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm animate-[bounce_7s_ease-in-out_infinite_0.5s]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 text-lg font-bold text-white shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-105">
              SA
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-white">
                Shadcn Admin
              </span>
              <span className="text-sm text-zinc-400">Admin Dashboard</span>
            </div>
          </Link>

          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">
                Account Recovery
              </h2>
              <p className="text-zinc-400 max-w-md mx-auto">
                Securely reset your password in three simple steps. We&apos;ll
                send you a one-time password to verify your email, then you can
                set a new password for your account.
              </p>
            </div>

            <div className="space-y-6 w-full max-w-sm">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;

                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                        isCompleted &&
                          "border-green-500 bg-green-500/20 text-green-400",
                        isActive &&
                          "border-violet-500 bg-violet-500/20 text-violet-400",
                        !isCompleted &&
                          !isActive &&
                          "border-zinc-700 bg-zinc-800/50 text-zinc-500",
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="size-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step.id}</span>
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2">
                        <Icon
                          className={cn(
                            "size-4",
                            isCompleted && "text-green-400",
                            isActive && "text-violet-400",
                            !isCompleted && !isActive && "text-zinc-500",
                          )}
                        />
                        <h3
                          className={cn(
                            "font-semibold",
                            isCompleted && "text-green-400",
                            isActive && "text-white",
                            !isCompleted && !isActive && "text-zinc-500",
                          )}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p
                        className={cn(
                          "text-sm mt-0.5",
                          isActive ? "text-zinc-300" : "text-zinc-600",
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="max-w-md space-y-4">
            <blockquote className="text-lg italic text-zinc-300">
              &ldquo;Your security is our priority. Rest assured your account is
              in safe hands.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right Column - Reset Password Form */}
      <div className="flex items-center justify-center bg-background p-6 lg:p-12">
        <div className="mx-auto w-full max-w-[400px] space-y-8">
          <div className="flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">
              SA
            </div>
            <span className="text-lg font-semibold">Shadcn Admin</span>
          </div>

          {/* Mobile Steps Indicator */}
          <div className="flex items-center justify-center gap-2 lg:hidden">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "h-2 w-8 rounded-full transition-all",
                  currentStep === step.id && "bg-violet-500",
                  currentStep > step.id && "bg-green-500",
                  currentStep < step.id && "bg-muted",
                )}
              />
            ))}
          </div>

          <Card className="border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">Reset Password</CardTitle>
                <ShieldCheck className="size-5 text-violet-500" />
              </div>
              <CardDescription>
                {currentStep === 1 &&
                  "Enter the email address associated with your account. We'll send you a verification code."}
                {currentStep === 2 &&
                  `We've sent a 6-digit verification code to ${email}. Please enter it below.`}
                {currentStep === 3 &&
                  "Create a new secure password for your account. Make sure it's at least 8 characters."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Email */}
              {currentStep === 1 && (
                <Form {...emailForm}>
                  <form
                    onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="name@example.com"
                              disabled={isLoading}
                              className="h-12 bg-muted/30 border-muted-foreground/20 transition-colors focus:bg-background"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="h-12 w-full bg-linear-to-r from-violet-600 to-fuchsia-600 font-medium text-white transition-all hover:from-violet-700 hover:to-fuchsia-700 hover:shadow-lg hover:shadow-violet-500/25"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="size-4 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Verification Code"
                      )}
                    </Button>
                  </form>
                </Form>
              )}

              {/* Step 2: OTP */}
              {currentStep === 2 && (
                <Form {...otpForm}>
                  <form
                    onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification Code</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="000000"
                              maxLength={6}
                              disabled={isLoading}
                              className="h-12 bg-muted/30 border-muted-foreground/20 transition-colors focus:bg-background text-center text-lg tracking-[0.5em] font-mono"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="h-12 w-full bg-linear-to-r from-violet-600 to-fuchsia-600 font-medium text-white transition-all hover:from-violet-700 hover:to-fuchsia-700 hover:shadow-lg hover:shadow-violet-500/25"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="size-4 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Verifying...
                        </span>
                      ) : (
                        "Verify Code"
                      )}
                    </Button>
                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => {
                          toast.info("Verification code resent!");
                        }}
                      >
                        Didn&apos;t receive the code? Resend
                      </button>
                    </div>
                  </form>
                </Form>
              )}

              {/* Step 3: New Password */}
              {currentStep === 3 && (
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter new password"
                              disabled={isLoading}
                              className="h-12 bg-muted/30 border-muted-foreground/20 transition-colors focus:bg-background"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm new password"
                              disabled={isLoading}
                              className="h-12 bg-muted/30 border-muted-foreground/20 transition-colors focus:bg-background"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="h-12 w-full bg-linear-to-r from-violet-600 to-fuchsia-600 font-medium text-white transition-all hover:from-violet-700 hover:to-fuchsia-700 hover:shadow-lg hover:shadow-violet-500/25"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="size-4 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Resetting...
                        </span>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                </Form>
              )}

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  Remember your password?{" "}
                </span>
                <Link
                  href="/sign-in"
                  className="text-violet-500 hover:text-violet-600 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

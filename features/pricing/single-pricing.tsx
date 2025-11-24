"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import { useState } from "react";

const features = [
  "Unlimited access to all courses",
  "Personalized learning paths",
  "Progress tracking and analytics",
  "Offline viewing on mobile app",
  "Certificate of completion",
  "24/7 customer support",
];

export function SinglePricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const monthlyPrice = 14.99;
  const annualPrice = 149.99;
  const annualMonthlyEquivalent = (annualPrice / 12).toFixed(2);

  return (
    <div className="px-4 py-4 lg:px-6">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-lg">
          Invest in yourself with our Pro Plan
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card className="relative overflow-hidden">
          <div className="bg-primary/10 absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl" />
          <div className="bg-primary/5 absolute -bottom-8 -left-8 h-24 w-24 rounded-full blur-2xl" />

          <CardHeader className="relative border-b text-center">
            <div className="mb-2 flex justify-center">
              <Badge variant="secondary" className="text-sm font-medium">
                Pro Plan
              </Badge>
            </div>
            <CardTitle className="text-2xl">
              Everything you need to master new skills
            </CardTitle>
            <CardDescription className="mt-2">
              Join thousands of learners accelerating their careers
            </CardDescription>
          </CardHeader>

          <CardContent className="relative pt-6">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <ul className="flex-1 space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="text-primary h-5 w-5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-border hidden w-px md:block" />

              <div className="flex flex-1 flex-col items-center gap-4">
                {/* Billing Toggle */}
                <div className="relative flex items-center justify-center gap-4">
                  <span
                    className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    Monthly
                  </span>
                  <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
                  <span
                    className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    Annual
                  </span>
                  {isAnnual && (
                    <Badge className="absolute -right-10 -top-8 bg-green-500/10 text-green-600 hover:bg-green-500/10 dark:text-green-400">
                      Save 17%
                    </Badge>
                  )}
                </div>

                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold">
                      ${isAnnual ? annualMonthlyEquivalent : monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {isAnnual && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      Billed annually at ${annualPrice}
                    </p>
                  )}
                </div>

                <Button size="lg" className="w-full max-w-xs text-base">
                  Start {isAnnual ? "Annual" : "Monthly"} Plan
                </Button>
                <p className="text-muted-foreground text-center text-xs">
                  30-day money-back guarantee. Cancel anytime.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

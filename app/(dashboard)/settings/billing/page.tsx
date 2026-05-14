"use client";

import { ContentSection } from "@/components/shared/content-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function BillingPage() {
  return (
    <ContentSection
      title="Billing"
      desc="Manage your subscription and payment methods."
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Current Plan
          </CardTitle>
          <CardDescription>You are on the free plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Upgrade to Pro</Button>
        </CardContent>
      </Card>
    </ContentSection>
  );
}

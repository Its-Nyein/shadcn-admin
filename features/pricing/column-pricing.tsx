import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    description: "Essential features for individuals",
    price: "$9.99",
    period: "/month",
    features: [
      "1 user",
      "5GB storage",
      "Basic support",
      "Limited integrations",
    ],
    buttonText: "Choose Basic",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    description: "Advanced features for professionals",
    price: "$19.99",
    period: "/month",
    features: [
      "5 users",
      "50GB storage",
      "Priority support",
      "Advanced integrations",
      "Analytics",
    ],
    buttonText: "Choose Pro",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Comprehensive solution for teams",
    price: "$49.99",
    period: "/month",
    features: [
      "Unlimited users",
      "500GB storage",
      "24/7 premium support",
      "Custom integrations",
      "Advanced analytics",
      "API access",
    ],
    buttonText: "Choose Enterprise",
    variant: "outline" as const,
  },
];

export function ColumnPricing() {
  return (
    <div className="px-4 py-4 lg:px-6">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Pricing Plans</h1>
        <p className="text-muted-foreground text-lg">
          Choose the perfect plan for your needs
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 pt-8 md:grid-cols-3">
        {pricingPlans.map((plan) => {
          const isPopular = Boolean(plan.popular);
          const cardClasses = `relative flex h-full flex-col transition-all ${
            isPopular
              ? "border-primary z-10 md:scale-110 md:px-8 md:py-8 shadow-2xl"
              : "md:mt-0 md:scale-100"
          }`;

          return (
            <Card key={plan.name} className={cardClasses}>
              {plan.popular && (
                <div className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6 text-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="text-primary size-4" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.variant} className="w-full">
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

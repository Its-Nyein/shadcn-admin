"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqSections = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click on the 'Sign Up' button in the top right corner. You'll need to provide your email address and create a password. Once you verify your email, you'll be able to access all features.",
      },
      {
        question: "What features are available in the free plan?",
        answer:
          "The free plan includes basic features such as creating up to 10 projects, 5GB of storage, and access to community support. For advanced features like unlimited projects, priority support, and API access, consider upgrading to a paid plan.",
      },
      {
        question: "How do I get started with my first project?",
        answer:
          "After signing up, navigate to the dashboard and click 'Create New Project'. Follow the setup wizard to configure your project settings, invite team members, and start building.",
      },
    ],
  },
  {
    category: "Account & Settings",
    questions: [
      {
        question: "How do I change my password?",
        answer:
          "Go to Settings > Security > Change Password. Enter your current password and your new password twice. Make sure your new password is at least 8 characters long and includes a mix of letters, numbers, and special characters.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "Yes, you can change your email address in Settings > Account > Email. You'll need to verify your new email address before it becomes active. Make sure to check your spam folder for the verification email.",
      },
      {
        question: "How do I enable two-factor authentication?",
        answer:
          "Navigate to Settings > Security > Two-Factor Authentication and click 'Enable'. You'll need to scan a QR code with an authenticator app like Google Authenticator or Authy. Keep your backup codes in a safe place.",
      },
    ],
  },
  {
    category: "Billing & Payments",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through our payment partners.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, you can cancel your subscription at any time from Settings > Billing. Your subscription will remain active until the end of your current billing period, and you'll continue to have access to all features until then.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund. Refunds for annual plans are prorated based on unused time.",
      },
    ],
  },
];

export function FAQAccordion() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {faqSections.map((section) => (
          <Card key={section.category}>
            <CardHeader>
              <CardTitle className="text-lg">{section.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${section.category}-${index}`}
                  >
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

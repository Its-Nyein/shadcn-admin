"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

const popularArticles = [
  {
    title: "Getting Started: Your First Project",
    description:
      "Learn how to set up your first project and navigate the dashboard",
    category: "Getting Started",
    readTime: "5 min read",
    views: "12.5k",
    href: "#",
  },
  {
    title: "Understanding User Roles and Permissions",
    description:
      "A comprehensive guide to managing team members and their access levels",
    category: "Team & Collaboration",
    readTime: "8 min read",
    views: "8.2k",
    href: "#",
  },
  {
    title: "Setting Up Two-Factor Authentication",
    description: "Step-by-step instructions to secure your account with 2FA",
    category: "Security & Privacy",
    readTime: "3 min read",
    views: "15.3k",
    href: "#",
  },
  {
    title: "API Authentication and Best Practices",
    description:
      "Learn how to authenticate API requests and follow security best practices",
    category: "API & Integrations",
    readTime: "12 min read",
    views: "6.7k",
    href: "#",
  },
  {
    title: "Managing Billing and Subscriptions",
    description: "Everything you need to know about managing your subscription",
    category: "Billing & Payments",
    readTime: "4 min read",
    views: "9.1k",
    href: "#",
  },
  {
    title: "Customizing Your Workspace",
    description:
      "Personalize your dashboard and workspace to fit your workflow",
    category: "Account & Settings",
    readTime: "6 min read",
    views: "7.4k",
    href: "#",
  },
];

export function PopularArticles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Popular Articles</h2>
        <Link
          href="#"
          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          View all articles →
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {popularArticles.map((article, index) => (
          <Link key={index} href={article.href}>
            <Card className="h-full border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                  <BookOpen className="text-muted-foreground size-5 shrink-0" />
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="size-3" />
                      {article.views} views
                    </div>
                  </div>
                  <ArrowRight className="text-muted-foreground size-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

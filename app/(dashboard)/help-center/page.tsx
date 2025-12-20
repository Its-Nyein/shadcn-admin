import { CategoryCards } from "@/features/help-center/components/category-cards";
import { FAQAccordion } from "@/features/help-center/components/faq-accordion";
import { HelpSearchHero } from "@/features/help-center/components/help-search-hero";
import { PopularArticles } from "@/features/help-center/components/popular-articles";

export default function HelpCenterPage() {
  return (
    <>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">
            Find answers, guides, and support resources
          </p>
        </div>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-8 pb-8">
        <HelpSearchHero />
        <CategoryCards />
        <PopularArticles />
        <FAQAccordion />
      </div>
    </>
  );
}

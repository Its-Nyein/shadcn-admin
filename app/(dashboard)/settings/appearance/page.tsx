"use client";

import { ContentSection } from "@/components/content-section";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FontOption, useFont } from "@/contexts/font-context";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    message: "Please select a theme.",
  }),
  font: z.enum(["inter", "manrope", "system"], {
    message: "Please select a font.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const defaultValues: Partial<AppearanceFormValues> = {
  theme: "light",
  font: "inter",
};

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      ...defaultValues,
      font: font,
    },
  });

  useEffect(() => {
    if (theme && theme !== form.getValues("theme")) {
      form.setValue("theme", theme as "light" | "dark");
    }
    if (font && font !== form.getValues("font")) {
      form.setValue("font", font);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, font]);

  function onSubmit(data: AppearanceFormValues) {
    setTheme(data.theme);
    setFont(data.font as FontOption);
    toast.message("Appearance updated successfully!", {
      description: (
        <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4">
          <code className="text-white text-xs">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <ContentSection
      title="Appearance"
      desc="Customize the appearance of the app. Automatically switch between day and night themes."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="font"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {["inter", "manrope", "system"].map((font) => (
                    <div
                      key={font}
                      onClick={() => field.onChange(font)}
                      className={cn(
                        "cursor-pointer rounded-md border-2 px-4 py-2 text-sm font-medium transition-colors",
                        field.value === font
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-muted-foreground/50",
                      )}
                    >
                      {font.charAt(0).toUpperCase() + font.slice(1)}
                    </div>
                  ))}
                </div>
                <FormDescription>
                  Set the font you want to use in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <FormDescription>
                  Select the theme for the dashboard.
                </FormDescription>
                <FormControl>
                  <div className="grid max-w-md grid-cols-2 gap-8 pt-2">
                    <div className="space-y-2">
                      <div
                        onClick={() => field.onChange("light")}
                        className={cn(
                          "cursor-pointer rounded-md border-2 p-1 transition-colors",
                          field.value === "light"
                            ? "border-primary"
                            : "border-muted hover:border-muted-foreground/50",
                        )}
                      >
                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                          <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full text-center text-sm font-normal">
                        Light
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div
                        onClick={() => field.onChange("dark")}
                        className={cn(
                          "cursor-pointer rounded-md border-2 p-1 transition-colors",
                          field.value === "dark"
                            ? "border-primary"
                            : "border-muted hover:border-muted-foreground/50",
                        )}
                      >
                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full text-center text-sm font-normal">
                        Dark
                      </span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update preferences</Button>
        </form>
      </Form>
    </ContentSection>
  );
}

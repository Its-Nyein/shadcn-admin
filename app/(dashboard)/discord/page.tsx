import { AnimatedList } from "@/components/animated-list";
import MockDiscordUI from "@/features/discord/components/discord";
import DiscordMessage from "@/features/discord/components/discord-message";

export default function DiscordPage() {
  return (
    <>
      <div className="px-4 py-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Discord</h1>
          <p className="text-muted-foreground">
            Chat with your team in real-time
          </p>
        </div>
      </div>
      <div className="mx-4 rounded-xl bg-[#202225] p-2 ring-1 ring-inset ring-gray-900/10 lg:mx-6 lg:rounded-2xl lg:p-4">
        <MockDiscordUI>
          <AnimatedList delay={0.1}>
            <DiscordMessage
              avatarSrc="https://github.com/shadcn.png"
              avatarAlt="Alex Morgan avatar"
              username="Alex Morgan"
              timestamp="Today at 12:45AM"
              badgeText="SignUp"
              badgeColor="#43b581"
              title="New user signed up"
              content={{
                name: "Jordan Lee",
                email: "jordan.lee@shadcn.dev",
              }}
            />

            <DiscordMessage
              avatarSrc="https://github.com/leerob.png"
              avatarAlt="Jordan Lee Avatar"
              username="Jordan Lee"
              timestamp="Today at 01:00AM"
              badgeText="Revenue"
              badgeColor="#faa61a"
              title="Payment received"
              content={{
                amount: "$49.00",
                email: "taylor.swift@shadcn.dev",
                plan: "PRO",
              }}
            />

            <DiscordMessage
              avatarSrc="https://github.com/rauchg.png"
              avatarAlt="Taylor Swift Avatar"
              username="Taylor Swift"
              timestamp="Today at 5:11AM"
              badgeText="Milestone"
              badgeColor="#5865f2"
              title="Revenue Milestone Achieved"
              content={{
                recurringRevenue: "$10,000 USD",
                growth: "+12.5%",
              }}
            />
          </AnimatedList>
        </MockDiscordUI>
      </div>
    </>
  );
}

import { accounts, mails } from "@/constants/mail-data";
import { Mail } from "@/features/mail/components/mail";

export default function MailPage() {
  return (
    <>
      <div className="px-4 lg:px-6 py-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Mail</h1>
        <p className="text-muted-foreground">
          Manage your mail inbox and compose new messages.
        </p>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        <Mail
          accounts={accounts}
          mails={mails}
          navCollapsedSize={4}
          defaultLayout={[20, 32, 48]}
          defaultCollapsed={false}
        />
      </div>
    </>
  );
}

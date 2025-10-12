import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardRecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/06.png" alt="Avatar" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Ava Rodriguez</p>
            <p className="text-muted-foreground text-sm">
              ava.rodriguez@email.com
            </p>
          </div>
          <div className="font-medium">+$2,450.00</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/07.png" alt="Avatar" />
          <AvatarFallback>LM</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Liam Murphy</p>
            <p className="text-muted-foreground text-sm">
              liam.murphy@email.com
            </p>
          </div>
          <div className="font-medium">+$135.00</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/08.png" alt="Avatar" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Chloe Harris</p>
            <p className="text-muted-foreground text-sm">
              chloe.harris@email.com
            </p>
          </div>
          <div className="font-medium">+$720.00</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/09.png" alt="Avatar" />
          <AvatarFallback>EM</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Ethan Moore</p>
            <p className="text-muted-foreground text-sm">
              ethan.moore@email.com
            </p>
          </div>
          <div className="font-medium">+$560.00</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/10.png" alt="Avatar" />
          <AvatarFallback>GR</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Grace Reynolds</p>
            <p className="text-muted-foreground text-sm">
              grace.reynolds@email.com
            </p>
          </div>
          <div className="font-medium">+$85.00</div>
        </div>
      </div>
    </div>
  );
}

import { KanbanBoard } from "@/features/kanban/components/kanban-board";

export default function KanbanPage() {
  return (
    <>
      <div className="px-4 py-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-muted-foreground">
            Visualize and manage your tasks with drag and drop
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-4 lg:px-6">
        <KanbanBoard />
      </div>
    </>
  );
}

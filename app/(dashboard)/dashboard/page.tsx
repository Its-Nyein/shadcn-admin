import { ChartAreaInteractive } from "@/features/dashboard/components/chart-area-interactive";
import { DataTable } from "@/features/dashboard/components/data-table";
import { SectionCards } from "@/features/dashboard/components/selection-cards";

import data from "@/constants/data.json";
import focusDocumentsData from "@/constants/format-documents-data.json";
import keyPersonnelData from "@/constants/key-personal-data.json";
import pastPerformanceData from "@/constants/past-performance-data.json";

export default function Page() {
  return (
    <>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your admin dashboard
          </p>
        </div>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        <SectionCards />
        <ChartAreaInteractive />
      </div>
      <div className="@container/main">
        <DataTable
          data={data}
          pastPerformanceData={pastPerformanceData}
          keyPersonnelData={keyPersonnelData}
          focusDocumentsData={focusDocumentsData}
        />
      </div>
    </>
  );
}

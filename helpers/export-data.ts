export interface ExportColumn<T> {
  key: keyof T;
  label: string;
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: ExportColumn<T>[],
) {
  if (data.length === 0) return;

  const cols =
    columns ??
    Object.keys(data[0]).map((key) => ({
      key: key as keyof T,
      label: key as string,
    }));

  const header = cols.map((col) => `"${col.label}"`).join(",");
  const rows = data.map((row) =>
    cols
      .map((col) => {
        const value = row[col.key];
        if (value === null || value === undefined) return '""';
        const str =
          typeof value === "object" ? JSON.stringify(value) : String(value);
        return `"${str.replace(/"/g, '""')}"`;
      })
      .join(","),
  );

  const csv = [header, ...rows].join("\n");
  downloadFile(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
}

export function exportToJSON<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: ExportColumn<T>[],
) {
  if (data.length === 0) return;

  const output = columns
    ? data.map((row) => {
        const obj: Record<string, unknown> = {};
        for (const col of columns) {
          obj[col.label] = row[col.key];
        }
        return obj;
      })
    : data;

  const json = JSON.stringify(output, null, 2);
  downloadFile(json, `${filename}.json`, "application/json;charset=utf-8;");
}

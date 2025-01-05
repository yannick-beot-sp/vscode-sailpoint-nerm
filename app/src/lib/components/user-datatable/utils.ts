import type { MyColumnDef } from "./columns";

export function createVisibilityMap<T>(columnDefs: MyColumnDef<T>[]): Record<string, boolean> {
  const visibilityMap: Record<string, boolean> = {};

  for (const columnDef of columnDefs) {
    if (columnDef.id && columnDef.enableHiding !== false) {
      visibilityMap[columnDef.id] = columnDef.isVisibleByDefault ?? true;
    }
  }

  return visibilityMap;
}
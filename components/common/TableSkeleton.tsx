import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {["Column 1", "Column 2", "Column 3", "Column 4"].map(
              (header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b"
                >
                  <Skeleton className="h-4 w-20" />
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: 4 }).map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-3 border-b">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react'

interface Column {
  label: string
  align?: 'left' | 'center' | 'right'
}

interface DashboardTableProps<T> {
  title: string
  description: string
  columns: Column[]
  data: T[]
  renderRow: (item: T, index: number) => React.ReactNode
}

export default function DashboardTable<T>({
  title,
  description,
  columns,
  data,
  renderRow,
}: DashboardTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-background shadow-sm">
      <div className="border-b border-foreground/10 p-6">
        <h2 className="font-heading text-xl font-bold text-foreground">
          {title}
        </h2>
        <p className="text-sm text-foreground/60">{description}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-foreground/5 text-foreground/80">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`p-4 font-semibold ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {data.length > 0 ? (
              data.map((item, idx) => renderRow(item, idx))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-foreground/50"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const formatCurrency = (value: number | undefined) => {
  return `$${(value || 0).toLocaleString('es-UY', { minimumFractionDigits: 2 })}`
}
import React from 'react'
import DashboardTable from '@/components/ui/Table'
import StatCard from './components/StatCard'
import {
  fetchReportData,
  ClienteReport,
  ConsumoReport,
  MantenimientoReport,
  MaquinaReport,
} from '@/lib/services/reports'

export default async function DashboardPage() {
  const [clientesData, consumosData, mantenimientosData, maquinasData] =
    await Promise.all([
      fetchReportData<ClienteReport>('clientes'),
      fetchReportData<ConsumoReport>('consumos'),
      fetchReportData<MantenimientoReport>('mantenimientos'),
      fetchReportData<MaquinaReport>('maquinas'),
    ])

  // --- Calculate Aggregates ---
  const totalRevenue = clientesData.reduce(
    (acc, curr) => acc + (Number(curr.total_a_cobrar) || 0),
    0,
  )
  const totalMaintenances = mantenimientosData.reduce(
    (acc, curr) => acc + (Number(curr.mantenimientos_realizados) || 0),
    0,
  )
  const topClient =
    maquinasData.length > 0 ? `Client #${maquinasData[0].id_cliente}` : 'N/A'
  const topConsumable =
    consumosData.length > 0 ? `Item #${consumosData[0].id_insumo}` : 'N/A'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground">
          Operations Dashboard
        </h1>
        <p className="mt-2 text-lg text-foreground/60">
          Live metrics and reports from your fleet.
        </p>
      </div>

      {/* Top Bar Stats */}
      <div className="mb-10 flex gap-4">
        <StatCard
          title="Expected Revenue"
          value={formatCurrency(totalRevenue)}
          description="From machine rentals & usage"
          highlight
        />
        <StatCard
          title="Largest Fleet"
          value={topClient}
          description="Client with most machines"
        />
        <StatCard
          title="Total Interventions"
          value={totalMaintenances}
          description="Maintenance jobs completed"
        />
        <StatCard
          title="Top Consumable"
          value={topConsumable}
          description="Highest usage volume"
        />
      </div>

      {/* Tables */}
      <div className="flex flex-col gap-4 mt-4">
        <DashboardTable
          title="Monthly Invoicing"
          description="Billing totals for the previous month."
          columns={[
            { label: 'Client ID' },
            { label: 'Total to Charge', align: 'right' },
          ]}
          data={clientesData}
          renderRow={(client, idx) => (
            <tr key={idx} className="transition-colors hover:bg-foreground/5">
              <td className="p-4 font-medium text-foreground">
                #{client.id_cliente}
              </td>
              <td className="p-4 text-right font-bold text-primary">
                {/* Safe formatting: Fallback to 0 if undefined */}$
                {(client.total_a_cobrar || 0).toLocaleString('es-UY', {
                  minimumFractionDigits: 2,
                })}
              </td>
            </tr>
          )}
        />

        <DashboardTable
          title="Fleet Distribution"
          description="Clients with the most machines deployed."
          columns={[
            { label: 'Client ID' },
            { label: 'Machine Count', align: 'right' },
          ]}
          data={maquinasData}
          renderRow={(maq, idx) => (
            <tr key={idx} className="transition-colors hover:bg-foreground/5">
              <td className="p-4 font-medium text-foreground">
                #{maq.id_cliente}
              </td>
              <td className="p-4 text-right font-bold text-foreground">
                {maq.cantidad_maquinas || 0}
              </td>
            </tr>
          )}
        />

        <DashboardTable
          title="Consumable Usage"
          description="Total items used and unit pricing."
          columns={[
            { label: 'Item ID' },
            { label: 'Unit Price' },
            { label: 'Quantity Used', align: 'right' },
          ]}
          data={consumosData}
          renderRow={(item, idx) => (
            <tr key={idx} className="transition-colors hover:bg-foreground/5">
              <td className="p-4 font-medium text-foreground">
                #{item.id_insumo}
              </td>
              <td className="p-4 text-foreground/80">
                ${(item.precio_unitario || 0).toLocaleString('es-UY')}
              </td>
              <td className="p-4 text-right font-bold text-foreground">
                {item.consumo || 0}
              </td>
            </tr>
          )}
        />

        <DashboardTable
          title="Technician Performance"
          description="Top staff by maintenance jobs completed."
          columns={[
            { label: 'Technician CI' },
            { label: 'Services Performed', align: 'right' },
          ]}
          data={mantenimientosData}
          renderRow={(tech, idx) => (
            <tr key={idx} className="transition-colors hover:bg-foreground/5">
              <td className="p-4 font-medium text-foreground">
                {tech.ci_tecnico}
              </td>
              <td className="p-4 text-right font-bold text-foreground">
                {tech.mantenimientos_realizados || 0}
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  )
}

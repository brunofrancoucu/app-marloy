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
import { Locale } from '@/lib/services/language/hooks'
import { getDictionary } from '@/lib/services/language/server'
const formatCurrency = (value: number | undefined) => {
  return `$${(value || 0).toLocaleString('es-UY', { minimumFractionDigits: 2 })}`
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
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
          {dict.dashboard.title}
        </h1>
        <p className="mt-2 text-lg text-foreground/60">
          {dict.dashboard.subtitle}
        </p>
      </div>

      {/* Top Bar Stats */}
      <div className="mb-10 flex gap-4">
        <StatCard
          title={dict.dashboard.stats.revenue_title}
          description={dict.dashboard.stats.revenue_desc}
          value={formatCurrency(totalRevenue)}
          highlight
        />
        <StatCard
          title={dict.dashboard.stats.fleet_title}
          description={dict.dashboard.stats.fleet_desc}
          value={topClient}
        />
        <StatCard
          title={dict.dashboard.stats.interventions_title}
          description={dict.dashboard.stats.interventions_desc}
          value={totalMaintenances}
        />
        <StatCard
          title={dict.dashboard.stats.consumable_title}
          description={dict.dashboard.stats.consumable_desc}
          value={topConsumable}
        />
      </div>

      {/* Tables */}
      <div className="flex flex-col gap-4 mt-4">
        <DashboardTable
          title={dict.dashboard.tables.invoicing_title}
          description={dict.dashboard.tables.invoicing_desc}
          columns={[
            { label: dict.dashboard.tables.cols.client_id },
            { label: dict.dashboard.tables.cols.total_charge, align: 'right' },
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
          title={dict.dashboard.tables.consumable_title}
          description={dict.dashboard.tables.consumable_desc}
          columns={[
            { label: dict.dashboard.tables.cols.client_id },
            { label: dict.dashboard.tables.cols.machine_count, align: 'right' },
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
          title={dict.dashboard.tables.consumable_title}
          description={dict.dashboard.tables.consumable_desc}
          columns={[
            { label: dict.dashboard.tables.cols.item_id },
            { label: dict.dashboard.tables.cols.unit_price },
            { label: dict.dashboard.tables.cols.qty_used, align: 'right' },
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
          title={dict.dashboard.tables.tech_title}
          description={dict.dashboard.tables.tech_desc}
          columns={[
            { label: dict.dashboard.tables.cols.tech_ci },
            {
              label: dict.dashboard.tables.cols.services_performed,
              align: 'right',
            },
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

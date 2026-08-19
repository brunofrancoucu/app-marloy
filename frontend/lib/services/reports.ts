import { cookies } from 'next/headers'

// Export the types so your components can use them
export type ClienteReport = { id_cliente: number; total_a_cobrar?: number }
export type ConsumoReport = {
  id_insumo: number
  precio_unitario?: number
  consumo?: number
}
export type MantenimientoReport = {
  ci_tecnico: number
  mantenimientos_realizados?: number
}
export type MaquinaReport = { id_cliente: number; cantidad_maquinas?: number }

export async function fetchReportData<T>(endpoint: string): Promise<T[]> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('jwtToken')?.value

    const backendUrl = process.env.API_URL || 'http://backend:8000'
    const res = await fetch(`${backendUrl}/reports/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Cookie: `jwtToken=${token}` }),
      },
      cache: 'no-store',
    })

    if (!res.ok) return []
    const data = await res.json()

    if (Array.isArray(data) && Array.isArray(data[1])) {
      return data[1]
    }
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return []
  }
}

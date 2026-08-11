// "use client"
import Test from '@/components/forms/Test'
import Logout from '@/components/forms/Logout'

export default function Dashboard() {
  // useSwr
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <header className="p-6 border-b border-gray-200 dark:border-slate-800 flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* <ThemeToggle /> */}
        </header>

        <main className="p-6">
          <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg shadow-sm">
            <p>This card automatically adapts to the current theme.</p>
          </div>
        </main>
      </div>
      <Test />
      <Logout />
    </div>
  )
}

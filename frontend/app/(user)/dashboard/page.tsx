// "use client"
import Test from "@/components/forms/Test"
import Logout from "@/components/forms/Logout"

export default function Dashboard() {
  // useSwr
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <Test />
      <Logout />
    </div>
  )
}

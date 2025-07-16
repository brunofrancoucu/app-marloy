"use client"

import { useRouter } from "next/navigation"

const Logout: React.FC = () => {
  const router = useRouter()

  const logout = async () => {
    const res = await fetch("http://127.0.0.1:8000/logout", {
      credentials: "include",
      method: "POST",
    })
    if (res.ok) {
      const data = await res.json()
      console.log("Logout: ", data)
      router.push("/login")
    }
  }
  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      onClick={() => {
        logout()
      }}
    >
      Logout
    </button>
  )
}

export default Logout

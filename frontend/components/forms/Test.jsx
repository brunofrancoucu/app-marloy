"use client"

export default function Bt() {
  const fet = async () => {
    const response = await fetch("http://127.0.0.1:8000/proveedores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (response.ok) {
      // Handle successful login (e.g., redirect)
      const data = await response.json()
      console.log("Proveedores:", data)
    }
  }
  // useSwr
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => {
        fet()
      }}
    >
      Proveedores
    </button>
  )
}

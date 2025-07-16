"use client"

import { resolve } from "path"
import React, { use, useState } from "react"
import { useRouter } from "next/navigation"
import Test from "./Test"

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          correo: username,
          pwd_hash: password,
        }),
      })

      if (response.ok) {
        // Handle successful login (e.g., redirect)
        console.log("Login successful")
        router.push("/dashboard") // Redirect to home page or dashboard
        router.refresh()
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Login failed")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Login failed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm

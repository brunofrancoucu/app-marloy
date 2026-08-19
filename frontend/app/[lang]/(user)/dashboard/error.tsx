"use client" // Error components must be client components

import React, { useEffect } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to the console
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message || "An unexpected error occurred."}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

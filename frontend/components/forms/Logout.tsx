'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '../../store'

const Logout: React.FC = () => {
  const setUser = useAppStore((state) => state.setUser)
  const router = useRouter()

  const logout = async () => {
    const res = await fetch('/api/user/logout', {
      credentials: 'include',
      method: 'POST',
    })
    if (res.ok) {
      const data = await res.json()
      setUser(null)
      router.push('/login')
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

import { persist } from 'zustand/middleware'
import { create } from 'zustand'

interface User {
  id: string
  name: string
  avatar: string
  email: string
}

interface userAuthStore {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserAuthStore = create<userAuthStore>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)

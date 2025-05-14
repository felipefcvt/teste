'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter()
  const [name, setName] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('userName')
    if (saved) router.push('/tasks')
  }, [router])

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem('userName', name)
      router.push('/tasks')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-sm shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Bem-vindo</h1>
        <p className="text-center mb-4">Insira seu nome para iniciar</p>
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="bg-slate-900 p-2 w-full rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="
             w-full
             group
             flex
             items-center
             justify-center
             gap-1
             bg-indigo-900
             border
             border-indigo-500
             text-white
             px-5
             py-2
             rounded
             hover:bg-indigo-700
             transition-colors
             cursor-pointer
         "
        >
          Entrar
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  )
}

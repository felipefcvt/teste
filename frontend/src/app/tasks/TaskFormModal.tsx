'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ArrowRight } from 'lucide-react';

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  onUpdate,
  editing,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string) => void
  onUpdate: (id: number, data: any) => void
  editing: any
}) {
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (editing) setTitle(editing.title)
    else setTitle('')
  }, [editing])

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('O título é obrigatório')
      return
    }

    if (editing) {
      onUpdate(editing.id, { title })
    } else {
      onSubmit(title)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[rgba(2,6,23,0.9)] flex items-center justify-center z-50">
    <div className="bg-slate-950 border border-slate-800 rounded-sm p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-slate-300">
          {editing ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h2>
        <input
          type="text"
          className="w-full bg-slate-900 p-2 rounded mb-4"
          placeholder="Nome da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500 hover:underline cursor-pointer">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="
              group
             flex
             items-center
             gap-1
             bg-emerald-900
             border
             border-emerald-500
             text-white
             px-5
             py-2
             rounded
             hover:bg-emerald-700
             transition-colors
             cursor-pointer
           ">
            Criar
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

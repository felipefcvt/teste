'use client'

import { useEffect, useState } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/api'
import TaskFormModal from './TaskFormModal'
import TaskItem from './TaskItem'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react';

type Task = {
  id: number
  title: string
  completed: boolean
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editing, setEditing] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('userName')
    if (!user) {
      router.push('/')
    } else {
      setUserName(user)
    }

    loadTasks()
  }, [router])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await getTasks()
      setTasks(data)
    } catch (err: any) {
      toast.error(err.message)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (title: string) => {
    try {
      const newTask = await createTask({ title })
      toast.success('Tarefa criada!')
      setTasks((prev) => [...prev, newTask])
      setIsOpen(false)
    } catch (err: any) {
      console.log(err)
      toast.error(err.message)
    }
  }

  const handleUpdate = async (id: number, data: any) => {
    try {
      const updated = await updateTask(id, data)
      setTasks((prev) => prev.map((t: any) => (t.id === id ? updated : t)))
      toast.success('Tarefa atualizada!')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t: any) => t.id !== id))
      toast.success('Tarefa deletada!')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <main className="flex items-center justify-center h-screen px-4">
      <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 p-6 rounded-sm shadow-xl flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Suas Tarefas{userName ? `, ${userName}` : ''}
          </h1>
          <button
            onClick={() => {
              setEditing(null)
              setIsOpen(true)
            }}
            className="
              group
              flex
              items-center
              sm:gap-1
            bg-indigo-900
              border
              border-indigo-500
              text-white
              px-2
              sm:px-4
              py-2
              rounded
              hover:bg-indigo-700
              transition-colors
              cursor-pointer
              "
          >
            <Plus
              size={15}
              className="hidden sm:inline transition-transform duration-300 group-hover:rotate-90"
            />
            Nova Tarefa
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Carregando...</p>
        ) : (
          <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
            {tasks.length === 0 ? (
              <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={() => {
                    setEditing(task)
                    setIsOpen(true)
                  }}
                  onToggle={() => handleUpdate(task.id, { completed: !task.completed })}
                  onDelete={() => handleDelete(task.id)}
                />
              ))
            )}
          </div>
        )}

        <TaskFormModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleCreate}
          onUpdate={handleUpdate}
          editing={editing}
        />
      </div>
    </main>
  )
}
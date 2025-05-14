import { CheckSquare, Square, Edit, Trash2 } from 'lucide-react'

export default function TaskItem({ task, onEdit, onToggle, onDelete }: any) {
  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onToggle}>
          {task.completed ? (
            <CheckSquare className="text-emerald-600" />
          ) : (
            <Square className="text-gray-400" />
          )}
        </button>
        <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </span>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit}>
          <Edit className="text-indigo-500 hover:text-indigo-700 cursor-pointer" />
        </button>
        <button onClick={onDelete}>
          <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer" />
        </button>
      </div>
    </div>
  )
}

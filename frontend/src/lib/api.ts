const API_URL = 'http://localhost:3000/tasks'

async function handleResponse(res: Response) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    const message = errorData.message || 'Erro inesperado'
    throw new Error(message)
  }

  return res.json()
}

export async function getTasks() {
  const res = await fetch(API_URL)
  return handleResponse(res)
}

export async function createTask(data: { title: string }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function updateTask(
  id: number,
  data: Partial<{ title: string; completed: boolean }>
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function deleteTask(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(res)
}

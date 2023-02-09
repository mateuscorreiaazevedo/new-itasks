type TaskResponse = {
  id: string
  title: string
  status: boolean
  userId: string
}

type TasksResponse = {
  data:TaskResponse[]
  message?: string | undefined
  error?: string | undefined
}

import express, { Request, Response } from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

type User = {
  id: number
  name: string
  email: string
}

let users: User[] = []

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Server Running' })
})

app.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' })
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    email
  }
  users.push(newUser)
  res.status(201).json(newUser)
})
app.delete('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const userId = Number(id)
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' })
  }

  const userIndex = users.findIndex((user) => user.id === userId)
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' })
  }

  const deletedUser = users.splice(userIndex, 1)[0]

  res.json({ message: 'User deleted successfully', user: deletedUser })
})

app.get('/users', (_req: Request, res: Response) => {
  res.json(users)
})

app.put('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const { name, email } = req.body

  const userId = Number(id)
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' })
  }

  const userIndex = users.findIndex((user) => userId === userId)
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Invalider user ID' })
  }

  if (name) users[userIndex].name = name
  if (email) {
    const emailExists = users.some(
      (user, index) => user.email === email && index !== userIndex
    )
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' })
    }
    users[userIndex].email = email
  }

  res.json(users[userIndex])
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
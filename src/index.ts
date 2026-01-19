import express, { Request, Response } from 'express'
import { prisma } from './prisma'

const app = express()
const PORT = 3000

app.use(express.json())

// Test route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Express + Prisma server is running!' })
})

// CREATE user
app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body
  if (!name || !email)
    return res.status(400).json({ error: 'Name and email required' })

  try {
    const user = await prisma.user.create({ data: { name, email } })
    res.status(201).json(user)
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Prisma unique constraint violation
      return res.status(400).json({ error: 'Email already exists' })
    }
    res.status(500).json({ error: 'Server error' })
  }
})

// GET all users
app.get('/users', async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// UPDATE user
app.put('/users/:id', async (req: Request, res: Response) => {
  const userId = Number(req.params.id)
  const { name, email } = req.body
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' })

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, email }
    })
    res.json(user)
  } catch (error: any) {
    if (error.code === 'P2025')
      return res.status(404).json({ error: 'User not found' })
    if (error.code === 'P2002')
      return res.status(400).json({ error: 'Email already exists' })
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE user
app.delete('/users/:id', async (req: Request, res: Response) => {
  const userId = Number(req.params.id)
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' })

  try {
    const user = await prisma.user.delete({ where: { id: userId } })
    res.json({ message: 'User deleted successfully', user })
  } catch (error: any) {
    if (error.code === 'P2025')
      return res.status(404).json({ error: 'User not found' })
    res.status(500).json({ error: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
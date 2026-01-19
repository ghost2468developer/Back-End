import express, { Request, Response } from "express"

const app = express()
const PORT = 3000

// Middleware to parse JSON
app.use(express.json())

// User type
type User = {
  id: number
  name: string
  email: string
};

// In-memory storage
let users: User[] = []

// Test route
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server Running" })
})

// CREATE user
app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body

  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" })
  }

  // Check for duplicate email
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: "Email already exists" })
  }

  const newUser: User = {
    id: users.length + 1, // simple auto-increment
    name,
    email
  }

  users.push(newUser)

  res.status(201).json(newUser)
})

// GET all users
app.get("/users", (_req: Request, res: Response) => {
  res.json(users)
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
import express, { Request, Response } from "express"

const app = express()
const PORT = 3000

app.use(express.json())

type User = {
  id: number
  name: string
  email: string
}

let users: User[] = []

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server Running" })
})

app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" })
  }
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: "Email already exists" })
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    email
  }
  users.push(newUser)
  res.status(201).json(newUser)
})

app.get("/users", (_req: Request, res: Response) => {
  res.json(users)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
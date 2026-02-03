import express, { Request, Response } from "express"

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Express + TypeScript server running" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
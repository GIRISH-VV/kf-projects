import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import todoRoutes from './routes/todo.routes.js'

dotenv.config({ path: './backend/.env' })

await connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/todos',todoRoutes)

const PORT = 5000
app.listen( PORT , () => {
    console.log(`Server is running on ${PORT}`)
})

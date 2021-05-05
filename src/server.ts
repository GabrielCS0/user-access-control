import 'reflect-metadata'
import express from 'express'
import './database'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ message: 'Hello, World!' })
})

app.listen(5000, () => console.log('Server is Running!'))

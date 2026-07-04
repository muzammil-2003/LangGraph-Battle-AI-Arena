import express from 'express'
import useGraph from './services/graph.ai.service.js'

const app = express()

app.get('/health', (req, res) => {
    res.send(200).json({status: "OK"})
})

app.post('/use-graph', async (req, res) => {
    await useGraph("Write a factorial code in JS.")
})

export default app
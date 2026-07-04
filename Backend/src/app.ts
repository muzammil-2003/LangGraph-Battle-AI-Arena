import express from 'express'
import useGraph from './services/graph.ai.service.js'

const app = express()

app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK" })
})

app.post('/use-graph', async (req, res) => {
    try {
        const result = await useGraph("Write a factorial code in JS.");
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Something went wrong."
        });
    }
});

export default app
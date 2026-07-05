import express from 'express'
import useGraph from './services/graph.ai.service.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'https://langgraph-battle-ai-arena-9c972qy1z.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true,
}))

app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK" })
})

app.post('/use-graph', async (req, res) => {
    try {
        const { input } = req.body;
        const result = await useGraph(input);
        res.status(200).json({
            message: "Graph AI service executed successfully.",
            result,
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Something went wrong.",
            success: false
        });
    }
});

export default app
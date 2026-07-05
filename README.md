# LangGraph Battle AI Arena

LangGraph Battle AI Arena is a full-stack AI comparison app where two different language models generate solutions to the same user prompt, and a third model acts as the judge to score both answers.

The project turns a single coding question into a head-to-head AI battle:

1. The user sends a prompt from the React frontend.
2. The backend builds a LangGraph workflow.
3. Two models generate independent responses.
4. A judge model evaluates both answers and assigns scores.
5. The frontend renders the two solutions and the final verdict in a visual "battle arena" interface.

GitHub repository: [LangGraph-Battle-AI-Arena](https://github.com/muzammil-2003/LangGraph-Battle-AI-Arena)

## Overview

This project is designed to showcase how LangGraph can coordinate multiple AI agents in a structured workflow. Instead of returning only one model output, the app compares two model-generated solutions and uses an evaluator agent to recommend the stronger answer.

It is useful as:

- an educational demo for multi-agent AI workflows
- a prompt-comparison playground
- a LangGraph example with real frontend/backend integration
- a polished UI demo for AI model evaluation

## Features

- Two-agent solution generation using different LLM providers
- Judge agent that scores both answers from `0` to `10`
- LangGraph-based orchestration with a clear state pipeline
- React/Vite frontend with a cinematic battle-style interface
- Markdown rendering with code highlighting for generated answers
- Loading, error, and empty states in the UI
- Session header with a generated evaluation ID
- Responsive layout with a sidebar, chat input, and battle area

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS 4
- Axios
- React Markdown
- Remark GFM
- Highlight.js

### Backend

- Node.js
- Express
- TypeScript
- LangGraph
- LangChain
- Zod
- dotenv
- CORS

### AI Providers

- Google Gemini
- Mistral AI
- Cohere

## How It Works

### 1. User Prompt

The user enters a coding task or any text prompt in the frontend chat box.

### 2. Parallel Solution Generation

The backend graph sends the prompt to two model nodes:

- `mistralModel`
- `cohereModel`

Each model produces its own solution independently.

### 3. Judge Evaluation

The judge node uses `geminiModel` with structured output validation to produce:

- `solution_1_score`
- `solution_2_score`

The judge is instructed to compare:

- correctness
- relevance
- efficiency
- robustness

### 4. UI Rendering

The frontend displays:

- the user prompt
- AI Agent 1 solution
- AI Agent 2 solution
- a winner badge
- animated score bars

## Project Structure

```text
LangGraph Battle AI Arena/
  Backend/
    server.ts
    src/
      app.ts
      config/
        config.ts
      services/
        graph.ai.service.ts
        models.service.ts
  Frontend/
    src/
      main.jsx
      app/
        App.jsx
        App.css
        services/
          api.js
        components/
          Sidebar.jsx
          ChatInput.jsx
          ChatArea.jsx
          BattleField.jsx
```

## Backend Architecture

### `Backend/src/app.ts`

Defines the Express server and exposes:

- `GET /health`
- `POST /use-graph`

### `Backend/src/services/models.service.ts`

Creates the provider-specific chat model instances:

- Gemini for judging
- Mistral for one solution
- Cohere for the other solution

### `Backend/src/services/graph.ai.service.ts`

Defines the LangGraph workflow:

- `solution` node generates both answers
- `judge` node evaluates them
- final state returns both solutions and the recommendation object

### `Backend/src/config/config.ts`

Loads API keys from environment variables using `dotenv`.

## Frontend Architecture

### `Frontend/src/app/App.jsx`

Main application shell. It handles:

- session ID generation
- conversation state
- API requests to the backend
- loading and error states
- rendering the battle view

### `Frontend/src/app/components/Sidebar.jsx`

Left navigation panel with the Battle AI branding and arena actions.

### `Frontend/src/app/components/ChatInput.jsx`

Prompt entry box with send button and keyboard submit support.

### `Frontend/src/app/components/BattleField.jsx`

Shows:

- Agent 1 and Agent 2 cards
- markdown-rendered solutions
- score bars
- winner indicator

### `Frontend/src/app/App.css`

Contains the visual theme, glassmorphism utilities, custom scrollbar styling, markdown formatting, and animations.

## API Endpoints

### Health Check

`GET /health`

Response:

```json
{ "status": "OK" }
```

### Run the Graph

`POST /use-graph`

Request body:

```json
{
  "input": "Write a factorial function in JavaScript"
}
```

Response:

```json
{
  "message": "Graph AI service executed successfully.",
  "result": {
    "solution_1": "First model answer...",
    "solution_2": "Second model answer...",
    "judge_recommendation": {
      "solution_1_score": 8,
      "solution_2_score": 9
    }
  },
  "success": true
}
```

## Environment Variables

Create a `Backend/.env` file with the following keys:

```env
GOOGLE_API_KEY=your_google_api_key
MISTRAL_API_KEY=your_mistral_api_key
COHERE_API_KEY=your_cohere_api_key
```

## Installation

### Prerequisites

- Node.js 20 or newer
- npm
- API keys for Google, Mistral, and Cohere

### 1. Clone the repository

```bash
git clone https://github.com/muzammil-2003/LangGraph-Battle-AI-Arena.git
cd LangGraph-Battle-AI-Arena
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 4. Configure backend environment variables

Create `Backend/.env` and add your API keys:

```env
GOOGLE_API_KEY=your_google_api_key
MISTRAL_API_KEY=your_mistral_api_key
COHERE_API_KEY=your_cohere_api_key
```

## Running the Project

You need to run the backend and frontend in two separate terminals.

### Backend

From the `Backend` folder:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

### Frontend

From the `Frontend` folder:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Usage

1. Start the backend server.
2. Start the frontend dev server.
3. Open the frontend in your browser.
4. Enter a coding question or challenge.
5. Wait while the AI agents generate their answers.
6. Review both solutions and the judge score.

## Notes

- The backend CORS configuration currently allows requests from `http://localhost:5173`.
- The frontend sends requests directly to `http://localhost:3000/use-graph`.
- There is also a mock API service in `Frontend/src/app/services/api.js`, but the live app flow uses the real backend endpoint.
- Generated answers are rendered as Markdown, so code blocks and lists display nicely in the UI.

## Future Improvements

- Add persistent battle history
- Store judged results in a database
- Add leaderboard and benchmarking views
- Support more model providers
- Allow users to compare more than two solutions
- Make backend and frontend base URLs configurable through environment variables

---

Built as a LangGraph + React demo for multi-agent AI comparison.
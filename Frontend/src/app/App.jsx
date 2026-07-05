import { useState, useRef, useEffect } from 'react';
import 'highlight.js/styles/github-dark.css';
import './App.css';
import Sidebar from './components/Sidebar';
import BattleField from './components/BattleField';
import ChatInput from './components/ChatInput';
import axios from 'axios';

function SessionHeader({ sessionId }) {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 shrink-0 z-40 bg-surface/40 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="pulse w-2 h-2 rounded-full bg-primary" />
        <span className="font-sans font-semibold text-[11px] tracking-widest uppercase text-primary">
          Live Evaluation Session
        </span>
      </div>
      <span className="font-mono text-[11px] text-on-surface-variant">ID: {sessionId}</span>
    </header>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8 text-center">
      {/* Arena Icon */}
      <div className="w-20 h-20 rounded-2xl bg-primary-container/15 border border-primary-container/30 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.2)]">
        <span className="material-symbols-outlined text-[40px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          swords
        </span>
      </div>

      <div>
        <h2 className="font-sans font-extrabold text-2xl text-on-surface mb-2">Welcome to Battle AI Arena</h2>
        <p className="font-sans text-sm text-on-surface-variant max-w-100 leading-relaxed">
          Ask any coding question and watch two AI agents battle it out.
          A judge will evaluate their solutions and declare a winner.
        </p>
      </div>

      {/* Example prompts */}
      <div className="flex flex-wrap gap-2 justify-center max-w-125">
        {[
          'Write a factorial code in JS',
          'Implement binary search in Python',
          'Create a debounce function',
          'Sort an array without built-ins',
        ].map(prompt => (
          <span
            key={prompt}
            className="py-1.5 px-3.5 bg-primary-container/10 border border-primary-container/20 rounded-full font-sans text-xs text-primary cursor-pointer hover:bg-primary-container/20 transition-colors duration-200"
          >
            {prompt}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [sessionId] = useState(() => `EVAL-${Math.floor(Math.random() * 9000 + 1000)}-A`);
  const [conversations, setConversations] = useState([]);
  // conversations is an array of { userMessage, solution1, solution2, judgeRecommendation }
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
  }, [conversations, isLoading]);

  const handleSend = async (message) => {
    if (isLoading) return;
    setIsLoading(true);

    // Add user message with loading state
    setConversations(prev => [...prev, {
      userMessage: message,
      solution1: null,
      solution2: null,
      judgeRecommendation: null,
      loading: true,
    }]);

    try {
      const result = await axios.post('http://localhost:3000/use-graph', {input: message});
      console.log('API Response:', result.data.result);
      setConversations(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          userMessage: message,
          solution1: result.data.result.solution_1,
          solution2: result.data.result.solution_2,
          judgeRecommendation: result.data.result.judge_recommendation,
          loading: false,
        };
        return updated;
      });
    } catch (err) {
      console.error('Error:', err);
      setConversations(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          userMessage: message,
          error: 'Failed to get response. Please try again.',
          loading: false,
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasConversations = conversations.length > 0;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface-container-lowest">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-surface-container-high/50 to-surface-container-lowest">
        {/* Header */}
        <SessionHeader sessionId={sessionId} />

        {/* Scrollable Battle Area */}
        <div
          ref={scrollAreaRef}
          className={`grow overflow-y-auto ${hasConversations ? 'p-8 pb-28' : 'p-0'}`}
        >
          {!hasConversations ? (
            <EmptyState />
          ) : (
            <div className="max-w-275 mx-auto flex flex-col gap-8">
              {conversations.map((conv, i) => (
                <div key={i} className="flex flex-col gap-6">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="glass-panel rounded-xl rounded-tr-xs p-4 max-w-[55%] shadow-lg">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px] text-on-surface-variant">person</span>
                        </div>
                        <span className="font-sans font-semibold text-[10px] tracking-wider uppercase text-on-surface-variant">
                          User Prompt
                        </span>
                      </div>
                      <p className="text-on-surface font-sans text-sm leading-normal">{conv.userMessage}</p>
                    </div>
                  </div>

                  {/* Loading State */}
                  {conv.loading && (
                    <div className="flex justify-start">
                      <div className="glass-panel rounded-xl py-4 px-5">
                        <div className="flex gap-1.5 items-center">
                          <span className="text-xs text-on-surface-variant font-sans mr-2">AI Agents are battling</span>
                          {[0, 1, 2].map(j => (
                            <div
                              key={j}
                              className="loading-dot w-1.5 h-1.5 rounded-full bg-primary"
                              style={{
                                animationDelay: `${j * 0.16}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {conv.error && (
                    <div className="glass-panel rounded-xl p-4 border border-error/30 text-error font-sans text-sm">
                      ⚠ {conv.error}
                    </div>
                  )}

                  {/* Battle Field */}
                  {!conv.loading && (conv.solution1 || conv.solution2) && (
                    <BattleField
                      solution1={conv.solution1}
                      solution2={conv.solution2}
                      judgeRecommendation={conv.judgeRecommendation}
                    />
                  )}

                  {/* Divider between conversations */}
                  {i < conversations.length - 1 && (
                    <div className="h-px bg-white/5 my-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Input - always visible */}
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </main>
    </div>
  );
}

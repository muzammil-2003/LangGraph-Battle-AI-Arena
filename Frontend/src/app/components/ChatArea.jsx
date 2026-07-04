import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatArea({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {msg.role === 'user' ? (
            <div className="glass-panel rounded-xl rounded-tr-xs p-3 max-w-[60%] shadow-lg">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant">person</span>
                </div>
                <span className="font-sans font-semibold text-[10px] tracking-wider uppercase text-on-surface-variant">User Prompt</span>
              </div>
              <p className="text-on-surface font-sans text-sm">
                {msg.content}
              </p>
            </div>
          ) : (
            <div className="max-w-[80%]">
              <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
                {msg.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="glass-panel rounded-xl py-4 px-5">
            <div className="flex gap-1.5 items-center">
              <span className="text-xs text-on-surface-variant mr-2">AI Agents thinking</span>
              {[0, 1, 2].map(i => (
                <div key={i} className="loading-dot w-1.5 h-1.5 rounded-full bg-primary" style={{
                  animationDelay: `${i * 0.16}s`,
                }} />
              ))}
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

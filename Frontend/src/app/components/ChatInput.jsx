import React, { useRef } from 'react';

export default function ChatInput({ onSend, isLoading }) {
  const inputRef = useRef(null);

  const handleSend = () => {
    const value = inputRef.current?.value.trim();
    if (value && !isLoading) {
      onSend(value);
      inputRef.current.value = '';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 py-6 px-8 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent z-40">
      <div className="max-w-[900px] mx-auto">
        <div className="glass-panel rounded-full p-2 flex items-center gap-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          {/* Attachment button */}
          <button className="w-10 h-10 rounded-full bg-transparent border-none flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer transition-colors duration-200 shrink-0">
            <span className="material-symbols-outlined">add_circle</span>
          </button>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a new challenge..."
            disabled={isLoading}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 font-sans text-sm text-on-surface px-2"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={isLoading}
            id="send-message-btn"
            className={`w-10 h-10 rounded-full border-none flex items-center justify-center text-white shrink-0 transition-all duration-200 ${
              isLoading
                ? 'bg-primary-container/30 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-primary-container to-secondary-container cursor-pointer shadow-[0_4px_12px_rgba(124,58,237,0.4)] hover:shadow-[0_4px_20px_rgba(124,58,237,0.6)]'
            }`}
          >
            {isLoading ? (
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
            ) : (
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                send
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function AgentCard({ agentNumber, solution, color = 'purple' }) {
  const isPurple = color === 'purple';
  const badgeText = isPurple ? 'Advanced' : 'Standard';

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`glass-panel rounded-xl p-6 flex flex-1 flex-col relative overflow-hidden transition-all duration-300 min-w-0 ${
        isPurple ? 'hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]' : 'hover:shadow-[0_0_20px_rgba(5,102,217,0.3)]'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Internal glow */}
      <div className={`absolute -top-20 -left-20 w-40 h-40 blur-2xl rounded-full pointer-events-none transition-opacity duration-300 ${
        isPurple ? 'bg-primary/15' : 'bg-secondary-container/15'
      } ${hovered ? 'opacity-100' : 'opacity-50'}`} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-1">
        <div className="flex items-center gap-2.5">
          <span className={`material-symbols-outlined text-[28px] ${isPurple ? 'text-primary' : 'text-secondary-container'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            smart_toy
          </span>
          <h3 className="font-sans font-semibold text-lg text-on-surface">AI Agent {agentNumber}</h3>
        </div>
        <span className={`font-sans font-semibold text-[10px] tracking-wider uppercase py-1 px-2 rounded border ${
          isPurple
            ? 'text-primary bg-primary/10 border-primary/20'
            : 'text-secondary-container bg-secondary-container/10 border-secondary-container/20'
        }`}>{badgeText}</span>
      </div>

      {/* Solution Content */}
      <div className="bg-black/40 rounded-lg p-4 border border-white/5 grow overflow-y-auto relative z-1 max-h-80">
        <div className="prose text-[13px]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {solution}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, score, maxScore = 10, color, isWinner }) {
  const percentage = (score / maxScore) * 100;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(percentage), 300);
    return () => clearTimeout(t);
  }, [percentage]);

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-2">
          <span className={`font-sans font-bold text-sm ${color === 'purple' ? 'text-primary' : 'text-secondary-container'}`}>{label}</span>
          {isWinner && (
            <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-full bg-tertiary/10 border border-tertiary text-tertiary font-sans font-semibold text-[10px] tracking-wider uppercase">
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              Winner
            </span>
          )}
        </div>
        <span className={`font-mono text-sm font-bold ${isWinner ? 'text-tertiary' : 'text-on-surface-variant'}`}>{score}/{maxScore}</span>
      </div>

      <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
        <div className={`progress-fill h-full rounded-full transition-all duration-1000 ${
          isWinner
            ? 'bg-linear-to-r from-primary to-tertiary opacity-100'
            : `${color === 'purple' ? 'bg-primary' : 'bg-secondary-container'} opacity-80`
        }`} style={{
          width: `${width}%`,
        }} />
      </div>
    </div>
  );
}

function JudgeVerdictCard({ solution1Score, solution2Score }) {
  const maxScore = Math.max(solution1Score, solution2Score, 10);
  const winner = solution1Score >= solution2Score ? 1 : 2;

  return (
    <div className="glass-panel rounded-xl p-8 relative overflow-hidden">
      {/* Gold gradient background glow */}
      <div className="absolute inset-0 bg-linear-to-b from-tertiary/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-tertiary/20 border border-tertiary/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </div>
          <div>
            <h2 className="font-sans font-semibold text-xl text-on-surface">Judge Verdict</h2>
            <p className="font-sans text-xs text-on-surface-variant mt-1">Evaluation based on logic, efficiency, and robustness.</p>
          </div>
        </div>
        <div className="py-1.5 px-4 bg-tertiary/10 border border-tertiary/30 rounded-full font-sans font-semibold text-xs text-tertiary">
          Agent {winner} Wins
        </div>
      </div>

      {/* Score Bars */}
      <div className="flex flex-col gap-6 relative z-1">
        <ScoreBar
          label="Agent 1"
          score={solution1Score}
          maxScore={maxScore}
          color="purple"
          isWinner={winner === 1}
        />
        <ScoreBar
          label="Agent 2"
          score={solution2Score}
          maxScore={maxScore}
          color="blue"
          isWinner={winner === 2}
        />
      </div>
    </div>
  );
}

export default function BattleField({ solution1, solution2, judgeRecommendation }) {
  if (!solution1 && !solution2) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="grow h-px bg-white/5" />
        <span className="font-sans font-semibold text-[11px] tracking-widest uppercase text-on-surface-variant py-1 px-3">⚔ Battlefield</span>
        <div className="grow h-px bg-white/5" />
      </div>

      {/* Agent Cards side by side */}
      <div className="flex gap-6 relative">
        {/* VS Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface-container border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] font-sans font-semibold text-[11px] tracking-wider text-on-surface-variant">VS</div>

        {solution1 && <AgentCard agentNumber={1} solution={solution1} color="purple" />}
        {solution2 && <AgentCard agentNumber={2} solution={solution2} color="blue" />}
      </div>

      {/* Judge Verdict */}
      {judgeRecommendation && (
        <JudgeVerdictCard
          solution1Score={judgeRecommendation.solution_1_score}
          solution2Score={judgeRecommendation.solution_2_score}
        />
      )}
    </div>
  );
}

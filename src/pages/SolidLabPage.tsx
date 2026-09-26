import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, RotateCcw, Layers, Code2, MessageSquare, Target,
  AlertTriangle, CheckCircle, ChevronDown, ChevronRight,
  Eye, Lightbulb, Trophy, RefreshCw, ArrowRight, ArrowLeftRight,
} from 'lucide-react';
import { useSolidLab } from '@/hooks/useSolidLab';
import { ALL_SCENARIOS, ALL_CHALLENGES, ALL_MISTAKES } from '@/data/solidLabData';
import type { SolidPrinciple, ArchitectureNode, ArchitectureEdge, SolidMission } from '@/types/solidLab';

const PRINCIPLE_TABS: { id: SolidPrinciple; label: string; labelUrdu: string; icon: string; color: string }[] = [
  { id: 'coupling-cohesion', label: 'Coupling & Cohesion', labelUrdu: 'Coupling aur Cohesion', icon: '🔗', color: '#f59e0b' },
  { id: 'srp', label: 'SRP', labelUrdu: 'Single Responsibility', icon: '1️⃣', color: '#22c55e' },
  { id: 'ocp', label: 'OCP', labelUrdu: 'Open/Closed', icon: '🔓', color: '#3b82f6' },
  { id: 'lsp', label: 'LSP', labelUrdu: 'Liskov Substitution', icon: '🔄', color: '#a78bfa' },
  { id: 'isp', label: 'ISP', labelUrdu: 'Interface Segregation', icon: '✂️', color: '#06b6d4' },
  { id: 'dip', label: 'DIP', labelUrdu: 'Dependency Inversion', icon: '⬆️', color: '#ef4444' },
];

const NODE_COLORS: Record<string, string> = {
  class: '#3b82f6',
  interface: '#06b6d4',
  abstract: '#a78bfa',
};

function PrincipleTab({ tab, isActive, onClick }: { tab: typeof PRINCIPLE_TABS[number]; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs transition-all w-full ${
        isActive
          ? 'bg-white/10 text-white border border-white/15'
          : 'text-white/60 hover:text-white/80 hover:bg-white/5 border border-transparent'
      }`}
    >
      <span className="text-sm">{tab.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{tab.label}</div>
        <div className="text-[9px] text-white/40 truncate">{tab.labelUrdu}</div>
      </div>
      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tab.color }} />
    </button>
  );
}

function ArchNode({ node, isSelected, onSelect }: { node: ArchitectureNode; isSelected: boolean; onSelect: (id: string) => void }) {
  const isInterface = node.type === 'interface';
  const isAbstract = node.type === 'abstract';
  const borderColor = isSelected ? '#fff' : node.color;
  const bgStyle = isInterface
    ? `repeating-linear-gradient(45deg, ${node.color}15, ${node.color}15 4px, transparent 4px, transparent 8px)`
    : `${node.color}15`;

  return (
    <button
      onClick={() => onSelect(node.id)}
      className={`relative p-3 rounded-xl border-2 text-left transition-all min-w-[140px] max-w-[200px] ${
        isSelected ? 'scale-105 shadow-lg' : 'hover:scale-[1.02]'
      }`}
      style={{
        borderColor,
        background: bgStyle,
        boxShadow: isSelected ? `0 0 20px ${node.color}40` : 'none',
      }}
    >
      {isInterface && (
        <div className="absolute -top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: node.color, color: '#fff' }}>
          interface
        </div>
      )}
      {isAbstract && (
        <div className="absolute -top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: node.color, color: '#fff' }}>
          abstract
        </div>
      )}
      <div className="font-semibold text-white text-xs mb-1">{node.label}</div>
      <div className="space-y-0.5">
        {node.responsibilities.map((r, i) => (
          <div key={i} className="text-[9px] text-white/60 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: node.color }} />
            {r}
          </div>
        ))}
      </div>
    </button>
  );
}

function ArchEdge({ edge, fromNode, toNode }: { edge: ArchitectureEdge; fromNode: ArchitectureNode | undefined; toNode: ArchitectureNode | undefined }) {
  if (!fromNode || !toNode) return null;
  const lineStyle = edge.type === 'implements' || edge.type === 'extends' ? 'border-dashed' : '';
  return (
    <div className="flex items-center gap-1 px-1">
      <div className={`flex-1 h-px border-t ${lineStyle}`} style={{ borderColor: edge.color }} />
      <span className="text-[8px] px-1 rounded whitespace-nowrap" style={{ color: edge.color, backgroundColor: `${edge.color}15` }}>
        {edge.label}
      </span>
      <div className={`flex-1 h-px border-t ${lineStyle}`} style={{ borderColor: edge.color }} />
    </div>
  );
}

function ArchitectureCanvas({ snapshot, selectedNodeId, onSelectNode }: {
  snapshot: { nodes: ArchitectureNode[]; edges: ArchitectureEdge[] };
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}) {
  return (
    <div className="bg-[#0a0f1a] border border-white/10 rounded-xl p-4 overflow-x-auto">
      <div className="flex flex-col items-center gap-3 min-w-fit">
        {/* Nodes */}
        <div className="flex flex-wrap justify-center gap-4">
          {snapshot.nodes.map((node) => (
            <ArchNode
              key={node.id}
              node={node}
              isSelected={selectedNodeId === node.id}
              onSelect={onSelectNode}
            />
          ))}
        </div>
        {/* Edges */}
        {snapshot.edges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {snapshot.edges.map((edge) => (
              <ArchEdge
                key={edge.id}
                edge={edge}
                fromNode={snapshot.nodes.find((n) => n.id === edge.sourceId)}
                toNode={snapshot.nodes.find((n) => n.id === edge.targetId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MissionPanel({ mission, onComplete }: { mission: SolidMission; onComplete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(true);
  const done = mission.objectives.filter((o: { completed: boolean }) => o.completed).length;
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 w-full text-left">
        <Target className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-semibold text-white/90 flex-1">{mission.title}</span>
        <span className="text-xs text-white/40">{done}/{mission.objectives.length}</span>
        {expanded ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
      </button>
      {expanded && (
        <div className="mt-3 space-y-2">
          {mission.objectives.map((obj: SolidMission['objectives'][number]) => (
            <div key={obj.id} className={`flex items-start gap-2 text-xs p-2 rounded-lg ${obj.completed ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/[0.02] border border-white/5'}`}>
              {obj.completed ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border border-white/20 mt-0.5 shrink-0" />}
              <div className="flex-1">
                <p className={obj.completed ? 'text-emerald-300' : 'text-white/70'}>{obj.description}</p>
                <p className="text-[10px] text-white/40 mt-0.5">{obj.descriptionUrdu}</p>
              </div>
              {!obj.completed && (
                <button onClick={() => onComplete(obj.id)} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60 hover:bg-white/15 shrink-0">Done</button>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs text-yellow-400/80">{mission.xpReward} XP Reward</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CodePanel({ code, label }: { code: string; label: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-semibold text-white/90">{label}</span>
      </div>
      <pre className="text-[10px] text-emerald-300/80 font-mono bg-black/30 rounded p-3 whitespace-pre-wrap overflow-x-auto max-h-64 overflow-y-auto">{code}</pre>
    </div>
  );
}

function InspectorPanel({ node, scenario }: {
  node: ArchitectureNode | null;
  scenario: { problem: string; problemUrdu: string; solution: string; solutionUrdu: string; benefits: string[]; tradeoffs: string[] } | null;
}) {
  if (!node && !scenario) {
    return (
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
        <Eye className="w-6 h-6 text-white/20 mx-auto mb-2" />
        <p className="text-xs text-white/40">Select a node or view the scenario</p>
      </div>
    );
  }
  if (node) {
    return (
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: NODE_COLORS[node.type] || '#fff' }} />
          <span className="text-sm font-semibold text-white/90">{node.label}</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 uppercase">{node.type}</span>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] text-white/40 uppercase tracking-wider">Responsibilities</div>
          {node.responsibilities.map((r, i) => (
            <div key={i} className="text-xs text-white/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: NODE_COLORS[node.type] || '#fff' }} />
              {r}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (scenario) {
    return (
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-semibold text-white/90">Problem Analysis</span>
        </div>
        <p className="text-xs text-white/70">{scenario.problem}</p>
        <p className="text-[10px] text-white/40">{scenario.problemUrdu}</p>
        <div className="pt-2 border-t border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-white/80">Solution</span>
          </div>
          <p className="text-xs text-white/70">{scenario.solution}</p>
          <p className="text-[10px] text-white/40 mt-1">{scenario.solutionUrdu}</p>
        </div>
        <div className="pt-2 border-t border-white/5">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Benefits</div>
          {scenario.benefits.map((b, i) => (
            <div key={i} className="text-[10px] text-emerald-300/70 flex items-center gap-1.5 mb-0.5">
              <CheckCircle className="w-3 h-3" /> {b}
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-white/5">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Trade-offs</div>
          {scenario.tradeoffs.map((t, i) => (
            <div key={i} className="text-[10px] text-yellow-300/70 flex items-center gap-1.5 mb-0.5">
              <AlertTriangle className="w-3 h-3" /> {t}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function ConsolePanel({ history }: { history: { action: string; timestamp: number }[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-semibold text-white/90">Event Log</span>
      </div>
      <div className="space-y-1 max-h-40 overflow-y-auto scrollbar-thin">
        {history.length === 0 && <p className="text-[10px] text-white/30">No events yet</p>}
        {history.slice(-20).map((h, i) => (
          <div key={i} className="text-[10px] font-mono text-white/50 flex gap-2">
            <span className="text-white/30 shrink-0">[{new Date(h.timestamp).toLocaleTimeString()}]</span>
            <span>{h.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChallengePanel({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);
  const challenge = ALL_CHALLENGES[idx];
  if (!challenge) return <p className="text-xs text-white/40">All challenges completed!</p>;
  const selected = answers[challenge.id];
  const answered = !!selected;
  const correct = challenge.options.find((o) => o.id === selected)?.isCorrect;

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-semibold text-white/90">Challenge {idx + 1}/{ALL_CHALLENGES.length}</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 uppercase">{challenge.type}</span>
      </div>
      <h4 className="text-xs font-medium text-white/80 mb-1">{challenge.title}</h4>
      <p className="text-[11px] text-white/60 mb-3 whitespace-pre-wrap">{challenge.question}</p>
      <div className="space-y-2">
        {challenge.options.map((opt) => (
          <button
            key={opt.id}
            disabled={answered}
            onClick={() => setAnswers((p) => ({ ...p, [challenge.id]: opt.id }))}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all ${
              selected === opt.id
                ? opt.isCorrect
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-500/20 border-red-500/40 text-red-300'
                : answered && opt.isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                  : 'bg-white/[0.02] border-white/5 text-white/60 hover:bg-white/5'
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {answered && (
        <div className="mt-3 space-y-2">
          <div className={`p-2 rounded-lg text-xs ${correct ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'}`}>
            {correct ? 'Correct!' : 'Incorrect. The correct answer is highlighted.'}
          </div>
          <p className="text-[10px] text-white/60">{challenge.explanation}</p>
          <p className="text-[10px] text-white/40">{challenge.explanationUrdu}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => { setIdx((i) => Math.min(i + 1, ALL_CHALLENGES.length)); setShowHint(false); if (correct) onComplete(); }}
              className="px-3 py-1.5 rounded-lg text-[11px] bg-white/10 text-white/70 hover:bg-white/15"
            >
              Next →
            </button>
            <button onClick={() => setShowHint(true)} className="px-3 py-1.5 rounded-lg text-[11px] bg-white/5 text-white/50 hover:bg-white/10">
              <Lightbulb className="w-3 h-3 inline mr-1" />Hint
            </button>
          </div>
          {showHint && <p className="text-[10px] text-yellow-300/70 bg-yellow-500/5 p-2 rounded">{challenge.hint}</p>}
        </div>
      )}
    </div>
  );
}

function MistakeLab({ revealedMistakes, onReveal }: { revealedMistakes: Set<string>; onReveal: (id: string) => void }) {
  const [idx, setIdx] = useState(0);
  const mistake = ALL_MISTAKES[idx];
  if (!mistake) return <p className="text-xs text-white/40">All mistakes reviewed!</p>;
  const isRevealed = revealedMistakes.has(mistake.id);
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <span className="text-sm font-semibold text-white/90">Mistake {idx + 1}/{ALL_MISTAKES.length}</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 uppercase">{mistake.principle}</span>
      </div>
      <h4 className="text-xs font-medium text-white/80 mb-1">{mistake.title}</h4>
      <p className="text-[10px] text-white/40 mb-3">{mistake.titleUrdu}</p>
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-3">
        <p className="text-[10px] text-red-300 font-medium mb-1">Incorrect:</p>
        <pre className="text-[10px] text-red-300/70 font-mono whitespace-pre-wrap">{mistake.incorrectCode}</pre>
        <p className="text-[10px] text-red-300/60 mt-1">{mistake.incorrectDiagram}</p>
      </div>
      {!isRevealed ? (
        <button onClick={() => onReveal(mistake.id)} className="w-full px-3 py-2 rounded-lg text-xs bg-white/10 text-white/70 hover:bg-white/15">
          Reveal Correct Approach
        </button>
      ) : (
        <div className="space-y-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
            <p className="text-[10px] text-emerald-300 font-medium mb-1">Correct:</p>
            <pre className="text-[10px] text-emerald-300/70 font-mono whitespace-pre-wrap">{mistake.correctCode}</pre>
            <p className="text-[10px] text-emerald-300/60 mt-1">{mistake.correctDiagram}</p>
          </div>
          <p className="text-[10px] text-white/60">{mistake.explanation}</p>
          <p className="text-[10px] text-white/40">{mistake.explanationUrdu}</p>
          <button
            onClick={() => setIdx((i) => Math.min(i + 1, ALL_MISTAKES.length))}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white/10 text-white/70 hover:bg-white/15"
          >
            Next Mistake →
          </button>
        </div>
      )}
    </div>
  );
}

export default function SolidLabPage() {
  const {
    state, setPrinciple, toggleBeforeAfter, selectNode,
    completeObjective, revealMistake, reset,
  } = useSolidLab();

  const [rightTab, setRightTab] = useState<'inspector' | 'code' | 'console'>('inspector');
  const [bottomTab, setBottomTab] = useState<'challenge' | 'mistakes'>('challenge');
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  const scenario = ALL_SCENARIOS[state.activePrinciple];
  const currentSnapshot = scenario ? (state.showAfter ? scenario.after : scenario.before) : { nodes: [], edges: [] };
  const selectedNode = scenario ? currentSnapshot.nodes.find((n) => n.id === state.selectedNodeId) ?? null : null;

  const principleInfo = PRINCIPLE_TABS.find((t) => t.id === state.activePrinciple);

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0a0f1a] z-50">
      {/* Top bar */}
      <div className="h-12 border-b border-white/10 flex items-center px-4 gap-4 shrink-0 bg-[#0a0f1a]/90 backdrop-blur-sm z-20">
        <Link to="/3d" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-medium">Worlds</span>
        </Link>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white/90">SOLID Architecture Lab</span>
          <span className="text-[10px] text-white/40">World 13</span>
        </div>
        <div className="flex-1" />
        <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-white/60 hover:text-white hover:bg-white/10 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
        {/* Mobile: principles button */}
        <button
          onClick={() => setMobilePanelOpen(!mobilePanelOpen)}
          className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-white/10 text-white transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          Principles
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile overlay */}
        {mobilePanelOpen && (
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobilePanelOpen(false)}
          />
        )}
        {/* Left panel — sidebar on md+, slide-up drawer on mobile */}
        <div className={`
          ${
            mobilePanelOpen
              ? 'fixed bottom-0 left-0 right-0 z-40 max-h-[60vh] flex flex-col rounded-t-2xl border-t border-white/20'
              : 'hidden'
          }
          md:relative md:flex md:flex-col md:max-h-none md:rounded-none md:border-t-0 md:z-auto
          md:w-64 md:border-r border-white/10 bg-[#0a0f1a] overflow-y-auto p-3 space-y-3 shrink-0
        `}>
          {/* Mobile handle */}
          <div className="md:hidden flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1">Principles</h3>
            {PRINCIPLE_TABS.map((tab) => (
              <PrincipleTab key={tab.id} tab={tab} isActive={state.activePrinciple === tab.id} onClick={() => setPrinciple(tab.id)} />
            ))}
          </div>
          <div className="border-t border-white/5 pt-3">
            <MissionPanel mission={state.mission} onComplete={completeObjective} />
          </div>
        </div>

        {/* Center */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Principle header + Before/After toggle */}
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3 shrink-0">
            <div className="flex-1">
              <h2 className="text-sm font-bold text-white">{principleInfo?.icon} {principleInfo?.label}</h2>
              <p className="text-[10px] text-white/40">{principleInfo?.labelUrdu}</p>
            </div>
            {scenario && (
              <button
                onClick={toggleBeforeAfter}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all"
                style={{
                  borderColor: state.showAfter ? '#22c55e40' : '#ef444440',
                  backgroundColor: state.showAfter ? '#22c55e10' : '#ef444410',
                  color: state.showAfter ? '#22c55e' : '#ef4444',
                }}
              >
                {state.showAfter ? <ArrowRight className="w-3 h-3" /> : <ArrowLeftRight className="w-3 h-3" />}
                {state.showAfter ? 'AFTER (Refactored)' : 'BEFORE (Problem)'}
              </button>
            )}
          </div>

          {/* Architecture canvas */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {scenario && (
              <>
                <ArchitectureCanvas
                  snapshot={currentSnapshot}
                  selectedNodeId={state.selectedNodeId}
                  onSelectNode={selectNode}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <CodePanel
                    code={state.showAfter ? scenario.afterCode : scenario.beforeCode}
                    label={state.showAfter ? 'Refactored Code' : 'Original Code'}
                  />
                  <InspectorPanel node={selectedNode} scenario={!selectedNode ? scenario : null} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-72 border-l border-white/10 bg-[#0a0f1a]/80 backdrop-blur-sm flex flex-col shrink-0 hidden lg:flex">
          <div className="flex border-b border-white/10">
            {[
              { id: 'inspector' as const, icon: Eye, label: 'Inspector' },
              { id: 'code' as const, icon: Code2, label: 'Code' },
              { id: 'console' as const, icon: MessageSquare, label: 'Log' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRightTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-medium transition-all border-b-2 ${
                  rightTab === tab.id ? 'text-white border-emerald-400 bg-white/5' : 'text-white/40 border-transparent hover:text-white/60'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {rightTab === 'inspector' && <InspectorPanel node={selectedNode} scenario={scenario} />}
            {rightTab === 'code' && scenario && <CodePanel code={state.showAfter ? scenario.afterCode : scenario.beforeCode} label={state.showAfter ? 'Refactored' : 'Original'} />}
            {rightTab === 'console' && <ConsolePanel history={state.history} />}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="h-10 border-t border-white/10 flex items-center px-4 gap-2 bg-[#0a0f1a]/90 backdrop-blur-sm z-20 shrink-0">
        {[
          { id: 'challenge' as const, label: 'Challenges', icon: AlertTriangle },
          { id: 'mistakes' as const, label: 'Mistake Lab', icon: RefreshCw },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setBottomTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
              bottomTab === tab.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bottom expanded panel */}
      <AnimatePresence>
        {bottomTab && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-[#0a0f1a]/95 overflow-hidden"
          >
            <div className="p-4 max-h-64 overflow-y-auto">
              {bottomTab === 'challenge' && <ChallengePanel onComplete={() => completeObjective('obj-8')} />}
              {bottomTab === 'mistakes' && <MistakeLab revealedMistakes={state.revealedMistakes} onReveal={revealMistake} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

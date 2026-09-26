import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, RotateCcw, Layers, Code2, MessageSquare, Target,
  BookOpen, AlertTriangle, CheckCircle, ChevronDown, ChevronRight,
  Box, Eye, Lightbulb, Trophy, Link2, GitBranch,
} from 'lucide-react';
import { RelationshipScene3D } from '@/three/relationships/RelationshipScene3D';
import { SceneErrorBoundary } from '@/components/three';
import { useRelationshipLab } from '@/hooks/useRelationshipLab';
import { ALL_LAB_DATA } from '@/data/relationshipLabData';
import { IS_A_VS_HAS_A_CHALLENGES, MISTAKES } from '@/data/relationshipChallenges';
import type { RelationshipEdge, RelationshipNode } from '@/types/relationshipLab';

const LAB_TABS = [
  { id: 'association' as const, label: 'Association', labelUrdu: 'Association', icon: '↔️', color: '#60a5fa' },
  { id: 'aggregation' as const, label: 'Aggregation', labelUrdu: 'Aggregation', icon: '◇', color: '#f59e0b' },
  { id: 'composition' as const, label: 'Composition', labelUrdu: 'Composition', icon: '◆', color: '#ef4444' },
  { id: 'dependency' as const, label: 'Dependency', labelUrdu: 'Dependency', icon: '→', color: '#06b6d4' },
];

type LabId = typeof LAB_TABS[number]['id'];

const TYPE_INFO: Record<string, { desc: string; descUrdu: string; code: string }> = {
  association: {
    desc: 'Two independent objects interact. Neither owns the other.',
    descUrdu: 'Do independent objects interact karte hain. Koi bhi dusre ka owner nahi hai.',
    code: 'class Teacher {\n  void teach(Student s) {\n    s.learn(subject);\n  }\n}',
  },
  aggregation: {
    desc: 'Weak whole-part. Part can exist independently of the whole.',
    descUrdu: 'Kamzor whole-part. Part independently exist kar sakta hai.',
    code: 'class Department {\n  private Teacher teacher;\n  // Teacher exists without Department\n}',
  },
  composition: {
    desc: 'Strong whole-part. Part lifecycle managed by the whole.',
    descUrdu: 'Mazboot whole-part. Part ka lifecycle whole manage karta hai.',
    code: 'class House {\n  private Room room;\n  House() { room = new Room("Living"); }\n}',
  },
  dependency: {
    desc: 'Temporary usage. One object uses another in a method.',
    descUrdu: 'Temporary usage. Ek object doosre ko method mein use karta hai.',
    code: 'class ReportGen {\n  void generate(Printer p) {\n    p.print(report);\n  }\n}',
  },
};

const EDGE_TYPE_COLOR: Record<string, string> = {
  association: '#60a5fa', aggregation: '#f59e0b', composition: '#ef4444', dependency: '#06b6d4',
};

function LabSelector({ activeLab, onSelect }: { activeLab: LabId; onSelect: (id: LabId) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Lab Selector</h3>
      {LAB_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
            activeLab === tab.id
              ? 'bg-white/10 text-white border border-white/15'
              : 'text-white/60 hover:text-white/80 hover:bg-white/5 border border-transparent'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <div>
            <div className="font-medium">{tab.label}</div>
            <div className="text-[10px] text-white/40">{tab.labelUrdu}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function MissionPanel({ mission, onComplete }: {
  mission: typeof import('@/data/relationshipLabData').DEFAULT_MISSION;
  onComplete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const done = mission.objectives.filter((o) => o.completed).length;
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
          {mission.objectives.map((obj) => (
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

function InspectorPanel({ node, edge, allNodes }: {
  node: RelationshipNode | null;
  edge: RelationshipEdge | null;
  allNodes: RelationshipNode[];
}) {
  if (!node && !edge) {
    return (
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
        <Eye className="w-6 h-6 text-white/20 mx-auto mb-2" />
        <p className="text-xs text-white/40">Select a node or edge to inspect</p>
        <p className="text-[10px] text-white/30 mt-1">3D canvas mein koi bhi object select karo</p>
      </div>
    );
  }
  if (node) {
    return (
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Box className="w-4 h-4" style={{ color: node.color }} />
          <span className="text-sm font-semibold text-white/90">{node.label}</span>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] text-white/40 uppercase tracking-wider">Properties</div>
          {Object.entries(node.properties).map(([key, val]) => (
            <div key={key} className="flex justify-between text-xs font-mono">
              <span className="text-blue-300">{key}</span>
              <span className="text-emerald-300">{String(val)}</span>
            </div>
          ))}
          <div className="text-[10px] text-white/40 uppercase tracking-wider mt-3">Class</div>
          <div className="text-xs text-white/70 font-mono bg-white/5 rounded px-2 py-1">{node.className}</div>
        </div>
      </div>
    );
  }
  if (edge) {
    const srcLabel = allNodes.find((n) => n.id === edge.sourceId)?.label ?? edge.sourceId;
    const tgtLabel = allNodes.find((n) => n.id === edge.targetId)?.label ?? edge.targetId;
    return (
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Link2 className="w-4 h-4" style={{ color: EDGE_TYPE_COLOR[edge.type] }} />
          <span className="text-sm font-semibold text-white/90">{edge.type.toUpperCase()}</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between"><span className="text-white/50">Source</span><span className="text-white/80">{srcLabel}</span></div>
          <div className="flex justify-between"><span className="text-white/50">Target</span><span className="text-white/80">{tgtLabel}</span></div>
          <div className="flex justify-between"><span className="text-white/50">Ownership</span><span className="text-white/80">{edge.ownership}</span></div>
          <div className="flex justify-between"><span className="text-white/50">Lifecycle</span><span className="text-white/80">{edge.lifecycle}</span></div>
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-white/70 text-xs">{edge.description}</p>
            <p className="text-white/40 text-[10px] mt-1">{edge.descriptionUrdu}</p>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5">
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Java Modeling</div>
            <p className="text-white/60 text-[11px]">{edge.javaModel}</p>
          </div>
          {edge.codeSnippet && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Code</div>
              <pre className="text-[10px] text-emerald-300/80 font-mono bg-black/30 rounded p-2 whitespace-pre-wrap overflow-x-auto">{edge.codeSnippet}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

function CodePanel({ labId }: { labId: LabId }) {
  const info = TYPE_INFO[labId];
  if (!info) return null;
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-semibold text-white/90">Java Code</span>
      </div>
      <pre className="text-[11px] text-emerald-300/80 font-mono bg-black/30 rounded p-3 whitespace-pre-wrap overflow-x-auto">{info.code}</pre>
    </div>
  );
}

function ConsolePanel({ history }: { history: { action: string; timestamp: number }[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-semibold text-white/90">Console</span>
      </div>
      <div className="space-y-1 max-h-40 overflow-y-auto scrollbar-thin">
        {history.length === 0 && <p className="text-[10px] text-white/30">No actions yet</p>}
        {history.map((h, i) => (
          <div key={i} className="text-[10px] font-mono text-white/50 flex gap-2">
            <span className="text-white/30 shrink-0">[{new Date(h.timestamp).toLocaleTimeString()}]</span>
            <span>{h.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExplanationPanel({ labId }: { labId: LabId }) {
  const info = TYPE_INFO[labId];
  if (!info) return null;
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-semibold text-white/90">Explanation</span>
      </div>
      <p className="text-xs text-white/70">{info.desc}</p>
      <p className="text-[10px] text-white/40 mt-1">{info.descUrdu}</p>
    </div>
  );
}

function ChallengePanel({ onCompleteChallenge }: { onCompleteChallenge: () => void }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);
  const challenge = IS_A_VS_HAS_A_CHALLENGES[idx];
  if (!challenge) return <p className="text-xs text-white/40">All challenges completed!</p>;
  const selected = answers[challenge.id];
  const answered = !!selected;
  const correct = challenge.options.find((o) => o.id === selected)?.isCorrect;

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-semibold text-white/90">Challenge {idx + 1}/{IS_A_VS_HAS_A_CHALLENGES.length}</span>
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
            {correct ? 'Correct! ✓' : 'Incorrect. The correct answer is highlighted above.'}
          </div>
          <p className="text-[10px] text-white/60">{challenge.explanation}</p>
          <p className="text-[10px] text-white/40">{challenge.explanationUrdu}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => { setIdx((i) => Math.min(i + 1, IS_A_VS_HAS_A_CHALLENGES.length)); setShowHint(false); if (correct) onCompleteChallenge(); }}
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

function ComparisonPanel() {
  const [mode, setMode] = useState<'is-a' | 'has-a'>('is-a');
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <GitBranch className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-semibold text-white/90">IS-A vs HAS-A</span>
      </div>
      <div className="flex gap-2 mb-3">
        {(['is-a', 'has-a'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              mode === m ? 'bg-white/10 border-white/20 text-white' : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/5'
            }`}
          >
            {m === 'is-a' ? 'IS-A (Inheritance)' : 'HAS-A (Composition)'}
          </button>
        ))}
      </div>
      {mode === 'is-a' ? (
        <div className="space-y-2 text-xs">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-blue-300 font-medium mb-1">IS-A: Inheritance</p>
            <p className="text-white/70">Student extends Person — Student IS-A Person</p>
            <p className="text-white/40 text-[10px] mt-1">Class hierarchy: Parent → Child</p>
          </div>
          <pre className="text-[10px] text-emerald-300/80 font-mono bg-black/30 rounded p-2">{"class Person {\n  String name;\n}\n\nclass Student extends Person {\n  int rollNo;\n}"}</pre>
          <p className="text-white/50 text-[10px]">Use when: Child is truly a type of Parent. Liskov Substitution applies.</p>
          <p className="text-white/40 text-[10px]">Mistake: Using inheritance for HAS-A (e.g., Dog extends Collar)</p>
        </div>
      ) : (
        <div className="space-y-2 text-xs">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
            <p className="text-emerald-300 font-medium mb-1">HAS-A: Composition</p>
            <p className="text-white/70">Car has an Engine — Car HAS-A Engine</p>
            <p className="text-white/40 text-[10px] mt-1">Object relationship: Container → Part</p>
          </div>
          <pre className="text-[10px] text-emerald-300/80 font-mono bg-black/30 rounded p-2">{"class Car {\n  private Engine engine;\n  Car() {\n    engine = new Engine();\n  }\n}"}</pre>
          <p className="text-white/50 text-[10px]">Use when: Object contains another as a part. Part lifecycle may be managed.</p>
          <p className="text-white/40 text-[10px]">Note: Composition is not universally better. Decide based on domain semantics.</p>
        </div>
      )}
    </div>
  );
}

function MistakeLab() {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const mistake = MISTAKES[idx];
  if (!mistake) return <p className="text-xs text-white/40">All mistakes reviewed!</p>;
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <span className="text-sm font-semibold text-white/90">Mistake {idx + 1}/{MISTAKES.length}</span>
      </div>
      <h4 className="text-xs font-medium text-white/80 mb-1">{mistake.title}</h4>
      <p className="text-[10px] text-white/40 mb-3">{mistake.titleUrdu}</p>
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-3">
        <p className="text-[10px] text-red-300 font-medium mb-1">Incorrect:</p>
        <pre className="text-[10px] text-red-300/70 font-mono whitespace-pre-wrap">{mistake.incorrectCode}</pre>
        <p className="text-[10px] text-red-300/60 mt-1">{mistake.incorrectModel}</p>
      </div>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="w-full px-3 py-2 rounded-lg text-xs bg-white/10 text-white/70 hover:bg-white/15">
          Reveal Correct Approach
        </button>
      ) : (
        <div className="space-y-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
            <p className="text-[10px] text-emerald-300 font-medium mb-1">Correct:</p>
            <pre className="text-[10px] text-emerald-300/70 font-mono whitespace-pre-wrap">{mistake.correctCode}</pre>
            <p className="text-[10px] text-emerald-300/60 mt-1">{mistake.correctModel}</p>
          </div>
          <p className="text-[10px] text-white/60">{mistake.explanation}</p>
          <p className="text-[10px] text-white/40">{mistake.explanationUrdu}</p>
          <button
            onClick={() => { setIdx((i) => Math.min(i + 1, MISTAKES.length)); setRevealed(false); }}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white/10 text-white/70 hover:bg-white/15"
          >
            Next Mistake →
          </button>
        </div>
      )}
    </div>
  );
}

export default function RelationshipLabPage() {
  const [activeLab, setActiveLab] = useState<LabId>('association');
  const [rightTab, setRightTab] = useState<'inspector' | 'code' | 'console'>('inspector');
  const [bottomTab, setBottomTab] = useState<'explain' | 'comparison' | 'challenge' | 'mistakes'>('explain');

  const labData = ALL_LAB_DATA[activeLab] ?? { nodes: [], edges: [] };
  const { state, selectNode, selectEdge, deselect, completeObjective, reset } = useRelationshipLab(labData);

  const activeNode = useMemo(() => labData.nodes.find((n) => n.id === state.activeNodeId) ?? null, [labData.nodes, state.activeNodeId]);
  const activeEdge = useMemo(() => labData.edges.find((e) => e.id === state.activeEdgeId) ?? null, [labData.edges, state.activeEdgeId]);

  const handleSelectNode = useCallback((id: string) => { selectNode(id); }, [selectNode]);
  const handleSelectEdge = useCallback((id: string) => { selectEdge(id); }, [selectEdge]);
  const handleHoverNode = useCallback((_id: string | null) => {}, []);
  const handleHoverEdge = useCallback((_id: string | null) => {}, []);

  const handleLabChange = useCallback((id: LabId) => {
    setActiveLab(id);
    deselect();
  }, [deselect]);

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
          <Layers className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-semibold text-white/90">Relationship Architect</span>
          <span className="text-[10px] text-white/40">World 12</span>
        </div>
        <div className="flex-1" />
        <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-white/60 hover:text-white hover:bg-white/10 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel */}
        <div className="w-72 border-r border-white/10 bg-[#0a0f1a]/80 backdrop-blur-sm overflow-y-auto p-4 space-y-4 shrink-0 hidden md:block">
          <LabSelector activeLab={activeLab} onSelect={handleLabChange} />
          <ExplanationPanel labId={activeLab} />
          <MissionPanel mission={state.mission} onComplete={completeObjective} />
        </div>

        {/* Center 3D canvas */}
        <div className="flex-1 relative">
          <SceneErrorBoundary fallback={
            <div className="absolute inset-0 bg-[#0a0f1a] flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-white/80 font-medium mb-2">3D relationship lab failed to load</p>
                <p className="text-white/50 text-sm">WebGL may be unavailable. Your progress is saved.</p>
              </div>
            </div>
          }>
          <RelationshipScene3D
            nodes={labData.nodes}
            edges={labData.edges}
            selectedNodeId={state.activeNodeId}
            selectedEdgeId={state.activeEdgeId}
            onSelectNode={handleSelectNode}
            onSelectEdge={handleSelectEdge}
            onHoverNode={handleHoverNode}
            onHoverEdge={handleHoverEdge}
            detachedEdgeIds={[]}
          />
          </SceneErrorBoundary>

          {/* Mobile lab tabs overlay */}
          <div className="absolute top-3 left-3 flex gap-1.5 md:hidden z-10">
            {LAB_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleLabChange(tab.id)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium backdrop-blur-sm transition-all ${
                  activeLab === tab.id ? 'bg-white/15 text-white border border-white/20' : 'bg-black/30 text-white/50 border border-white/5'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Active node info overlay */}
          <AnimatePresence>
            {activeNode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-3 left-3 bg-[#111827]/95 border border-white/10 rounded-xl p-3 max-w-xs backdrop-blur-sm z-10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Box className="w-4 h-4" style={{ color: activeNode.color }} />
                  <span className="text-xs font-semibold text-white/90">{activeNode.label}</span>
                </div>
                <p className="text-[10px] text-white/50">Class: {activeNode.className}</p>
                <p className="text-[10px] text-white/40 mt-1">Properties: {Object.keys(activeNode.properties).length} fields</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right panel */}
        <div className="w-80 border-l border-white/10 bg-[#0a0f1a]/80 backdrop-blur-sm flex flex-col shrink-0 hidden lg:flex">
          {/* Right tabs */}
          <div className="flex border-b border-white/10">
            {[
              { id: 'inspector' as const, icon: Eye, label: 'Inspector' },
              { id: 'code' as const, icon: Code2, label: 'Code' },
              { id: 'console' as const, icon: MessageSquare, label: 'Console' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRightTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-medium transition-all border-b-2 ${
                  rightTab === tab.id ? 'text-white border-purple-400 bg-white/5' : 'text-white/40 border-transparent hover:text-white/60'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {rightTab === 'inspector' && <InspectorPanel node={activeNode} edge={activeEdge} allNodes={labData.nodes} />}
            {rightTab === 'code' && <CodePanel labId={activeLab} />}
            {rightTab === 'console' && <ConsolePanel history={state.history} />}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="h-10 border-t border-white/10 flex items-center px-4 gap-2 bg-[#0a0f1a]/90 backdrop-blur-sm z-20 shrink-0">
        {[
          { id: 'explain' as const, label: 'Explanation', icon: BookOpen },
          { id: 'comparison' as const, label: 'IS-A vs HAS-A', icon: GitBranch },
          { id: 'challenge' as const, label: 'Challenge', icon: AlertTriangle },
          { id: 'mistakes' as const, label: 'Mistake Lab', icon: AlertTriangle },
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
              {bottomTab === 'explain' && <ExplanationPanel labId={activeLab} />}
              {bottomTab === 'comparison' && <ComparisonPanel />}
              {bottomTab === 'challenge' && <ChallengePanel onCompleteChallenge={() => completeObjective('obj-5')} />}
              {bottomTab === 'mistakes' && <MistakeLab />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

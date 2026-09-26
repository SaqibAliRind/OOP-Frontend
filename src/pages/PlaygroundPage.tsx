import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Play,
  Code2,
  Loader2,
  RefreshCw,
  Trash2,
  Copy,
  CheckCheck,
  ChevronRight,
  ChevronDown,
  Terminal,
} from 'lucide-react';


// ── Wandbox Java Compiler API (free, no key needed) ──────────────────────────
const WANDBOX_ENDPOINT = 'https://wandbox.org/api/compile.json';
const WANDBOX_LIST_ENDPOINT = 'https://wandbox.org/api/list.json';
let CACHED_COMPILER = 'openjdk-jdk-22+36';

const SNIPPET_TEMPLATES = [
  {
    label: 'Hello World',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, OOP Universe!");
    }
}`,
  },
  {
    label: 'Class & Object',
    code: `class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void study() {
        System.out.println(name + " is studying. Age: " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Ali", 20);
        Student s2 = new Student("Sara", 21);
        s1.study();
        s2.study();
    }
}`,
  },
  {
    label: 'Inheritance',
    code: `class Animal {
    String name;
    Animal(String name) { this.name = name; }
    void speak() { System.out.println(name + " makes a sound."); }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    @Override
    void speak() { System.out.println(name + " says: Woof!"); }
}

class Cat extends Animal {
    Cat(String name) { super(name); }
    @Override
    void speak() { System.out.println(name + " says: Meow!"); }
}

public class Main {
    public static void main(String[] args) {
        Animal[] animals = { new Dog("Buddy"), new Cat("Whiskers") };
        for (Animal a : animals) a.speak();
    }
}`,
  },
  {
    label: 'Interface',
    code: `interface Drawable {
    void draw();
}

class Circle implements Drawable {
    double radius;
    Circle(double radius) { this.radius = radius; }
    @Override
    public void draw() {
        System.out.println("Drawing Circle with radius: " + radius);
    }
}

class Rectangle implements Drawable {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override
    public void draw() {
        System.out.println("Drawing Rectangle " + w + "x" + h);
    }
}

public class Main {
    public static void main(String[] args) {
        Drawable[] shapes = { new Circle(5), new Rectangle(4, 6) };
        for (Drawable d : shapes) d.draw();
    }
}`,
  },
];

// ── Line-numbered editor overlay ─────────────────────────────────────────────
function LineNumbers({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <div
      className="select-none text-right pr-3 pt-4 text-xs font-mono leading-[1.625rem] text-white/20 border-r border-white/10 min-w-[2.5rem] overflow-hidden"
      aria-hidden="true"
    >
      {lines.map((_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}

export default function PlaygroundPage() {
  const [code, setCode] = useState(SNIPPET_TEMPLATES[0].code);
  const [stdin, setStdin] = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRunCode = useCallback(async () => {
    if (!code.trim() || isRunning) return;
    setIsRunning(true);
    setOutput(`⚙  Compiling with ${CACHED_COMPILER}...\n`);

    try {
      // Wandbox always saves as "prog.java".
      // Java requires public class name == filename, so we strip
      // 'public' from the outermost class declaration before sending.
      const codeForWandbox = code.replace(
        /^(\s*)public(\s+class\b)/m,
        '$1$2'
      );

      // Attempt to run with cached compiler
      let response = await fetch(WANDBOX_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          compiler: CACHED_COMPILER,
          code: codeForWandbox,
          stdin: stdin || '',
          save: false,
        }),
      });

      // If compiler not found (400 Bad Request usually), try fetching latest Java compiler
      if (!response.ok) {
        setOutput('⚙  Finding latest Java compiler...\n');
        const listRes = await fetch(WANDBOX_LIST_ENDPOINT);
        if (listRes.ok) {
          const list = await listRes.json();
          const javaCompilers = list.filter((c: any) => c.language === 'Java' && c.name.startsWith('openjdk'));
          if (javaCompilers.length > 0) {
            // Pick the last one in the list (usually the newest)
            CACHED_COMPILER = javaCompilers[javaCompilers.length - 1].name;
            setOutput(`⚙  Compiling with ${CACHED_COMPILER}...\n`);
            
            // Retry execution with new compiler
            response = await fetch(WANDBOX_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                compiler: CACHED_COMPILER,
                code: codeForWandbox,
                stdin: stdin || '',
                save: false,
              }),
            });
          }
        }
      }

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      let out = '';
      if (data.compiler_message) out += `[Compiler]\n${data.compiler_message}\n`;
      if (data.program_output)   out += data.program_output;
      if (data.program_error)    out += `[Runtime Error]\n${data.program_error}`;
      if (!out.trim()) out = '✓ Program finished with no output.';
      setOutput(out);
    } catch (err) {
      console.error(err);
      setOutput('❌ Could not connect to compiler. Check your internet connection and try again.');
    } finally {
      setIsRunning(false);
    }
  }, [code, stdin, isRunning]);

  // Ctrl+Enter to run
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleRunCode]);

  // Scroll output to bottom when new output arrives
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target as HTMLTextAreaElement;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = code.substring(0, start) + '    ' + code.substring(end);
      setCode(next);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTemplate = (idx: number) => {
    setActiveTemplate(idx);
    setCode(SNIPPET_TEMPLATES[idx].code);
    setStdin('');
    setOutput('');
  };

  const outputIsError =
    output.startsWith('❌') ||
    output.includes('[Compiler]') ||
    output.includes('[Runtime Error]');

  return (
    <div className="h-full flex flex-col bg-[#050810] text-white overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0a0f1a] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">Java Playground</h1>
            <p className="text-[10px] text-white/40 font-mono">
              OpenJDK 22 · Powered by Wandbox
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={() => { setCode(SNIPPET_TEMPLATES[activeTemplate].code); setOutput(''); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
          >
            {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Running...' : 'Run'}
            <span className="text-[10px] text-blue-300 font-normal ml-1">Ctrl+↵</span>
          </button>
        </div>
      </header>

      {/* ── Template Tabs ── */}
      <div className="flex items-center gap-1 px-5 py-2 border-b border-white/5 bg-[#080d18] overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[10px] text-white/30 font-mono mr-2 shrink-0">TEMPLATES:</span>
        {SNIPPET_TEMPLATES.map((tpl, i) => (
          <button
            key={i}
            onClick={() => handleTemplate(i)}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap ${
              activeTemplate === i
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
            }`}
          >
            <ChevronRight className="w-3 h-3" />
            {tpl.label}
          </button>
        ))}
      </div>

      {/* ── Main Split Layout ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Editor */}
        <div className="flex-1 flex flex-col border-r border-white/10 min-w-0">
          <div className="px-4 py-1.5 border-b border-white/5 bg-[#0d1320] flex items-center justify-between shrink-0">
            <span className="text-[10px] font-mono text-white/30">Main.java</span>
            <span className="text-[10px] text-white/20 font-mono">{code.split('\n').length} lines</span>
          </div>
          <div className="flex-1 flex overflow-auto bg-[#0d1320]">
            <LineNumbers code={code} />
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              className="flex-1 resize-none bg-transparent text-white/90 font-mono text-[13px] p-4 focus:outline-none leading-[1.625rem] caret-blue-400"
              style={{ tabSize: 4 }}
              placeholder="Write your Java code here..."
            />
          </div>
          {/* ── stdin panel ── */}
          <div className="border-t border-white/10 bg-[#080d18] shrink-0">
            <button
              onClick={() => setShowStdin(!showStdin)}
              className="w-full flex items-center gap-2 px-4 py-2 text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors"
            >
              <Terminal className="w-3 h-3" />
              Standard Input (stdin)
              <span className="text-[9px] ml-1 text-white/20">for Scanner / BufferedReader</span>
              <ChevronDown
                className={`w-3 h-3 ml-auto transition-transform ${showStdin ? 'rotate-180' : ''}`}
              />
            </button>
            {showStdin && (
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                spellCheck={false}
                rows={3}
                placeholder="Enter program input here, one value per line..."
                className="w-full px-4 pb-3 bg-transparent text-white/70 font-mono text-[12px] resize-none focus:outline-none border-t border-white/5 placeholder:text-white/15"
              />
            )}
          </div>
        </div>

        {/* Output */}
        <div className="w-[44%] flex flex-col min-w-[280px] bg-[#060b14]">
          <div className="px-4 py-1.5 border-b border-white/5 bg-[#0a0e1a] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-[10px] font-mono text-white/30 ml-1">Terminal Output</span>
            </div>
            {output && (
              <button
                onClick={() => setOutput('')}
                className="text-white/20 hover:text-white/50 transition-colors"
                title="Clear output"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div
            ref={outputRef}
            className="flex-1 overflow-auto p-4"
          >
            {output ? (
              <pre
                className={`font-mono text-[12.5px] whitespace-pre-wrap leading-relaxed ${
                  outputIsError ? 'text-red-400' : 'text-green-300'
                }`}
              >
                {output}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-white/15">
                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center">
                  <Play className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-white/30">Press Run to execute</p>
                  <p className="text-[10px] text-white/20 mt-0.5">or use Ctrl + Enter</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

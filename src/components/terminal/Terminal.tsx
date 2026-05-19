import { motion, AnimatePresence } from "motion/react";
import { Terminal as TerminalIcon, Circle, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface TerminalProps {
  commands: string[];
}

export default function Terminal({ commands }: TerminalProps) {
  const [copied, setCopied] = useState(false);
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < commands.length) {
        setDisplayedCommands((prev) => [...prev, commands[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [commands]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group overflow-hidden rounded-xl bg-[#0d1117] border border-border/40 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 fill-red-500 text-red-500" />
          <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <Circle className="w-3 h-3 fill-green-500 text-green-500" />
          <span className="ml-2 text-xs font-mono text-zinc-400">bash — 80x24</span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="p-1.5 rounded-md hover:bg-zinc-800 transition-colors text-zinc-400"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="p-6 font-mono text-sm leading-relaxed overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-zinc-700">
        <AnimatePresence>
          {displayedCommands.map((cmd, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2 mb-1.5"
            >
              <span className="text-zinc-600 select-none">$</span>
              <span className={cmd && cmd.startsWith("-") ? "text-indigo-400" : "text-zinc-300"}>
                {cmd}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2.5 h-5 bg-indigo-500 align-middle ml-1"
        />
      </div>
    </div>
  );
}

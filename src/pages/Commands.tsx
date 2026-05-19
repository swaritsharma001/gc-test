import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { 
  Search, 
  Terminal as TerminalIcon, 
  Command, 
  ChevronRight, 
  Shield, 
  Zap, 
  UserPlus, 
  Sword, 
  MessageSquare, 
  Link as LinkIcon, 
  Wrench,
  Code2,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CommandItem {
  name: string;
  desc: string;
  usage: string;
}

interface CommandCategory {
  title: string;
  icon: any;
  color: string;
  commands: CommandItem[];
}

export default function Commands() {
  const [search, setSearch] = useState("");

  const categories: CommandCategory[] = [
    {
      title: "CORE",
      icon: TerminalIcon,
      color: "from-blue-500 to-cyan-500",
      commands: [
        { name: "/help", desc: "Show all available commands", usage: "/help <page>" },
        { name: "/info", desc: "Get bot system information", usage: "/info" },
        { name: "/ping", desc: "Check bot latency", usage: "/ping" },
      ]
    },
    {
      title: "AUTO FEATURES",
      icon: Zap,
      color: "from-amber-500 to-orange-500",
      commands: [
        { name: "/autokick", desc: "Auto-kick users based on criteria", usage: "/autokick <time>" },
        { name: "/autorespond", desc: "Set automatic keyword responses", usage: "/autorespond <trigger>" },
      ]
    },
    {
      title: "TARGET",
      icon: Sword,
      color: "from-red-500 to-rose-600",
      commands: [
        { name: "/lock", desc: "Lock down a specific target user", usage: "/lock @user" },
        { name: "/track", desc: "Begin tracking user activity logs", usage: "/track @user" },
      ]
    },
    {
      title: "SPAM & RAID",
      icon: Shield,
      color: "from-purple-500 to-indigo-600",
      commands: [
        { name: "/spam", desc: "Initiate message flow in a channel", usage: "/spam <msg> <count>" },
        { name: "/raid-protect", desc: "Toggle anti-raid emergency mode", usage: "/raid-protect on" },
      ]
    },
    {
      title: "GROUP CHAT",
      icon: MessageSquare,
      color: "from-emerald-500 to-teal-600",
      commands: [
        { name: "/gc-invite", desc: "Mass invite users to a group chat", usage: "/gc-invite <id>" },
        { name: "/gc-leave", desc: "Leave all active group chats", usage: "/gc-leave" },
      ]
    },
    {
      title: "LINK MANAGEMENT",
      icon: LinkIcon,
      color: "from-pink-500 to-fuchsia-600",
      commands: [
        { name: "/shorten", desc: "Shorten a long URL securely", usage: "/shorten <url>" },
        { name: "/link-filter", desc: "Filter phishing/malicious links", usage: "/link-filter on" },
      ]
    },
    {
      title: "UTILITY",
      icon: Wrench,
      color: "from-slate-500 to-slate-700",
      commands: [
        { name: "/calc", desc: "Perform complex calculations", usage: "/calc <expr>" },
        { name: "/weather", desc: "Get real-time weather stats", usage: "/weather <city>" },
      ]
    }
  ];

  const filteredCategories = categories.map(cat => ({
    ...cat,
    commands: cat.commands.filter(cmd => 
      cmd.name.toLowerCase().includes(search.toLowerCase()) || 
      cmd.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.commands.length > 0);

  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden lg:block w-72 shrink-0" />
      
      <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Command Registry</h1>
              <p className="text-muted-foreground text-lg italic">Explore the full power of the BotForge engine.</p>
            </div>
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <Input 
                placeholder="Search command or description..." 
                className="pl-10 h-12 rounded-2xl border-2 focus-visible:ring-indigo-500 bg-background/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="space-y-16">
          {filteredCategories.map((category, idx) => (
            <motion.section 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight italic opacity-90">{category.title}</h2>
                <div className="flex-1 h-px bg-border/60"></div>
                <Badge variant="outline" className="rounded-full px-4">{category.commands.length} Commands</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.commands.map((cmd, cIdx) => (
                  <div 
                    key={cIdx} 
                    className="group p-6 rounded-3xl border bg-card/50 hover:bg-card hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4 text-indigo-500" />
                    </div>
                    <h3 className="font-mono text-lg font-bold text-indigo-500 mb-2">{cmd.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2">
                      {cmd.desc}
                    </p>
                    <div className="bg-[#0d1117] rounded-xl p-3 border border-border/40 font-mono text-[11px] text-zinc-400 group-hover:border-indigo-500/20 transition-colors">
                      <span className="text-zinc-600 select-none mr-2">$</span>
                      {cmd.usage}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-24">
              <Command className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No commands found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

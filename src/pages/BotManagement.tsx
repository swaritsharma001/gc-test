import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  Square, 
  Terminal as TerminalIcon,
  Activity,
  Cpu,
  Globe,
  Database,
  ShieldAlert,
  Zap,
  Trash2,
  Lock,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function BotManagement() {
  const { botId } = useParams();
  const [status, setStatus] = useState<"running" | "stopped">("running");
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialLogs = [
      "[SYSTEM] Loading modules...",
      "[AUTH] Validating Discord token...",
      "[CORE] Connected to Gateway Shard #0",
      "[LOGS] Listener started on port 3000",
      "[INFO] Bot 'NovaSelf' is now online and listening."
    ];
    setLogs(initialLogs);

    const interval = setInterval(() => {
      if (status === "running") {
        const events = [
          `[EVENT] Message received in server 'DiscordDevs'`,
          `[MOD] Auto-filter triggered for user 'User#${Math.floor(Math.random() * 9999)}'`,
          `[STATS] API Latency: ${Math.floor(Math.random() * 40) + 10}ms`,
          `[LOG] Heartbeat acknowledged by gateway`,
          `[DB] State updated for guild '73420847923746'`
        ];
        setLogs(prev => [...prev.slice(-49), events[Math.floor(Math.random() * events.length)]]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const handleAction = (type: string) => {
    if (type === "restart") {
      toast.info("Restarting bot services...");
      setLogs(prev => [...prev, "[SYSTEM] Restarting core process..."]);
      setTimeout(() => {
        setLogs(prev => [...prev, "[SYSTEM] Process booted. Reconnecting..."]);
        toast.success("Bot restarted successfully.");
      }, 2000);
    } else if (type === "stop") {
      setStatus("stopped");
      setLogs(prev => [...prev, "[SYSTEM] Shutdown sequence initiated..."]);
      toast.warning("Bot has been stopped.");
    } else if (type === "start") {
      setStatus("running");
      setLogs(prev => [...prev, "[SYSTEM] Booting systems..."]);
      toast.success("Bot is now running.");
    }
  };

  const categories = [
    { name: "Core", icon: Activity, count: 12, color: "text-indigo-500 bg-indigo-500/10" },
    { name: "Auto", icon: Zap, count: 5, color: "text-amber-500 bg-amber-500/10" },
    { name: "Spam", icon: ShieldAlert, count: 8, color: "text-red-500 bg-red-500/10" },
    { name: "Utility", icon: Database, count: 17, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden lg:block w-72 shrink-0" />
      
      <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <header className="mb-10">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-muted p-1 border shadow-sm">
                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${botId}`} alt="Bot" className="w-full h-full rounded-xl" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold tracking-tight">NovaSelf</h1>
                  <Badge className={status === "running" ? "bg-green-500" : "bg-slate-400"}>
                    {status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Global Instance · ID: {botId}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {status === "running" ? (
                <>
                  <Button variant="outline" className="rounded-xl" onClick={() => handleAction("restart")}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Restart
                  </Button>
                  <Button variant="destructive" className="rounded-xl" onClick={() => handleAction("stop")}>
                    <Square className="w-4 h-4 mr-2" /> Stop
                  </Button>
                </>
              ) : (
                <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700" onClick={() => handleAction("start")}>
                  <Play className="w-4 h-4 mr-2" /> Start Bot
                </Button>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {/* Real-time Logs */}
            <Card className="border-2 shadow-sm bg-[#0d1117] text-zinc-300">
              <CardHeader className="border-b border-border/20 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TerminalIcon className="w-5 h-5 text-indigo-400" />
                    Live System Logs
                  </CardTitle>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Stream Active
                    </span>
                    <span>v2.4.0-stable</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[450px] p-6 font-mono text-[13px] leading-relaxed">
                  <div className="space-y-1">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-3 group">
                        <span className="text-zinc-600 select-none min-w-[20px]">{i + 1}</span>
                        <span className={
                          log.includes("[SYSTEM]") ? "text-indigo-400" :
                          log.includes("[AUTH]") ? "text-emerald-400" :
                          log.includes("[MOD]") ? "text-amber-400" :
                          log.includes("[ERROR]") ? "text-red-400" : ""
                        }>
                          {log}
                        </span>
                      </div>
                    ))}
                    <div ref={scrollRef} />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "CPU Usage", value: "2.4%", sub: "Across 2 cores", icon: Cpu },
                { label: "Memory", value: "118MB", sub: "Allocated 512MB", icon: Database },
                { label: "Uptime", value: "14d 2h", sub: "Last reboot: May 05", icon: Activity },
              ].map((stat, i) => (
                <Card key={i} className="border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-muted/50 border">
                        <stat.icon className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Command Categories</CardTitle>
                <CardDescription>Configure bot capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((cat, i) => (
                  <Button 
                    key={i} 
                    variant="ghost" 
                    className="w-full justify-between h-14 rounded-xl border border-transparent hover:border-border px-4 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${cat.color}`}>
                        <cat.icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold">{cat.name} Settings</span>
                    </div>
                    <Badge variant="outline" className="rounded-md">{cat.count}</Badge>
                  </Button>
                ))}
              </CardContent>
              <Separator />
              <CardContent className="pt-6">
                <Button variant="outline" className="w-full rounded-xl border-dashed py-6" asChild>
                  <Link to="/commands" className="gap-2">
                    <Plus className="w-4 h-4" /> View All Commands
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                  <ShieldAlert className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">These actions are irreversible and affect your bot's global identity.</p>
                <Button variant="outline" className="w-full rounded-xl gap-2 hover:bg-destructive/10 hover:text-destructive border-destructive/20">
                  <Lock className="w-4 h-4" /> Clear Cache & Data
                </Button>
                <Button variant="destructive" className="w-full rounded-xl gap-2">
                  <Trash2 className="w-4 h-4" /> Delete Bot Forever
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

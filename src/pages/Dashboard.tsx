import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "@/components/layout/Sidebar";
import { 
  Play, 
  Square, 
  Settings2, 
  MoreVertical, 
  Bot, 
  Loader2,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Search,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BotStatus = "running" | "stopped" | "banned";

interface BotApp {
  id: string;
  name: string;
  status: BotStatus;
  tokenStatus: "verified" | "unverified";
  avatar: string;
  commands: number;
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [bots, setBots] = useState<BotApp[]>([
    {
      id: "1",
      name: "NovaSelf",
      status: "running",
      tokenStatus: "verified",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=nova",
      commands: 42
    },
    {
      id: "2",
      name: "RaidGuard",
      status: "stopped",
      tokenStatus: "verified",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=guard",
      commands: 12
    },
    {
      id: "3",
      name: "SpamShield",
      status: "banned",
      tokenStatus: "unverified",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=shield",
      commands: 0
    }
  ]);

  const toggleBot = (id: string, currentStatus: BotStatus) => {
    if (currentStatus === "banned") {
      toast.error("This bot is banned and cannot be started.");
      return;
    }

    const newStatus = currentStatus === "running" ? "stopped" : "running";
    
    setBots(prev => prev.map(bot => 
      bot.id === id ? { ...bot, status: newStatus } : bot
    ));

    if (newStatus === "running") {
      toast.success("Bot started successfully!");
    } else {
      toast.info("Bot execution stopped.");
    }
  };

  const filteredBots = bots.filter(bot => 
    bot.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden lg:block w-72 shrink-0" />
      
      <div className="flex-1 p-6 md:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Your Bots</h1>
            <p className="text-muted-foreground">Manage and monitor your active bot instances.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search bots..." 
                className="pl-10 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-5 h-5" />
              New Bot
            </Button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredBots.map((bot) => (
              <motion.div
                key={bot.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-indigo-500/10 border-2 border-transparent hover:border-indigo-500/20">
                  <div className="absolute top-0 left-0 w-1 h-full bg-muted-foreground/10 group-hover:bg-indigo-500 transition-colors"></div>
                  
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-muted p-1 border">
                          <img src={bot.avatar} alt={bot.name} className="w-full h-full rounded-xl" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                          bot.status === "running" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" :
                          bot.status === "stopped" ? "bg-slate-400" : "bg-red-500"
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold">{bot.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-0.5">
                          {bot.status === "running" && <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20 lowercase">Running</Badge>}
                          {bot.status === "stopped" && <Badge variant="secondary" className="bg-slate-500/10 text-slate-600 border-slate-500/20 lowercase">Stopped</Badge>}
                          {bot.status === "banned" && <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-red-500/20 lowercase">Banned</Badge>}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Reset Token</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl bg-muted/30 border">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Token Status</span>
                        <div className="flex items-center gap-1.5">
                          {bot.tokenStatus === "verified" ? (
                            <>
                              <ShieldCheck className="w-4 h-4 text-indigo-500" />
                              <span className="text-xs font-semibold">Verified</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                              <span className="text-xs font-semibold text-amber-600">Unverified</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/30 border">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Modules</span>
                        <div className="flex items-center gap-1.5">
                          <Bot className="w-4 h-4 text-purple-500" />
                          <span className="text-xs font-semibold">{bot.commands} Active</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-2 pt-0">
                    <Button 
                      className={`flex-1 rounded-xl transition-all ${
                        bot.status === "running" ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"
                      }`}
                      onClick={() => toggleBot(bot.id, bot.status)}
                      disabled={bot.status === "banned"}
                    >
                      {bot.status === "running" ? (
                        <><Square className="w-4 h-4 mr-2" /> Stop</>
                      ) : (
                        <><Play className="w-4 h-4 mr-2" /> Start</>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl" asChild>
                      <Link to={`/manage/${bot.id}`}>
                        <Settings2 className="w-4 h-4 mr-2" /> Manage
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
